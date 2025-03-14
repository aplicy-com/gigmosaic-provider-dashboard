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
import CustomTextArea from "../../components/ui/CustomTextArea";
import CustomAutocomplete from "../../components/ui/CustomAutocomplete";
import { useForm, SubmitHandler } from "react-hook-form";
import { useFetchStaffById } from "../../hooks/queries/useFetchData";
import { useUpdateStaffMutation } from "../../hooks/mutations/useUpdateData";
import Loading from "../../components/ui/Loading";

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
};

const EditStaffModal = ({ id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedId, setSelectedId] = useState(null);
  const [apiState, setState] = useState("");
  const [apiCountry, setCountry] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { data, isLoading: isFetchingStaff } = useFetchStaffById(selectedId);
  const { mutate, isLoading: isUpdating } = useUpdateStaffMutation();

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
      console.log("Data: ", data);
      console.log("State: ", data.staff.state);
      console.log("Country: ", data.staff.country);
      setValue("fullName", data.staff.fullName || "");
      setValue("email", data.staff.email || "");
      setValue("phoneNumber", data.staff.phoneNumber || "");
      setValue("address", data.staff.address || "");
      setValue("city", data.staff.city || "");
      setValue("zipCode", data.staff.zipCode || "");
      setValue("description", data.staff.description);

      const findState = state.find((item) => item.label === data.staff.state);
      console.log("state00282: ", state);
      console.log("Country: ", data.staff.country);
      const findCountry = country.find(
        (item) => item.label === data.staff.country
      );

      console.log("Country001Obj: ", findCountry);

      console.log("findCountry: ", findCountry?.id);
      console.log("findState: ", findState?.id);

      // setState(findState?.id || "");
      // setCountry(findCountry?.id || "");
      setValue("state", findState?.id || "");
      setValue("country", findCountry?.id || "");
    }
  }, [data, setValue, apiCountry, apiState]);

  const handleOpen = () => {
    console.log("Open modal: ", id);
    setSelectedId(id);
    onOpen();
  };

  const onSubmit: SubmitHandler<FormValues> = (formData) => {
    console.log("Data update: ", formData);
    mutate({ id: selectedId, staffData: formData });
    onOpenChange(false);
  };

  return (
    <>
      {isUpdating && <Loading label="Updating..." />}
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
                        type="email"
                        isRequired
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
                        type="text"
                        isRequired
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
                        type="text"
                        isRequired
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
                        defaultItems={country}
                        // defaultSelectedKey={apiCountry}
                        isRequired
                        placeholder="Enter country"
                        {...register("country", {
                          required: "Country is required",
                        })}
                        isInvalid={!!errors?.country}
                        errorMessage={errors?.country?.message}
                      />
                      <CustomAutocomplete
                        label="State"
                        defaultItems={state}
                        // defaultSelectedKey={apiState}
                        isRequired
                        placeholder="Enter state"
                        {...register("state", {
                          required: "State is required",
                          maxLength: {
                            value: 20,
                            message: "State must be less than 20 characters",
                          },
                          minLength: {
                            value: 3,
                            message: "State must be at least 3 characters",
                          },
                        })}
                        isInvalid={!!errors?.state}
                        errorMessage={errors?.state?.message}
                      />
                      <CustomInput
                        label="City"
                        type="text"
                        isRequired
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
                        type="text"
                        isRequired
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
                  )}
                  <CustomTextArea
                    label="Note"
                    placeholder="Enter some note"
                    {...register("description", {
                      required: "Description is required",
                      maxLength: {
                        value: 100,
                        message: "Description must be less than 20 characters",
                      },
                      minLength: {
                        value: 3,
                        message: "Description must be at least 3 characters",
                      },
                    })}
                    isInvalid={!!errors?.description}
                    errorMessage={errors?.description?.message}
                  />
                </ModalBody>
                <ModalFooter>
                  <CustomButton
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onClose();
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

export default EditStaffModal;
