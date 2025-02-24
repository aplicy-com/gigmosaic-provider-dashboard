import { useState } from "react";
import { Editor } from "primereact/editor";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "../components/ui/CustomInput";
import CustomNumberInput from "../components/ui/CustomNumberInput";
import CustomTextArea from "../components/ui/CustomTextArea";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import CustomAutocomplete from "../components/ui/CustomAutocomplete";
import { IServiceProps } from "../types";
import CustomMultiselectDropdown from "../components/ui/CustomMultiselectDropdown";
import SingleMultipleInput from "../components/ui/SingleMultipleInput";
import MultipleInput from "../components/ui/MultipleInput";

const AddService = () => {
  const { handleSubmit, register, control, setValue, watch } =
    useForm<IServiceProps>({});
  const [staff, setStaff] = useState<string[]>([]);
  const [addtionalInfo, setAddtionalInfo] = useState<
    { name: string; price: number; image: File | null }[]
  >([]);
  const [include, setInclude] = useState<string[]>([]);
  const [text, setText] = useState("");

  const onSubmit: SubmitHandler<IServiceProps> = (data: IServiceProps) => {
    console.log("Form Data:", data);
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
                {/* </div> */}

                {/* Include */}
                <Divider className="my-1" />
                <p className="text-md font-medium -mt-3">Includes</p>
                <SingleMultipleInput onChangeValude={setInclude} />
                {/* <CustomInput
                  label="Service Title"
                  isRequired={true}
                  type="text"
                  placeholder="Enter title"
                  onValueChange={() => {}}
                />
                <CustomInput
                  label="Service Slug"
                  isRequired={true}
                  type="text"
                  placeholder="Enter slug"
                  onValueChange={() => {}}
                /> */}
                {/* Addtional information */}
                <Divider className="my-1" />
                <p className="text-md font-medium -mt-3">
                  Addtional information{" "}
                </p>
                {/* <CustomInput
                  label="Service Title"
                  isRequired={true}
                  type="text"
                  placeholder="Enter title"
                  onValueChange={() => {}}
                />
                <CustomInput
                  label="Service Slug"
                  isRequired={true}
                  type="text"
                  placeholder="Enter slug"
                  onValueChange={() => {}}
                /> */}
                {/* <SingleMultipleInput /> */}
                {/*Service Overview */}
                <MultipleInput onChangeValude={setAddtionalInfo} />
                <Divider className="my-1" />
                <p className="text-md font-medium -mt-3">Service Overview </p>
                <Editor
                  value={text}
                  onTextChange={(e) => setText(e.htmlValue)}
                  style={{ height: "320px" }}
                />
              </CardBody>
            </Card>

            <Card className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">Location</p>
              </CardHeader>

              {/* Location */}
              <CardBody className="gap-6">
                <Divider className="-my-2" />
                <CustomInput
                  label="Address"
                  isRequired={true}
                  type="text"
                  placeholder="Enter adrress"
                  onValueChange={() => {}}
                />

                <div className="grid lg:grid-cols-2 gap-6">
                  <CustomInput
                    label="Country"
                    isRequired={true}
                    type="text"
                    placeholder="Enter country"
                    onValueChange={() => {}}
                  />
                  <CustomInput
                    label="City"
                    isRequired={true}
                    type="text"
                    placeholder="Enter city"
                    onValueChange={() => {}}
                  />
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  <CustomInput
                    label="State"
                    isRequired={true}
                    type="text"
                    placeholder="Enter state"
                    onValueChange={() => {}}
                  />
                  <CustomInput
                    label="pincode"
                    isRequired={true}
                    type="text"
                    placeholder="Enter pincode"
                    onValueChange={() => {}}
                  />
                </div>
                <CustomInput
                  label="Google Maps Place ID"
                  isRequired={true}
                  type="text"
                  placeholder="Enter maps place id"
                  onValueChange={() => {}}
                />
                <div className="grid lg:grid-cols-2 gap-6">
                  <CustomNumberInput
                    label="Latitude"
                    isRequired={true}
                    placeholder="Enter latitude"
                    onValueChange={() => {}}
                  />
                  <CustomNumberInput
                    label="Longitude"
                    isRequired={true}
                    placeholder="Enter latitude"
                    onValueChange={() => {}}
                  />
                </div>
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
                <CustomInput
                  label="Service Title"
                  isRequired={true}
                  type="text"
                  placeholder="Enter title"
                  onValueChange={() => {}}
                />
                <CustomInput
                  label="Service Slug"
                  isRequired={true}
                  type="text"
                  placeholder="Enter slug"
                  onValueChange={() => {}}
                />
                <CustomNumberInput
                  label="Price"
                  isRequired={true}
                  onValueChange={() => {}}
                />
              </CardBody>
            </Card>

            {/* FAQ */}
            <Card className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">FAQ</p>
              </CardHeader>

              <CardBody className="gap-6">
                <Divider className="-my-2" />
                <CustomInput
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  onValueChange={() => {}}
                />
                <CustomInput
                  size="md"
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  onValueChange={() => {}}
                />
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
                  onValueChange={() => {}}
                />
                <CustomInput
                  size="md"
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  onValueChange={() => {}}
                />

                <CustomInput
                  size="md"
                  label="Meta Description"
                  type="text"
                  placeholder="Enter meta description"
                  onValueChange={() => {}}
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
                <CustomInput
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  onValueChange={() => {}}
                />
                <CustomInput
                  size="md"
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  onValueChange={() => {}}
                />
              </CardBody>
            </Card>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddService;
