export const convertToTagsArray = (tags: string) => {
  return tags.split(",").map((tag) => tag.trim());
};

export const formatServiceData = (
  data,
  staff,
  addtionalInfo,
  include,
  serviceOverview,
  faq,
  convertToMetaKeyword,
  location,
  images
) => {
  // console.log("Raw data: ", data);
  // console.log("staff: ", staff);
  // console.log("addtionalInfo: ", addtionalInfo);
  // console.log("Raw addtionalInfo: ", addtionalInfo);
  // console.log("Raw include: ", include);
  // console.log("Raw serviceOverview: ", serviceOverview);
  // console.log("Raw faq: ", faq);
  // console.log("Raw convertToMetaKeyword: ", convertToMetaKeyword);
  // console.log("Raw location: ", location);
  // console.log("Raw images: ", images);

  const formatedService = {
    serviceTitle: data.serviceTitle || "",
    slug: data.slug || "",
    categoryId: data.categoryId || "",
    subCategoryId: data.subCategoryId || "",
    serviceOverview: data.serviceOverview || "",
    price: parseFloat(data.price) || 0,
    staff: staff || [],
    includes: include || [],
    // isActive: boolean;
    // gallery: [
    //   {
    //     serviceImages: [];
    //     videoLink: string;
    //   }
    // ],
    location: [
      {
        address: location.address || "",
        city: location.city || "",
        state: location.state || "",
        country: location.country || "",
        pincode: location.pincode || "",
        googleMapsPlaceId: location.googleMapId || "",
        longitude: location.longitude || 0,
        latitude: location.latitude || 0,
      },
    ],
    // additionalServices: [];
    faq: faq || [],
    // availability: {
    //   alldate: boolean;
    //   Monday?: { from: string; to: string }[];
    //   Tuesday?: { from: string; to: string }[];
    //   Wednesday?: { from: string; to: string }[];
    //   Thursday?: { from: string; to: string }[];
    //   Friday?: { from: string; to: string }[];
    //   Saturday?: { from: string; to: string }[];
    //   Sunday?: { from: string; to: string }[];
    // };
    seo: [
      {
        metaTitle: data.seo[0]?.metaTitle || "",
        convertToMetaKeywords: convertToMetaKeyword,
        metaDescription: data.seo[0]?.metaDescription || "",
      },
    ],
  };

  console.log("FOO---------------------: ", formatedService);
};
