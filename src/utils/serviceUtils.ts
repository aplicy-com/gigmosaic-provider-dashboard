import moment from "moment";
import {
  IAvailabilityField,
  IServiceProps,
  IAvailabilityProps,
  ILocationProps,
} from "../types";

export const convertToTagsArray = (tags: string) => {
  return tags.split(",").map((tag) => tag.trim());
};

export const formatServiceData = (
  data: IServiceProps,
  staff: string[],
  updatedAdditionalInfo: {
    id: number;
    image: string;
    serviceItem: string;
    price: number;
  }[],
  include: string[],
  serviceOverview: string,
  faq: { question: string; answer: string }[],
  convertToMetaKeyword: string[],
  location: ILocationProps | undefined,
  formatGallary: { images: string[]; videoLink: string },
  // images?: string[],
  // videoLink?: string,
  Availability: IAvailabilityProps[] | undefined,
  isActive: boolean
) => {
  console.log("formatGallary :", formatGallary);
  return {
    serviceTitle: data.serviceTitle || "",
    slug: data.slug || "",
    categoryId: data.categoryId || "",
    subCategoryId: data.subCategoryId || "",
    serviceOverview: serviceOverview || "",
    price: Number(data.price) || 0,
    staff: staff || [],
    includes: include || [],
    isActive: isActive ?? true,
    gallery: [
      {
        serviceImages: formatGallary?.images || [],
        videoLink: formatGallary?.videoLink || "",
      },
    ],
    location: [
      {
        address: location?.address || "",
        city: location?.city || "",
        state: location?.state || "",
        country: location?.country || "",
        pinCode: location?.pinCode || "",
        googleMapsPlaceId: location?.googleMapsPlaceId || "",
        longitude: location?.longitude || 0,
        latitude: location?.latitude || 0,
      },
    ],
    additionalService: updatedAdditionalInfo || [],
    faq: faq || [],
    availability: Availability || [],
    seo: [
      {
        metaTitle: data.seo?.[0]?.metaTitle || "",
        metaKeywords: convertToMetaKeyword || [],
        metaDescription: data.seo?.[0]?.metaDescription || "",
      },
    ],
  };
};

export const formatAvailabilityPayload = (fields: IAvailabilityField[]) => {
  const availabilityMap: Record<
    string,
    { day: string; available: boolean; timeSlots: TimeSlot[] }
  > = {};

  interface TimeSlot {
    from: string;
    to: string;
  }

  const isAllDay = fields?.every((field) => field.day === "all-date");

  const isTimeOverlap = (existingSlots: TimeSlot[], newSlot: TimeSlot) => {
    return existingSlots.some(({ from, to }) => {
      return (
        (newSlot.from >= from && newSlot.from < to) || // Overlaps at the start
        (newSlot.to > from && newSlot.to <= to) || // Overlaps at the end
        (newSlot.from <= from && newSlot.to >= to) // Encloses an existing slot
      );
    });
  };

  for (const { day, fromFormatted, toFormatted, slot } of fields) {
    if (!day || !fromFormatted || !toFormatted || slot === null) continue;

    const fromTime = moment(fromFormatted, "HH:mm");
    const toTime = moment(toFormatted, "HH:mm");

    if (!availabilityMap[day]) {
      availabilityMap[day] = {
        day,
        available: true,
        timeSlots: [],
      };
    }

    const newSlot = {
      from: fromFormatted,
      to: toFormatted,
      maxBookings: slot,
    };

    if (isTimeOverlap(availabilityMap[day].timeSlots, newSlot)) {
      return {
        allDay: isAllDay,
        isValid: false,
        error: "Time slots cannot overlap.",
      };
    }

    if (toTime.isBefore(fromTime) || fromTime.isSame(toTime)) {
      return {
        allDay: isAllDay,
        isValid: false,
        error: "End time must be later than start time.",
      };
    }

    availabilityMap[day].timeSlots.push(newSlot);
  }

  return Object.values(availabilityMap);
};

export const formateDataForDropdown = (
  data: string[] | number[],
  dataLabel: string,
  dataId: string
) => {
  // console.log("STAFF: ", data);
  if (
    data === null ||
    dataLabel === "" ||
    dataId === "" ||
    dataId.length === 0
  ) {
    return [];
  }

  const formattedData = data?.map((item: any) => {
    return {
      label: item[dataLabel],
      id: item[dataId],
    };
  });

  return formattedData;
};
