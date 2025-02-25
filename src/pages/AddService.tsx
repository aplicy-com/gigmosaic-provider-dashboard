import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "../components/ui/CustomInput";
import CustomNumberInput from "../components/ui/CustomNumberInput";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import CustomAutocomplete from "../components/ui/CustomAutocomplete";
import { IServiceProps } from "../types";
import CustomMultiselectDropdown from "../components/ui/CustomMultiselectDropdown";
import SingleMultipleInput from "../components/ui/SingleMultipleInput";
import MultipleInput from "../components/ui/MultipleInput";
import TextEdior from "../components/ui/TextEdior";
import CustomAvailabilityInput from "../components/ui/CustomAvailabilityInput";
import CustomTextArea from "../components/ui/CustomTextArea";
import CustomDubbleInput from "../components/ui/CustomDubbleInput";
import GallaryInput from "../components/ui/GallaryInput";
import LocationInputs from "../components/LocationInputs";
import { ILocationProps, IFaqProps } from "../types";
import { convertToTagsArray, formatServiceData } from "../utils/serviceUtils";
import { useSumbitServiceMutation } from "../hooks/mutations/usePostData";
import CustomCheckbox from "../components/ui/CustomCheckbox";

const AddService = () => {
  const { handleSubmit, register, control, setValue, watch } =
    useForm<IServiceProps>({});
  const [staff, setStaff] = useState<string[]>([]);
  const [addtionalInfo, setAddtionalInfo] = useState<
    { name: string; price: number; image: File | null }[]
  >([]);
  const [include, setInclude] = useState<string[]>([]);
  const [serviceOverview, setServiceOverview] = useState<string>("");
  const [faq, setFaq] = useState<IFaqProps[]>([]);
  const [metaKeyword, setMetaKeyword] = useState<string>("");
  const [location, setlocation] = useState<ILocationProps>();
  const [images, setImages] = useState<File[]>([]);

  const { mutate, isLoading, isError, isSuccess, error } =
    useSumbitServiceMutation();

  const convertToMetaKeyword = convertToTagsArray(metaKeyword);

  const onSubmit: SubmitHandler<IServiceProps> = (data) => {
    const formatedData = formatServiceData(
      data,
      staff,
      addtionalInfo,
      include,
      serviceOverview,
      faq,
      convertToMetaKeyword,
      location,
      images
    );
    mutate(formatedData);
  };

  const dropdownItems = [
    { id: "text", label: "Mahesh" },
    { id: "number", label: "Jonney" },
    { id: "date", label: "Mark" },
    { id: "single_date", label: "Trump" },
    { id: "iteration", label: "Mahinda" },
    { id: "texdt", label: "Putin" },
    { id: "nudmber", label: "Number" },
  ];

  console.log("Staff: ", staff);
  console.log("Include: ", include);
  console.log("Addtional Info: ", addtionalInfo);
  console.log("Service Overview: ", serviceOverview);
  console.log("Faq: ", faq);
  console.log("Location: ", location);
  console.log("Gallary: ", images);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">Basic Information</p>
              </CardHeader>

              {/* Basic Information */}
              <CardBody className="gap-6">
                <Divider className="-my-2" />
                <CustomInput
                  label="Service Title"
                  isRequired={true}
                  type="text"
                  placeholder="Enter title"
                  {...register("serviceTitle")}
                />
                <CustomInput
                  label="Service Slug"
                  isRequired={true}
                  type="text"
                  placeholder="Enter slug"
                  {...register("slug")}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                      <CustomAutocomplete
                        label="Category"
                        placeholder="Select category"
                        defaultItems={[
                          { label: "Category 1", id: "1" },
                          { label: "Category 2", id: "2" },
                          { label: "Category 3", id: "3" },
                        ]}
                        width="none"
                        onSelectionChange={(id) => field.onChange(id)}
                        isRequired={true}
                      />
                    )}
                  />

                  <Controller
                    name="subCategoryId"
                    control={control}
                    render={({ field }) => (
                      <CustomAutocomplete
                        label="Sub Category"
                        placeholder="Select subcategory"
                        defaultItems={[
                          { label: "Category 1", id: "1" },
                          { label: "Category 2", id: "2" },
                          { label: "Category 3", id: "3" },
                        ]}
                        width="none"
                        onSelectionChange={(id) => field.onChange(id)}
                        isRequired={true}
                      />
                    )}
                  />
                </div>
                <CustomNumberInput
                  label="Price"
                  isRequired={true}
                  {...register("price")}
                />

                {/* Staff */}
                <Divider className="my-1" />
                <p className="text-md font-medium -mt-3">Staffs</p>

                <CustomMultiselectDropdown
                  label="Select Staff"
                  options={dropdownItems}
                  handleChnagevalue={setStaff}
                />

                {/* Include */}
                <Divider className="my-1" />
                <p className="text-md font-medium -mt-3">Includes</p>
                <SingleMultipleInput onChangeValude={setInclude} />
                <Divider className="my-1" />

                {/* Addtional information */}
                <p className="text-md font-medium -mt-3">
                  Addtional information{" "}
                </p>
                <MultipleInput onChangeValude={setAddtionalInfo} />

                {/* Service Overview */}
                <Divider className="my-1" />
                <p className="text-md font-medium -mt-3">Service Overview </p>
                <TextEdior
                  onChangeValue={setServiceOverview}
                  value={serviceOverview}
                  {...register("serviceOverview")}
                />
              </CardBody>
            </Card>

            {/* Gallary */}
            <Card className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">Gallary</p>
              </CardHeader>

              <CardBody className="gap-6">
                <Divider className="-my-2" />
                <GallaryInput onChangeValue={setImages} />
              </CardBody>
            </Card>

            {/* Active Service */}
            <Card className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">Active Service</p>
              </CardHeader>

              <CardBody>
                <CustomCheckbox
                  label="Active"
                  // isSelected={allDay}
                  // onValueChange={setAllDay}
                />
              </CardBody>
            </Card>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <Card className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">Availability</p>
              </CardHeader>

              {/* Availability */}
              <CardBody className="gap-6">
                <Divider className="-my-2" />
                <CustomAvailabilityInput />
              </CardBody>
            </Card>

            {/* FAQ */}
            <Card className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">FAQ</p>
              </CardHeader>

              <CardBody className="gap-6">
                <Divider className="-my-2" />
                <CustomDubbleInput onChangeValue={setFaq} />
              </CardBody>
            </Card>

            {/* SEO */}
            <Card className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">SEO</p>
              </CardHeader>

              <CardBody className="gap-6">
                <Divider className="-my-2" />
                <CustomInput
                  label="Meta Title"
                  type="text"
                  placeholder="Enter meta title"
                  isRequired={true}
                  {...register("seo.0.metaTitle")}
                />
                <CustomInput
                  size="md"
                  label="Meta Tag"
                  type="text"
                  placeholder="Enter Tags"
                  description="Enter comma separated tags (Ex: tag1, tag2, tag3)"
                  isRequired={true}
                  onValueChange={setMetaKeyword}
                />

                <CustomTextArea
                  label="Meta Description"
                  placeholder="Enter meta description"
                  isRequired={true}
                  {...register("seo.0.metaDescription")}
                />
              </CardBody>
            </Card>

            {/* Gallary */}
            {/* <Card className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">Gallary</p>
              </CardHeader>

              <CardBody className="gap-6">
                <Divider className="-my-2" />
                <GallaryInput />
              </CardBody>
            </Card> */}

            <Card className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">Location</p>
              </CardHeader>

              <LocationInputs onChangeValue={setlocation} />
            </Card>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddService;
