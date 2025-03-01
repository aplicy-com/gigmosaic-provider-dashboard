import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomInput from "../../components/ui/CustomInput";
import CustomNumberInput from "../../components/ui/CustomNumberInput";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";
import CustomAutocomplete from "../../components/ui/CustomAutocomplete";
import { IAvailabilityProps, IServiceProps } from "../../types";
import CustomMultiselectDropdown from "../../components/ui/CustomMultiselectDropdown";
import SingleMultipleInput from "../../components/ui/SingleMultipleInput";
import MultipleInput from "../../components/ui/MultipleInput";
import TextEdior from "../../components/ui/TextEdior";
import CustomAvailabilityInput from "../../components/ui/CustomAvailabilityInput";
import CustomTextArea from "../../components/ui/CustomTextArea";
import CustomDubbleInput from "../../components/ui/CustomDubbleInput";
import GallaryInput from "../../components/ui/GallaryInput";
import LocationInputs from "../../components/LocationInputs";
import { ILocationProps, IFaqProps, IGallaryProps } from "../../types";
import {
  convertToTagsArray,
  formateDataForDropdown,
  formatServiceData,
} from "../../utils/serviceUtils";
import { useSumbitServiceMutation } from "../../hooks/mutations/usePostData";
import CustomCheckbox from "../../components/ui/CustomCheckbox";
import { uploadToS3 } from "../../aws/s3FileUpload";
import Loading from "../../components/ui/Loading";
import {
  useFetchCategory,
  useFetchStaff,
  useFetchSubCategory,
} from "../../hooks/queries/useFetchData";
import CustomButton from "../../components/ui/CustomButton";

const AddService = () => {
  const { handleSubmit } = useForm<IServiceProps>({});
  const [staff, setStaff] = useState<string[]>([]);
  const [addtionalInfo, setAddtionalInfo] = useState<
    { serviceItem: string; price: number; images: File | null }[]
  >([]);
  const [include, setInclude] = useState<string[]>([]);
  const [displayStaff, setDisplayStaff] = useState<
    { label: string; id: number }[]
  >([]);
  // const [serviceOverview, setServiceOverview] = useState<string>("");
  const [faq, setFaq] = useState<IFaqProps[]>([]);
  const [location, setlocation] = useState<ILocationProps>();
  const [isActive, setIsActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [gallaryData, setGallaryData] = useState<IGallaryProps>();
  const [availability, setAvailability] = useState<IAvailabilityProps[]>();
  const [displayCategory, setDisplayCategory] = useState<
    { label: string; id: number }[]
  >([]);
  const [displaySubCategory, setDisplaySubCategory] = useState<
    { label: string; id: number }[]
  >([]);
  const [basicInfo, setBasicInfo] = useState({
    serviceTitle: "",
    slug: "",
    categoryId: "",
    subCategoryId: "",
    serviceOverview: "",
    price: 0,
  });

  const [metaDetails, setMetaDetails] = useState<{
    metaTitle: string;
    metaKeywords: string[];
    metaDescription: string;
  }>({
    metaTitle: "",
    metaKeywords: [],
    metaDescription: "",
  });

  // const [locationDetails, setLocationDetails] = useState<ILocationProps>()

  const { mutate } = useSumbitServiceMutation();
  const { data: staffData } = useFetchStaff();
  const { data: categoryData } = useFetchCategory();
  const { data: subCategoryData } = useFetchSubCategory();

  console.log("categoryData: ", categoryData);
  console.log("AVi------------------: ", availability);
  console.log("BASIC INFO------------------: ", basicInfo);
  console.log("META INFO------------------: ", metaDetails);

  useEffect(() => {
    setApiData();
  }, [staffData]);

  const setApiData = async () => {
    const formtedStaff = await formateDataForDropdown(
      staffData?.staff,
      "fullName",
      "staffId"
    );
    setDisplayStaff(formtedStaff);

    const formtedCategory = await formateDataForDropdown(
      categoryData?.categories,
      "categoryName",
      "categoryId"
    );
    setDisplayCategory(formtedCategory);

    const formtedSubCategory = await formateDataForDropdown(
      subCategoryData?.subCategories,
      "subCategoryName",
      "subCategoryId"
    );
    setDisplaySubCategory(formtedSubCategory);
  };

  const convertMetaKeyword = async (keyword: string) => {
    console.log("Keyaword: ", keyword);
    const convertToMetaKeyword = convertToTagsArray(keyword);
    console.log("991: ", convertToMetaKeyword);
    setMetaDetails((prevDetails) => ({
      ...prevDetails,
      metaKeywords: convertToMetaKeyword,
    }));
  };

  const onSubmit: SubmitHandler<IServiceProps> = async () => {
    setLoading(true);
    console.log("VAI-----:", availability);
    try {
      if (!gallaryData?.images || gallaryData.images.length === 0) {
        console.log("No images found in gallery data.");
        return;
      }

      const imageUrls: string[] = await Promise.all(
        (gallaryData?.images ?? []).map((image) => uploadToS3(image, "service"))
      );

      const formatGallary = {
        images: imageUrls,
        videoLink: gallaryData?.videoLink,
      };

      // Upload images inside addtionalInfo
      console.log("formatGallary: ", formatGallary);
      const updatedAdditionalInfo = await Promise.all(
        addtionalInfo.map(async (item, index) => {
          if (item.images) {
            const uploadedImageUrl = await uploadToS3(
              item.images,
              "service-addtional-infomation"
            );
            return { ...item, images: uploadedImageUrl, id: index + 1 };
          }
          return { ...item, images: "", id: index + 1 };
        })
      );

      const formatedData = await formatServiceData(
        basicInfo,
        staff,
        updatedAdditionalInfo,
        include,
        // serviceOverview,
        faq,
        // convertToMetaKeyword,
        metaDetails,
        location,
        // imageUrls,
        // gallaryData.videoLink,
        formatGallary,
        availability,
        isActive
      );
      await console.log("FINAL PAYLOAD SUMBIT------: ", formatedData);
      mutate(formatedData);
    } catch (error) {
      console.log("Error submit: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? <Loading label="Submitting..." /> : <></>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card radius="none" className="px-3 py-3 mb-5">
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
                  name={basicInfo.serviceTitle}
                  onValueChange={(e) => {
                    setBasicInfo({
                      ...basicInfo,
                      serviceTitle: e,
                    });
                  }}
                />
                <CustomInput
                  label="Service Slug"
                  isRequired={true}
                  type="text"
                  placeholder="Enter slug"
                  name={basicInfo.slug}
                  onValueChange={(e) => {
                    setBasicInfo({
                      ...basicInfo,
                      slug: e,
                    });
                  }}
                />
                <div className="grid grid-cols-2 gap-4">
                  <CustomAutocomplete
                    label="Category"
                    placeholder="Select category"
                    defaultItems={displayCategory}
                    width="none"
                    onSelectionChange={(id) => {
                      setBasicInfo({
                        ...basicInfo,
                        categoryId: id,
                      });
                    }}
                    isRequired={true}
                  />
                  <CustomAutocomplete
                    label="Sub Category"
                    placeholder="Select subcategory"
                    defaultItems={displaySubCategory}
                    width="none"
                    onSelectionChange={(id) => {
                      setBasicInfo({
                        ...basicInfo,
                        subCategoryId: id,
                      });
                    }}
                    isRequired={true}
                  />
                </div>
                <CustomNumberInput
                  label="Price"
                  isRequired={true}
                  name={basicInfo.price}
                  onValueChange={(e) => {
                    setBasicInfo({
                      ...basicInfo,
                      price: e,
                    });
                  }}
                />

                {/* Staff */}
                <Divider className="my-1" />
                <p className="text-md font-medium -mt-3">Staffs</p>

                <CustomMultiselectDropdown
                  label="Select Staff"
                  options={displayStaff}
                  handleChangevalue={setStaff}
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
                  // onChangeValue={setServiceOverview}
                  // value={serviceOverview}
                  name={basicInfo.serviceOverview}
                  // onChange={setBasicInfo}
                  // {...register("serviceOverview")}
                  // onChange={(e) => {
                  //   setBasicInfo({
                  //     ...basicInfo,
                  //     serviceOverview: e.target.value,
                  //   });
                  // }}
                  onChangeValue={(value) =>
                    setBasicInfo((prev) => ({
                      ...prev,
                      serviceOverview: value,
                    }))
                  }
                  value={basicInfo.serviceOverview}
                />
              </CardBody>
            </Card>

            {/* Gallary */}
            <Card radius="none" className="px-3 py-3 mb-5 rounded-none">
              <CardHeader>
                <p className="text-md font-medium">Gallary</p>
              </CardHeader>

              <CardBody className="gap-6">
                <Divider className="-my-2" />
                <GallaryInput
                  onChangeValue={(value) =>
                    setGallaryData(value as IGallaryProps)
                  }
                />
              </CardBody>
            </Card>

            {/* Active Service */}
            <Card radius="none" className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">Active Service</p>
              </CardHeader>

              <CardBody>
                <CustomCheckbox
                  label="Active"
                  isSelected={isActive}
                  onValueChange={setIsActive}
                />
              </CardBody>
            </Card>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <Card radius="none" className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">Availability</p>
              </CardHeader>

              {/* Availability */}
              <CardBody className="gap-6">
                <Divider className="-my-2" />
                <CustomAvailabilityInput onChangeValue={setAvailability} />
              </CardBody>
            </Card>

            {/* FAQ */}
            <Card radius="none" className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">FAQ</p>
              </CardHeader>

              <CardBody className="gap-6">
                <Divider className="-my-2" />
                <CustomDubbleInput onChangeValue={setFaq} />
              </CardBody>
            </Card>

            {/* SEO */}
            <Card radius="none" className="px-3 py-3 mb-5">
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
                  // {...register("seo.0.metaTitle")}
                  name={metaDetails.metaTitle}
                  onValueChange={(e) => {
                    setMetaDetails({
                      ...metaDetails,
                      metaTitle: e,
                    });
                  }}
                />
                <CustomInput
                  size="md"
                  label="Meta Tag"
                  type="text"
                  placeholder="Enter Tags"
                  description="Enter comma separated tags (Ex: tag1, tag2, tag3)"
                  isRequired={true}
                  // onValueChange={setMetaKeyword}
                  name={metaDetails.metaKeywords}
                  onValueChange={(value) => convertMetaKeyword(value)}
                />

                <CustomTextArea
                  label="Meta Description"
                  placeholder="Enter meta description"
                  isRequired={true}
                  // {...register("seo.0.metaDescription")}
                  name={metaDetails.metaDescription}
                  onValueChange={(e) => {
                    setMetaDetails({
                      ...metaDetails,
                      metaDescription: e,
                    });
                  }}
                />
              </CardBody>
            </Card>
            <Card radius="none" className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">Location</p>
              </CardHeader>

              <LocationInputs onChangeValue={setlocation} />
            </Card>
          </div>
        </div>

        {/* <button type="submit">Submit</button> */}
        <div className="flex flex-initial justify-end items-end my-1 gap-5">
          <CustomButton
            label="Clear"
            type="reset"
            color="danger"
            size="md"
            variant="flat"
          />
          <CustomButton
            label="Sumbit"
            type="submit"
            color="primary"
            size="md"
          />
        </div>
      </form>
    </>
  );
};

export default AddService;
