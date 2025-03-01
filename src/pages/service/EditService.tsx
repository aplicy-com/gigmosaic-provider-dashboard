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
import { serviceInfo } from "../../data/sampleData";
import { IoCodeSlashOutline } from "react-icons/io5";

const EditService = () => {
  const { handleSubmit, register, control } = useForm<IServiceProps>({});
  const [staff, setStaff] = useState<string[]>([]);
  const [displayStaff, setDisplayStaff] = useState<
    { label: string; id: number }[]
  >([]);
  const [addtionalInfo, setAddtionalInfo] = useState<ItemField[]>([]);
  // const [displayAddtionalInfo, setADisplayddtionalInfo] = useState<
  //   {
  //     serviceItem: string;
  //     price: number;
  //     image: File | null;
  //     id: number;
  //     images: string | File;
  //   }[]
  // >([]);
  const [displayAddtionalInfo, setADisplayddtionalInfo] = useState<ItemField[]>(
    []
  );

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
  const [link, setLink] = useState<string | undefined>();
  const [availability, setAvailability] = useState<IAvailabilityProps[]>();
  const [displayAvailability, setDisplayAvailability] =
    useState<IAvailabilityProps[]>();
  const [data, setData] = useState<IServiceProps>();
  const [isAllDay, setIsAllDay] = useState<boolean>(false);

  const [displayCategory, setDisplayCategory] = useState();
  const [displaySubCategory, setDisplaySubCategory] = useState();
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

  const isUpdate = true;

  const { mutate } = useSumbitServiceMutation();
  // const convertToMetaKeyword = convertToTagsArray(metaKeyword);

  const [apiData, setApiDataback] = useState<any>([]);

  useEffect(() => {
    let isMounted = true;
    fetch("http://localhost:3001/api/test-api")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          console.log(data);
          setApiDataback(data);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (apiData) {
      (async () => {
        await setApiData();
      })();
    }
  }, [apiData]);

  // useEffect(() => {
  //   fetchDataFromApi();
  // }, []);
  // const apiData = serviceInfo;

  // const { data: apiData } = useFetchServiceDataById("SID_48");   /// backend api call
  const { data: staffData } = useFetchStaff();
  const { data: categoryData } = useFetchCategory();
  const { data: subCategoryData } = useFetchSubCategory();

  // example data fetch by id but

  // console.log("API BACKEND DATA: ", apiData);
  // console.log("apiData: ", form);
  // return;
  interface ItemField {
    id: number;
    serviceItem: string;
    price: number;
    images: string | File | null;
  }

  const handleAdditionalInfoChange = (updatedValues: ItemField[]) => {
    setAddtionalInfo([...updatedValues]);
  };

  useEffect(() => {
    if (apiData) {
      setApiData();
    }
  }, [apiData]);

  const setApiData = async () => {
    setBasicInfo({
      serviceTitle: apiData?.serviceInfo?.serviceTitle,
      slug: apiData?.serviceInfo?.slug,
      categoryId: apiData?.serviceInfo?.categoryId,
      subCategoryId: apiData?.serviceInfo?.subCategoryId,
      serviceOverview: apiData?.serviceInfo?.serviceOverview,
      price: apiData?.serviceInfo?.price,
    });
    setMetaDetails({
      metaTitle: apiData?.serviceInfo?.seo?.[0]?.metaTitle,
      metaDescription: apiData?.serviceInfo?.seo?.[0]?.metaDescription,
      metaKeywords: apiData?.serviceInfo?.seo?.[0]?.metaKeywords,
    });
    setDisplayAvailability(apiData?.serviceInfo?.availability);
    setIsAllDay(false);
    setADisplayddtionalInfo(apiData?.serviceInfo?.additionalService);
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
    console.log("Edit link: ", apiData?.serviceInfo?.gallery[0].videoLink);
    console.log(
      "GALLERY DATA: ",
      apiData?.serviceInfo?.gallery[0].serviceImages
    );

    const formtedCategory = formateDataForDropdown(
      categoryData?.categories,
      "categoryName",
      "categoryId"
    );

    setDisplayCategory(formtedCategory);
    console.log("formtedCategory111111111111111111", formtedCategory);

    const formtedSubCategory = formateDataForDropdown(
      subCategoryData?.subCategories,
      "subCategoryName",
      "subCategoryId"
    );
    // console.log("formtedSubCategory1111111111111111111111", formtedSubCategory);
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

  const onSubmit: SubmitHandler<IServiceProps> = async (data) => {
    console.log("Location in edit parent: ", location);
    setLoading(true);
    // console.log("$$$$$$$$$$$$$$$: ", gallaryData);
    try {
      if (!gallaryData?.images || gallaryData.images.length === 0) {
        console.log("No images found in gallery data.");
        return;
      }
      const formatGallary = await uploadImages(gallaryData);
      // console.log("GALLARY]]]]]]]]]]]]]]]]]]: ", formatGallary);

      const updatedAdditionalInfo = await Promise.all(
        addtionalInfo.map(async (item, index) => {
          if (typeof item.images === "string") {
            return { ...item, id: index + 1 };
          }

          if (item.images instanceof File) {
            const uploadedImageUrl = await uploadToS3(
              item.images,
              "service-additional-information"
            );
            return { ...item, images: uploadedImageUrl, id: index + 1 };
          }

          return { ...item, images: "", id: index + 1 };
        })
      );

      const formatedData = await formatServiceData(
        // data,
        // staff,
        // updatedAdditionalInfo,
        // include,
        // serviceOverview,
        // faq,
        // convertToMetaKeyword,
        // location,
        // formatGallary,
        // availability,
        // isActive
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
        isActive,
        isUpdate
      );
      await console.log("FINAL PAYLOAD UPDATE------: ", formatedData);
      mutate(formatedData);
    } catch (error) {
      console.log("Error submit: ", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("LoL: ", location);
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
  // console.log("Category..............: ", formtedCategory);
  console.log("BASIC data------------: ", metaDetails);
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
                  name={basicInfo.serviceTitle}
                  value={basicInfo.serviceTitle}
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
                  value={basicInfo.slug}
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
                    selectedKey={basicInfo?.categoryId}
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
                    selectedKey={basicInfo?.subCategoryId}
                    defaultSelectedKey={basicInfo.subCategoryId}
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
                  value={basicInfo.price}
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
                  onChangeValue={(value) =>
                    setGallaryData({
                      images: value.images as File[],
                      videoLink: value.videoLink,
                    })
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
                <CustomAvailabilityInput
                  isAllDay={isAllDay}
                  value={displayAvailability}
                  onChangeValue={setAvailability}
                />
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
                  // value={data?.seo?.[0]?.metaTitle}
                  // {...register("seo.0.metaTitle")}
                  name={metaDetails.metaTitle}
                  value={metaDetails.metaTitle}
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
                  name={metaDetails.metaKeywords}
                  value={metaDetails.metaKeywords}
                  onValueChange={(value) => convertMetaKeyword(value)}
                  // onValueChange={setMetaKeyword}
                />

                <CustomTextArea
                  label="Meta Description"
                  placeholder="Enter meta description"
                  isRequired={true}
                  // value={data?.seo?.[0]?.metaDescription}
                  // {...register("seo.0.metaDescription")}
                  name={metaDetails.metaDescription}
                  value={metaDetails.metaDescription}
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
