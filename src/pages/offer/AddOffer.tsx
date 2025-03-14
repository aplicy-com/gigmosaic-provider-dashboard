import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
    Input,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  DateRangePicker,
} from "@heroui/react";
import { parseZonedDateTime, ZonedDateTime } from "@internationalized/date";
import { useSubmitOfferMutation } from "../../hooks/mutations/usePostData";
import { useUpdateOfferMutation } from "../../hooks/mutations/useUpdateData";
import { useFetchProviderServices } from "../../hooks/queries/useFetchData";
import { IOfferProps, IServiceProps } from "../../types";

interface DateRange {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

interface OfferFormData {
  serviceId: string;
  offerTitle: string;
  offerType: 'FIXED' | 'PERCENTAGE';
  offerPrice: number;  // Changed from discountValue
  dateRange: DateRange; // Replace separate date fields with dateRange
}

interface AddOfferProps {
  editOfferData?: IOfferProps;
  onSuccess?: () => void;
  isModal?: boolean;
}

const AddOffer: React.FC<AddOfferProps> = ({
  editOfferData,
  onSuccess,
  isModal,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
    // trigger,
  } = useForm<OfferFormData>({
    mode: "onChange",
  });

  const addMutation = useSubmitOfferMutation();
  const updateMutation = useUpdateOfferMutation();
  const [error, setError] = useState<string | null>(null);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  
  const providerId = "PRV_002"; // Replace with actual provider ID from auth context
  const { data: servicesData, isLoading: isServicesLoading } = useFetchProviderServices(providerId);
  const services = servicesData?.data || [];

  const watchServiceId = watch("serviceId");
  const watchOfferType = watch("offerType");
  const watchOfferPrice = watch("offerPrice");  // Changed from watchDiscountValue

  const selectedService = services.find(
    (service: IServiceProps) => service.serviceId === watchServiceId
  );

  // Calculate price after discount
  const calculatePriceAfterDiscount = (price: number, discountValue: number, offerType: 'FIXED' | 'PERCENTAGE') => {
    if (offerType === 'FIXED') {
      return Math.max(0, price - discountValue);
    } else {
      return Math.max(0, price * (1 - discountValue / 100));
    }
  };

  // Validate discount value based on offer type and service price
  const validateOfferPrice = (value: number) => {
    if (!selectedService || !watchOfferType) return true;
    
    if (watchOfferType === 'FIXED') {
      return value < selectedService.price || 
        "Discount cannot be greater than service price";
    } else {
      return value <= 100 || "Percentage discount cannot exceed 100%";
    }
  };

  // Set initial values when editing
  useEffect(() => {
    if (editOfferData) {
      setValue("serviceId", editOfferData.serviceId);
      setValue("offerTitle", editOfferData.offerTitle);
      setValue("offerType", editOfferData.offerType);
      setValue("offerPrice", editOfferData.offerPrice);

      // Convert startDate and endDate to ZonedDateTime
      const startDate = editOfferData.startDate instanceof Date 
        ? editOfferData.startDate 
        : new Date(editOfferData.startDate);
      const endDate = editOfferData.endDate instanceof Date 
        ? editOfferData.endDate 
        : new Date(editOfferData.endDate);
      setValue("dateRange", {
        start: parseZonedDateTime(startDate.toISOString().replace('Z', '[UTC]')),
        end: parseZonedDateTime(endDate.toISOString().replace('Z', '[UTC]'))
      });
    }
  }, [editOfferData, setValue]);


  // Validate dates
  const validateDateRange = (value: DateRange) => {
    const now = parseZonedDateTime(new Date().toISOString().replace('Z', '[UTC]'));
    if (value.start.compare(now) < 0) {
      return "Start date cannot be in the past";
    }
    if (value.end.compare(value.start) <= 0) {
      return "End date must be after start date";
    }
    return true;
  };

  const isFormValid = 
    watch("serviceId") &&
    watch("offerTitle") &&
    watch("offerType") &&
    watch("offerPrice") &&
    watch("dateRange") &&
    !Object.keys(errors).length;

  const onSubmit: SubmitHandler<OfferFormData> = async (data) => {
    try {
      const calculatedPrice = calculatePriceAfterDiscount(
        selectedService?.price || 0,
        Number(data.offerPrice),
        data.offerType
      );

      const startDateStr = data.dateRange.start.toString();
      const endDateStr = data.dateRange.end.toString();

      const startDate = new Date(startDateStr.split('[')[0]);
      const endDate = new Date(endDateStr.split('[')[0]);

      const payload: IOfferProps = {
        providerId,
        serviceId: data.serviceId,
        offerTitle: data.offerTitle,
        offerType: data.offerType,
        offerPrice: Number(data.offerPrice),
        startDate,
        endDate,
        isActive: true,
        priceAfterDiscount: calculatedPrice,
        offerId: editOfferData?.offerId || '' // Add this line
      };

      console.log('Submitting payload with dates:', {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });

      if (editOfferData?.offerId) {
        await updateMutation.mutateAsync({ 
          id: editOfferData.offerId, 
          offerData: payload 
        });
      } else {
        await addMutation.mutateAsync(payload);
      }
      onSuccess?.();
    } catch (err: unknown) {
      console.error('Error submitting offer:', err);
      const errorMessage = 
        (err as Error).message || 
        "Failed to save offer";
      setError(errorMessage);
    }
  };


  useEffect(() => {
    if (selectedService && watchOfferPrice && watchOfferType) {
      const newPrice = calculatePriceAfterDiscount(
        selectedService.price,
        Number(watchOfferPrice),
        watchOfferType
      );
      setFinalPrice(newPrice);
    }
  }, [selectedService, watchOfferPrice, watchOfferType]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center w-full">
      <Card className="px-3 py-2 mb-5 w-full overflow-visible" radius="none">
        {!isModal && (
          <CardHeader>
            <p className="text-md font-medium">
              {editOfferData ? "Edit Offer" : "Add Offer"}
            </p>
          </CardHeader>
        )}
        <CardBody className="gap-6">
          {!isModal && <Divider className="-my-2" />}

          <Controller
            name="serviceId"
            control={control}
            rules={{ required: "Service selection is required" }}
            render={({ field }) => (
              <div className="mb-1">
                <label className="text-sm font-medium mb-1 block">
                  Select Service
                </label>
                <Select
                  radius="none"
                  placeholder="Select a service"
                  selectedKeys={field.value ? [field.value] : []}
                  isLoading={isServicesLoading}
                  isRequired={true}
                  isInvalid={!!errors.serviceId}
                  errorMessage={errors.serviceId?.message}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  {services.map((service: IServiceProps) => (
                    <SelectItem 
                      key={service.serviceId} 
                      name-value={service.serviceId}
                      textValue={`${service.serviceTitle} - $${service.price}`}
                    >
                      <div className="flex flex-col">
                        <span>{service.serviceTitle}</span>
                        <span className="text-small text-default-500">
                          ${service.price} - {service.duration}
                        </span>
                        {service.isOffers && (
                          <span className="text-small text-danger">
                            Already has an active offer
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </Select>
              </div>
            )}
          />

          {/* <Input
            label="Original Price"
            labelPlacement="outside"
            type="text"
            radius="none"
            isReadOnly
            value={selectedService ? `$${selectedService.price}` : '-'}
            startContent={<span className="text-default-400">$</span>}
          /> */}

          <Controller
            name="offerTitle"
            control={control}
            rules={{ required: "Offer title is required" }}
            render={({ field }) => (
              <Input
                label="Offer Title"
                labelPlacement="outside"
                type="text"
                placeholder="Enter offer title"
                radius="none"
                isRequired={true}
                isInvalid={!!errors.offerTitle}
                errorMessage={errors.offerTitle?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="offerType"
            control={control}
            rules={{ required: "Offer type is required" }}
            render={({ field }) => (
              <div className="mb-1">
                <label className="text-sm font-medium mb-1 block">
                  Discount Type
                </label>
                <RadioGroup
                  orientation="horizontal"
                  value={field.value}
                  onValueChange={field.onChange}
                  
                >
                  <Radio className="" value="FIXED">
                    <span className="text-sm font-normal">
                    Fixed Amount
                    </span>
                    </Radio>
                  <Radio value="PERCENTAGE">
                  <span className="text-sm font-normal">
                    Percentage
                    </span>
                    </Radio>
                </RadioGroup>
              </div>
            )}
          />
<div className="flex justify-center items-center gap-3">
          <Controller
            name="offerPrice"
            control={control}
            rules={{
              required: "Discount value is required",
              min: 0,
              max: watchOfferType === 'PERCENTAGE' ? 100 : undefined,
              validate: validateOfferPrice
            }}
            render={({ field: { value, ...fieldProps } }) => (
              <Input
                label="Discount Value"
                labelPlacement="outside"
                type="number"
                placeholder={watchOfferType === 'FIXED' ? "Enter amount" : "Enter percentage (max 100)"}
                radius="none"
                isRequired={true}
                isInvalid={!!errors.offerPrice}
                errorMessage={errors.offerPrice?.message}
                value={value?.toString()}
                startContent={watchOfferType === 'FIXED' ? <span className="text-default-400">$</span> : null}
                endContent={watchOfferType === 'PERCENTAGE' ? <span className="text-default-400">%</span> : null}
                {...fieldProps}
              />
            )}
          />

          <Input
            label="Final Price"
            labelPlacement="outside"
            type="text"
            radius="none"
            isReadOnly
            value={selectedService && watchOfferPrice ? `${finalPrice.toFixed(2)}` : '-'}
            startContent={<span className="text-default-400">$</span>}
          />
  </div>



<div className="w-full">
  <Controller
    name="dateRange"
    control={control}
    rules={{
      required: "Date range is required",
      validate: validateDateRange
    }}
    render={({ field: { onChange, value } }) => (
      <DateRangePicker
        label="Offer Validity"
        labelPlacement="outside"
        radius="none"
        isRequired
        isInvalid={!!errors.dateRange}
        errorMessage={errors.dateRange?.message}
        className="w-full"
        defaultValue={{
          start: parseZonedDateTime(new Date().toISOString().replace('Z', '[UTC]')),
          end: parseZonedDateTime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().replace('Z', '[UTC]'))
        }}
        value={value}
        onChange={onChange}
      />
    )}
  />
</div>



          {error && (
              <span className="text-danger text-sm font-medium ">
                {error}
              </span>
            )}

          <div className="flex justify-end gap-2 mb-2">
            <Button
              color="secondary"
              radius="none"
              onPress={() => onSuccess?.()}
            >
              Cancel
            </Button>
            <Button
              radius="none"
              type="submit"
              color="primary"
              disabled={!isFormValid || addMutation.isPending || updateMutation.isPending}
            >
              {addMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : editOfferData
                  ? "Update"
                  : "Save"}
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  );
};

export default AddOffer;
