import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { FaRegEdit } from "react-icons/fa";
import CustomButton from "../../components/ui/CustomButton";
import CustomInput from "../../components/ui/CustomInput";
import CustomAutocomplete from "../../components/ui/CustomAutocomplete";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFetchStaffById } from "../../hooks/queries/useFetchData";
import { useUpdateStaffMutation } from "../../hooks/mutations/useUpdateData";
import Loading from "../../components/ui/Loading";
import CustomCheckbox from "../../components/ui/CustomCheckbox";

type FormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  description: string;
  status: boolean;
};

const EditStaffModal = ({ id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedId, setSelectedId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { data, isLoading: isFetchingStaff } = useFetchStaffById(selectedId);
  const { mutate } = useUpdateStaffMutation();

  const state = [
    { label: "Ontario", id: "ontario" },
    { label: "Quebec", id: "quebec" },
    { label: "Nova Scotia", id: "novaScotia" },
    { label: "New Brunswick", id: "newBrunswick" },
    { label: "Manitoba", id: "manitoba" },
    { label: "British Columbia", id: "britishColumbia" },
    { label: "Saskatchewan", id: "saskatchewan" },
    { label: "Alberta", id: "alberta" },
    { label: "Newfoundland and Labrador", id: "newfoundlandandLabrador" },
  ];

  const country = [{ label: "Canada", id: "canada" }];

  useEffect(() => {
    if (data) {
      console.log("Data received: ", data);

      setValue("fullName", data.staff.fullName || "");
      setValue("email", data.staff.email || "");
      setValue("phoneNumber", data.staff.phoneNumber || "");
      setValue("address", data.staff.address || "");
      setValue("city", data.staff.city || "");
      setValue("zipCode", data.staff.zipCode || "");
      setValue("description", data.staff.description || "");
      setValue("status", data.staff.status || "");

      const findState = state.find((item) => item.label === data.staff.state);
      const findCountry = country.find(
        (item) => item.label === data.staff.country
      );

      console.log("Found Country: ", findCountry?.id);
      console.log("Found State: ", findState?.id);

      if (findState) setValue("state", findState.id);
      if (findCountry) setValue("country", findCountry.id);
    }
  }, [data, setValue]);

  const handleOpen = () => {
    setSelectedId(id);
    onOpen(); // Open modal immediately
  };

  useEffect(() => {
    if (isOpen && id) {
      setSelectedId(id);
    }
  }, [isOpen, id]);

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    console.log("Final Updating Staff data: ", formData);
    mutate({ id: selectedId, staffData: formData });
    onOpenChange(false);
  };

  return (
    <>
      <CustomButton
        isIconOnly
        className="bg-transparent"
        endContent={
          <FaRegEdit size={18} className="hover:text-blue-500 text-gray-500" />
        }
        onPress={handleOpen}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Edit Staff</ModalHeader>
                <ModalBody>
                  {isFetchingStaff ? (
                    <Loading label="Loading staff details..." />
                  ) : (
                    <div className="grid grid-cols-2 gap-5">
                      <CustomInput
                        label="Name"
                        type="text"
                        isRequired
                        placeholder="Enter name"
                        {...register("fullName", {
                          required: "Name is required",
                        })}
                        isInvalid={!!errors?.fullName}
                        errorMessage={errors?.fullName?.message}
                      />
                      <CustomInput
                        label="Email"
                        type="email"
                        isRequired
                        placeholder="Enter email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        isInvalid={!!errors?.email}
                        errorMessage={errors?.email?.message}
                      />
                      <CustomInput
                        label="Phone No"
                        type="text"
                        isRequired
                        placeholder="Enter mobile no"
                        {...register("phoneNumber", {
                          required: "Phone number is required",
                        })}
                        isInvalid={!!errors?.phoneNumber}
                        errorMessage={errors?.phoneNumber?.message}
                      />
                      <CustomInput
                        label="Address"
                        type="text"
                        isRequired
                        placeholder="Enter address"
                        {...register("address", {
                          required: "Address is required",
                        })}
                        isInvalid={!!errors?.address}
                        errorMessage={errors?.address?.message}
                      />
                      <CustomAutocomplete
                        label="Country"
                        isRequired
                        placeholder="Enter country"
                        defaultItems={country}
                        selectedKey={
                          watch("country") || data?.staff?.country || null
                        }
                        onSelectionChange={(id) =>
                          setValue("country", id, { shouldValidate: true })
                        }
                        isInvalid={!!errors?.country}
                        errorMessage={errors?.country?.message}
                      />

                      <CustomAutocomplete
                        label="State"
                        isRequired
                        placeholder="Enter state"
                        defaultItems={state}
                        selectedKey={
                          watch("state") || data?.staff?.state || null
                        }
                        onSelectionChange={(id) =>
                          setValue("state", id, { shouldValidate: true })
                        }
                        isInvalid={!!errors?.state}
                        errorMessage={errors?.state?.message}
                      />

                      <CustomInput
                        label="City"
                        type="text"
                        isRequired
                        placeholder="Enter city"
                        {...register("city", { required: "City is required" })}
                        isInvalid={!!errors?.city}
                        errorMessage={errors?.city?.message}
                      />
                      <CustomInput
                        label="Zipcode"
                        type="text"
                        isRequired
                        placeholder="Enter zipcode"
                        {...register("zipCode", {
                          required: "Zipcode is required",
                        })}
                        isInvalid={!!errors?.zipCode}
                        errorMessage={errors?.zipCode?.message}
                      />

                      <div className="mt-3">
                        <CustomCheckbox
                          label="Active"
                          onValueChange={(value) =>
                            setValue("status", value, { shouldValidate: true })
                          }
                          size="sm"
                          isSelected={watch("status")}
                        />
                      </div>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <CustomButton
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    label="Close"
                  />
                  <CustomButton type="submit" label="Submit" color="primary" />
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditStaffModal;
