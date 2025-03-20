import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { MdAddCircleOutline } from "react-icons/md";
import CustomButton from "../../components/ui/CustomButton";
import CustomInput from "../../components/ui/CustomInput";
import CustomTextArea from "../../components/ui/CustomTextArea";
import CustomAutocomplete from "../../components/ui/CustomAutocomplete";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useSumbitStaffMutation } from "../../hooks/mutations/usePostData";
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
  status: boolean;
};

const AddStaffModa = () => {
  // const [isActive, setIsActive] = useState<boolean>(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate } = useSumbitStaffMutation();

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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const selectedCountryLabel =
      country.find((c) => c.id === data.country)?.label || "";
    const selectedStateLabel =
      state.find((s) => s.id === data.state)?.label || "";

    const updatedFormData = {
      ...data,
      country: selectedCountryLabel,
      state: selectedStateLabel,
    };

    console.log("Final Updating Staff data: ", updatedFormData);
    mutate(updatedFormData);

    reset();
    onOpenChange(false);
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.error(errors);
  };

  return (
    <>
      <CustomButton
        label="Add Staff"
        type="button"
        size="sm"
        color="primary"
        startContent={<MdAddCircleOutline size={20} />}
        onPress={onOpen}
        className="-mt-6 sm:mt-0"
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add Staff
                </ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-2 gap-5">
                    <CustomInput
                      label="Name"
                      isRequired={true}
                      type="text"
                      placeholder="Enter name"
                      {...register("fullName", {
                        required: "Name is required",
                        maxLength: {
                          value: 30,
                          message: "Name must be less than 30 characters",
                        },
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message:
                            "Name cannot contain numbers or special characters",
                        },
                      })}
                      isInvalid={!!errors?.fullName}
                      errorMessage={errors?.fullName?.message}
                    />

                    <CustomInput
                      label="Email"
                      isRequired={true}
                      type="text"
                      placeholder="Enter email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Enter a valid email address",
                        },
                      })}
                      isInvalid={!!errors?.email}
                      errorMessage={errors?.email?.message}
                    />

                    <CustomInput
                      label="Phone No"
                      isRequired={true}
                      type="text"
                      placeholder="Enter mobile no"
                      {...register("phoneNumber", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Only numbers are allowed",
                        },
                        minLength: {
                          value: 7,
                          message: "Phone number must be at least 7 digits",
                        },
                        maxLength: {
                          value: 15,
                          message: "Phone number must be less than 15 digits",
                        },
                      })}
                      isInvalid={!!errors?.phoneNumber}
                      errorMessage={errors?.phoneNumber?.message}
                    />

                    <CustomInput
                      label="Address"
                      isRequired={true}
                      type="text"
                      placeholder="Enter address"
                      {...register("address", {
                        required: "Address is required",
                        maxLength: {
                          value: 90,
                          message: "Address must be less than 90 characters",
                        },
                        minLength: {
                          value: 2,
                          message: "Address must be at least 3 characters",
                        },
                      })}
                      isInvalid={!!errors?.address}
                      errorMessage={errors?.address?.message}
                    />

                    <CustomAutocomplete
                      label="Country"
                      isRequired={true}
                      placeholder="Enter country"
                      defaultItems={country}
                      selectedKey={watch("country") || undefined}
                      width="none"
                      onSelectionChange={(id) => {
                        setValue("country", id, { shouldValidate: true });
                      }}
                      isInvalid={!!errors?.country}
                      errorMessage={errors?.country?.message}
                    />

                    <CustomAutocomplete
                      label="State"
                      isRequired={true}
                      placeholder="Enter state"
                      defaultItems={state}
                      selectedKey={watch("state") || undefined}
                      width="none"
                      onSelectionChange={(id) => {
                        setValue("state", id, { shouldValidate: true });
                      }}
                      isInvalid={!!errors?.state}
                      errorMessage={errors?.state?.message}
                    />

                    <CustomInput
                      label="City"
                      isRequired={true}
                      type="text"
                      placeholder="Enter city"
                      {...register("city", {
                        required: "City is required",
                        maxLength: {
                          value: 20,
                          message: "City must be less than 20 characters",
                        },
                        minLength: {
                          value: 3,
                          message: "City must be at least 3 characters",
                        },
                      })}
                      isInvalid={!!errors?.city}
                      errorMessage={errors?.city?.message}
                    />

                    <CustomInput
                      label="Zipcode"
                      isRequired={true}
                      type="text"
                      placeholder="Enter zipcode"
                      {...register("zipCode", {
                        required: "Zipcode is required",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Only numbers are allowed",
                        },
                        minLength: {
                          value: 2,
                          message: "Zipcode must be at least 2 digits",
                        },
                        maxLength: {
                          value: 15,
                          message: "Zipcode must be less than 15 digits",
                        },
                      })}
                      isInvalid={!!errors?.zipCode}
                      errorMessage={errors?.zipCode?.message}
                    />
                  </div>
                  <div className="mt-3">
                    <CustomCheckbox
                      label="Active"
                      onValueChange={(value) =>
                        setValue("status", value, { shouldValidate: true })
                      }
                      size="sm"
                      defaultSelected={true}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <CustomButton
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onClose();
                      reset();
                    }}
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

export default AddStaffModa;
