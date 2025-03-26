import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "../../components/ui/CustomInput";
import CustomNumberInput from "../../components/ui/CustomNumberInput";
import { addToast, Card, CardBody, CardHeader, Divider } from "@heroui/react";
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
import {
  useFetchCategory,
  useFetchStaff,
  useFetchSubCategory,
} from "../../hooks/queries/useFetchData";
import CustomButton from "../../components/ui/CustomButton";
import serviceValidation from "../../validation/serviceValidation";
import { ValidationError } from "yup";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/ui/Loading";

const AddService = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm<IServiceProps>({});
  const [staff, setStaff] = useState<string[]>([]);
  const [validationError, setValidationError] = useState({});
  const [addtionalInfo, setAddtionalInfo] = useState<
    { serviceItem: string; price: number; images: File | null }[]
  >([]);
  const [include, setInclude] = useState<string[]>([]);
  const [displayStaff, setDisplayStaff] = useState<
    { label: string; id: number }[]
  >([]);
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

  const { mutate } = useSumbitServiceMutation();
  const { data: staffData } = useFetchStaff();
  const { data: categoryData } = useFetchCategory();
  const { data: subCategoryData } = useFetchSubCategory();

  useEffect(() => {
    setApiData();
  }, [staffData]);

  useEffect(() => {
    if (basicInfo.categoryId) {
      console.log("Category ID: ", basicInfo.categoryId);
      console.log("Subcategory data: ", subCategoryData);
      const subcategoryList = subCategoryData?.subCategories.filter(
        (subCategory: any) => subCategory.categoryId === basicInfo.categoryId
      );

      console.log("Filtered subcategoryList: ", subcategoryList);
      const formattedSubCategory = formateDataForDropdown(
        subcategoryList,
        "subCategoryName",
        "subCategoryId"
      );
      setDisplaySubCategory(formattedSubCategory);
    } else {
      setDisplaySubCategory([]);
    }
  }, [basicInfo.categoryId, subCategoryData]);

  const setApiData = async () => {
    const filteredStaff = staffData?.staff?.filter(
      (staff: any) => staff.status === true
    );

    const formtedStaff = await formateDataForDropdown(
      filteredStaff,
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
  };

  const convertMetaKeyword = async (keyword: string) => {
    const convertToMetaKeyword = convertToTagsArray(keyword);
    setMetaDetails((prevDetails) => ({
      ...prevDetails,
      metaKeywords: convertToMetaKeyword,
    }));
    setValidationError((prevErrors) => ({
      ...prevErrors,
      metaKeywords: "",
    }));
  };

  const onSubmit: SubmitHandler<IServiceProps> = async () => {
    setLoading(true);
    setValidationError({});

    try {
      await serviceValidation.validate(
        {
          staff,
          basicInfo,
          metaDetails,
          availability,
          location,
          include,
          faq,
          gallaryData,
          addtionalInfo,
        },
        { abortEarly: false }
      );

      if (!gallaryData?.images || gallaryData.images.length === 0) {
        console.log("No images found in gallery data.");
        setLoading(false); // Set loading to false after validation
        return;
      }

      const imageUrls: string[] = await Promise.all(
        (gallaryData?.images ?? []).map((image) => uploadToS3(image, "service"))
      );

      const formatGallary = {
        images: imageUrls,
        videoLink: gallaryData?.videoLink,
      };

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
        faq,
        metaDetails,
        location,
        formatGallary,
        availability,
        isActive
      );
      await console.log("FINAL PAYLOAD SUMBIT------: ", formatedData);
      await mutate(formatedData);

      navigate("/service/all-service");
    } catch (error) {
      if (error instanceof ValidationError) {
        console.log("Validation Errors:", error.inner);

        const errors: { [key: string]: string } = {};

        error.inner.forEach((err: ValidationError) => {
          const path = err.path;
          const message = err.message;

          const keys = path.split(".");
          keys.reduce((acc, part, index) => {
            if (index === keys.length - 1) {
              acc[part] = message;
            } else {
              acc[part] = acc[part] || "";
            }
            return acc;
          }, errors);
        });

        addToast({
          title: "Validation Error",
          description: "Fix Validation Errors",
          radius: "md",
          color: "danger",
        });
        console.log("Transformed errors:", errors);
        setValidationError(errors);
      }
    } finally {
      setLoading(false);
    }
  };

  console.log("ERRORS: ", validationError);
  console.log("Loading: ", loading);

  return (
    <>
      {loading && <Loading label="Submitting..." />}
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
                  name="serviceTitle"
                  onValueChange={(e) => {
                    setBasicInfo({
                      ...basicInfo,
                      serviceTitle: e,
                    });
                  }}
                />
                {validationError?.serviceTitle && (
                  <small className="text-error -mt-5">
                    {validationError?.serviceTitle}
                  </small>
                )}
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
                {validationError?.slug && (
                  <small className="text-error -mt-5">
                    {validationError?.slug}
                  </small>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <CustomAutocomplete
                      label="Category"
                      placeholder="Select category"
                      defaultItems={displayCategory}
                      selectedKey={basicInfo?.categoryId || undefined}
                      width="none"
                      onSelectionChange={(id) => {
                        setBasicInfo({
                          ...basicInfo,
                          categoryId: id,
                        });
                      }}
                      isRequired={true}
                    />
                    {validationError?.categoryId && (
                      <small className="text-error -mt-5">
                        {validationError?.categoryId}
                      </small>
                    )}
                  </div>
                  <div>
                    <CustomAutocomplete
                      label="Sub Category"
                      placeholder="Select subcategory"
                      description="First select category"
                      defaultItems={displaySubCategory}
                      selectedKey={basicInfo?.subCategoryId || undefined}
                      width="none"
                      onSelectionChange={(id) => {
                        setBasicInfo({
                          ...basicInfo,
                          subCategoryId: id,
                        });
                      }}
                      isRequired={true}
                    />
                    {validationError?.subCategoryId && (
                      <small className="text-error -mt-5">
                        {validationError?.subCategoryId}
                      </small>
                    )}
                  </div>
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
                {validationError?.price && (
                  <small className="text-error -mt-5">
                    {validationError?.price}
                  </small>
                )}

                {/* Staff */}
                <Divider className="my-1" />
                <p className="text-md font-medium -mt-3">Staffs</p>

                <CustomMultiselectDropdown
                  label="Select Staff"
                  options={displayStaff}
                  handleChangevalue={setStaff}
                />
                {/* {validationError?.serviceTitle && (
                  <small className="text-error -mt-5">
                    {validationError?.serviceTitle}
                  </small>
                )} */}

                {/* Include */}
                <Divider className="my-1" />
                <p className="text-md font-medium -mt-3">Includes</p>
                <SingleMultipleInput onChangeValude={setInclude} />
                {/* {validationError?.include && (
                  <small className="text-error -mt-5">
                    {validationError?.include}
                  </small>
                )} */}
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
                  name={basicInfo.serviceOverview}
                  onChangeValue={(value) => {
                    setBasicInfo((prev) => ({
                      ...prev,
                      serviceOverview: value,
                    }));
                  }}
                  value={basicInfo.serviceOverview}
                />
                {validationError?.serviceOverview && (
                  <p className="text-error -mt-5">
                    {validationError?.serviceOverview}
                  </p>
                )}
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
                  error={validationError}
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
                {validationError?.day && (
                  <small className="text-error -mt-5">
                    {validationError?.day}
                  </small>
                )}
                {validationError?.from && (
                  <small className="text-error -mt-5">
                    {validationError?.from}
                  </small>
                )}
                {validationError?.to && (
                  <small className="text-error -mt-5">
                    {validationError?.to}
                  </small>
                )}
                {validationError?.maxBookings && (
                  <small className="text-error -mt-5">
                    {validationError?.maxBookings}
                  </small>
                )}
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
                {validationError?.serviceTitle && (
                  <small className="text-error -mt-5">
                    {validationError?.serviceTitle}
                  </small>
                )}
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
                  name={metaDetails.metaTitle}
                  onValueChange={(e) => {
                    setMetaDetails({
                      ...metaDetails,
                      metaTitle: e,
                    });
                  }}
                />
                {validationError?.metaTitle && (
                  <small className="text-error -mt-5">
                    {validationError?.metaTitle}
                  </small>
                )}
                <CustomInput
                  size="md"
                  label="Meta Tag"
                  type="text"
                  placeholder="Enter Tags"
                  description="Enter comma separated tags (Ex: tag1, tag2, tag3)"
                  isRequired={true}
                  name={metaDetails.metaKeywords}
                  onValueChange={(value) => convertMetaKeyword(value)}
                />
                {validationError?.metaKeywords && (
                  <small className="text-error -mt-5">
                    {validationError?.metaKeywords}
                  </small>
                )}
                <CustomTextArea
                  label="Meta Description"
                  placeholder="Enter meta description"
                  isRequired={true}
                  name={metaDetails.metaDescription}
                  onValueChange={(e) => {
                    setMetaDetails({
                      ...metaDetails,
                      metaDescription: e,
                    });
                  }}
                />
                {validationError?.metaDescription && (
                  <small className="text-error -mt-5">
                    {validationError?.metaDescription}
                  </small>
                )}
              </CardBody>
            </Card>
            <Card radius="none" className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">Location</p>
              </CardHeader>

              <LocationInputs
                errors={validationError}
                onChangeValue={(value) => {
                  setlocation(value);
                }}
              />
            </Card>
          </div>
        </div>

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
