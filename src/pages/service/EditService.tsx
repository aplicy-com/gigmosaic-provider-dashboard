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
  useFetchServiceDataById,
  useFetchStaff,
  useFetchSubCategory,
} from "../../hooks/queries/useFetchData";
import CustomButton from "../../components/ui/CustomButton";

const EditService = () => {
  const { handleSubmit, register, control } = useForm<IServiceProps>({});
  const [staff, setStaff] = useState<string[]>([]);
  const [displayStaff, setDisplayStaff] = useState<{ label: any; id: any }[]>(
    []
  );
  const [addtionalInfo, setAddtionalInfo] = useState<
    { serviceItem: string; price: number; images: File | null }[]
  >([]);
  const [displayAddtionalInfo, setADisplayddtionalInfo] = useState<
    { serviceItem: string; price: number; image: File | null }[]
  >([]);
  const [include, setInclude] = useState<string[]>([]);
  const [serviceOverview, setServiceOverview] = useState<string>("");
  const [faq, setFaq] = useState<IFaqProps[]>([]);
  const [displayFaq, setDisplayFaq] = useState<IFaqProps[]>([]);
  const [metaKeyword, setMetaKeyword] = useState<string>("");
  const [location, setlocation] = useState<ILocationProps>();
  const [isActive, setIsActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [gallaryData, setGallaryData] = useState<IGallaryProps>();
  const [displayGallaryData, setDisplayGallaryData] = useState<string[]>();
  const [link, setLink] = useState<string[]>();
  const [availability, setAvailability] = useState<IAvailabilityProps[]>();
  const [data, setData] = useState<IServiceProps>();

  const [displayCategory, setDisplayCategory] = useState();
  const [displaySubCategory, setDisplaySubCategory] = useState();

  const { mutate } = useSumbitServiceMutation();
  const convertToMetaKeyword = convertToTagsArray(metaKeyword);

  const { data: apiData } = useFetchServiceDataById("SID_48");
  const { data: staffData } = useFetchStaff();
  const { data: categoryData } = useFetchCategory();
  const { data: subCategoryData } = useFetchSubCategory();

  // console.log("apiData: ", apiData);
  // console.log("setAddtionalInfo+++++++++: ", addtionalInfo);
  console.log("FAQ: ", faq);

  const handleAdditionalInfoChange = (updatedValues: typeof addtionalInfo) => {
    setAddtionalInfo([...updatedValues]); // Ensure a fresh update
  };

  const handleGalleryChange = (newFiles: (string | File)[]) => {
    setGallaryData(newFiles); // Store both URLs and new files
  };

  useEffect(() => {
    if (apiData) {
      setApiData();
    }
  }, [apiData]);

  const setApiData = async () => {
    // console.log("API INCLUDE:  ", apiData?.serviceInfo?.includes);
    // setAddtionalInfo(apiData?.serviceInfo?.additionalServices);
    setADisplayddtionalInfo(apiData?.serviceInfo?.additionalServices);
    setData(apiData?.serviceInfo);
    setInclude(apiData?.serviceInfo?.includes);
    setServiceOverview(apiData?.serviceInfo?.serviceOverview);
    setFaq(apiData?.serviceInfo?.faq);
    setDisplayFaq(apiData?.serviceInfo?.faq);
    setMetaKeyword(
      apiData?.serviceInfo?.seo?.[0]?.metaKeywords?.join(", ") || ""
    );
    setlocation(apiData?.serviceInfo?.location);
    setIsActive(apiData?.serviceInfo?.isActive);
    setStaff(apiData?.serviceInfo?.staff);
    const formatStaff = await formateDataForDropdown(
      staffData?.staff,
      "fullName",
      "staffId"
    );
    setDisplayStaff(formatStaff);
    setDisplayGallaryData(apiData?.serviceInfo?.gallery[0].serviceImages);
    setLink(apiData?.serviceInfo?.gallery[0].videoLink);
    console.log(
      "GALLERY DATA: ",
      apiData?.serviceInfo?.gallery[0].serviceImages
    );

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
  console.log("2222222222222222222222: ", link);
  const onSubmit: SubmitHandler<IServiceProps> = async (data) => {
    setLoading(true);
    console.log("$$$$$$$$$$$$$$$: ", gallaryData);
    try {
      if (!gallaryData?.images || gallaryData.images.length === 0) {
        console.log("No images found in gallery data.");
        return;
      }
      const formatGallary = await uploadImages(gallaryData);
      console.log("GALLARY]]]]]]]]]]]]]]]]]]: ", formatGallary);
      // const imageUrls: string[] = await Promise.all(
      //   (gallaryData?.images ?? []).map((image) => uploadToS3(image, "service"))
      // );

      // Upload images inside addtionalInfo
      // const updatedAdditionalInfo = await Promise.all(
      //   addtionalInfo.map(async (item, index) => {
      //     if (item.images) {
      //       const uploadedImageUrl = await uploadToS3(
      //         item.images,
      //         "service-addtional-infomation"
      //       );
      //       return { ...item, images: uploadedImageUrl, id: index + 1 };
      //     }
      //     return { ...item, images: "", id: index + 1 };
      //   })
      // );

      const updatedAdditionalInfo = await Promise.all(
        addtionalInfo.map(async (item, index) => {
          // ✅ If the image is already a URL, keep it as is
          if (typeof item.images === "string") {
            return { ...item, id: index + 1 };
          }

          // ✅ If the image is a File, upload it
          if (item.images instanceof File) {
            const uploadedImageUrl = await uploadToS3(
              item.images,
              "service-additional-information"
            );
            return { ...item, images: uploadedImageUrl, id: index + 1 };
          }

          // ✅ If there's no image, set it to an empty string
          return { ...item, images: "", id: index + 1 };
        })
      );

      const formatedData = await formatServiceData(
        data,
        staff,
        updatedAdditionalInfo,
        include,
        serviceOverview,
        faq,
        convertToMetaKeyword,
        location,
        formatGallary,
        // imageUrls,
        // gallaryData.videoLink,
        availability,
        isActive
      );
      await console.log("FINAL PAYLOAD UPDATE------: ", formatedData);
      mutate(formatedData);
    } catch (error) {
      console.log("Error submit: ", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (gallaryData: {
    images: (string | File)[];
    videoLink: string;
  }) => {
    if (!gallaryData?.images) return;

    // Separate URLs and Files
    const existingImageUrls = gallaryData.images.filter(
      (img) => typeof img === "string"
    ) as string[];
    const newFiles = gallaryData.images.filter(
      (img) => img instanceof File
    ) as File[];

    // Upload only new files to S3
    const uploadedFileUrls: string[] = await Promise.all(
      newFiles.map((file) => uploadToS3(file, "service"))
    );

    // Merge existing URLs and new uploaded URLs
    const finalImageUrls = [...existingImageUrls, ...uploadedFileUrls];

    return {
      images: finalImageUrls,
      videoLink: gallaryData.videoLink, // Keep video link as it is
    };
  };
  console.log("Loading..............: ", loading);
  return (
    <>
      {loading ? <Loading label="Submitting..." /> : <></>}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <form> */}
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
                  value={data?.serviceTitle}
                  {...register("serviceTitle")}
                />
                <CustomInput
                  label="Service Slug"
                  isRequired={true}
                  type="text"
                  placeholder="Enter slug"
                  value={data?.slug}
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
                        // defaultItems={[
                        //   { label: "Category 1", id: "1" },
                        //   { label: "Category 2", id: "2" },
                        //   { label: "Category 3", id: "3" },
                        // ]}
                        defaultItems={displayCategory}
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
                        // defaultItems={[
                        //   { label: "Category 1", id: "1" },
                        //   { label: "Category 2", id: "2" },
                        //   { label: "Category 3", id: "3" },
                        // ]}
                        defaultItems={displaySubCategory}
                        width="none"
                        onSelectionChange={(id) => field.onChange(id)}
                        isRequired={true}
                      />
                    )}
                  />
                </div>
                <CustomNumberInput
                  value={data?.price}
                  label="Price"
                  isRequired={true}
                  {...register("price")}
                />

                {/* Staff */}
                <Divider className="my-1" />
                <p className="text-md font-medium -mt-3">Staffs</p>

                <CustomMultiselectDropdown
                  label="Select Staff"
                  options={displayStaff}
                  handleChangevalue={setStaff}
                  isUpdate={true}
                  value={staff}
                />

                {/* Include */}
                <Divider className="my-1" />
                <p className="text-md font-medium -mt-3">Includes</p>
                <SingleMultipleInput
                  value={include}
                  onChangeValude={setInclude}
                />
                <Divider className="my-1" />

                {/* Addtional information */}
                <p className="text-md font-medium -mt-3">
                  Addtional information{" "}
                </p>
                <MultipleInput
                  isUpdate={true}
                  value={displayAddtionalInfo}
                  onChangeValude={handleAdditionalInfoChange}
                />

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
            <Card radius="none" className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">Gallary</p>
              </CardHeader>

              <CardBody className="gap-6">
                <Divider className="-my-2" />
                <GallaryInput
                  link={link}
                  value={displayGallaryData}
                  onChangeValue={setGallaryData}
                  // value={displayGallaryData}
                  // onChangeValue={handleGalleryChange}
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
                <CustomDubbleInput
                  isUpdate={true}
                  value={displayFaq}
                  onChangeValue={setFaq}
                />
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
                  value={data?.seo?.[0]?.metaTitle}
                  {...register("seo.0.metaTitle")}
                />
                <CustomInput
                  size="md"
                  label="Meta Tag"
                  type="text"
                  placeholder="Enter Tags"
                  description="Enter comma separated tags (Ex: tag1, tag2, tag3)"
                  isRequired={true}
                  value={metaKeyword}
                  onValueChange={setMetaKeyword}
                />

                <CustomTextArea
                  label="Meta Description"
                  placeholder="Enter meta description"
                  isRequired={true}
                  value={data?.seo?.[0]?.metaDescription}
                  {...register("seo.0.metaDescription")}
                />
              </CardBody>
            </Card>
            <Card radius="none" className="px-3 py-3 mb-5">
              <CardHeader>
                <p className="text-md font-medium">Location</p>
              </CardHeader>

              <LocationInputs
                data={data?.location[0]}
                onChangeValue={setlocation}
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
            label="Update"
            type="submit"
            color="primary"
            size="md"
          />
        </div>
      </form>
    </>
  );
};

export default EditService;
