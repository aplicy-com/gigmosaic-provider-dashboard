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
  basicInfo: IServiceProps,
  staff: string[],
  updatedAdditionalInfo: {
    id: number;
    image: string;
    serviceItem: string;
    price: number;
  }[],
  include: string[],
  faq: { question: string; answer: string }[],
  metaDetails: {
    metaTitle: string;
    metaKeywords: string[];
    metaDescription: string;
  },
  location: ILocationProps | undefined,
  formatGallary: { images: string[]; videoLink: string },
  Availability: IAvailabilityProps[] | undefined,
  isActive: boolean,
  isUpdate?: boolean
) => {
  console.log("LOCATION001 :", location);

  const formattedAvailability = Availability
    ? Availability.reduce((acc, { day, available, from, to, maxBookings }) => {
        const fromTime = moment(from, ["HH:mm", "h:mm A"]).format("hh:mm A"); // Convert to 12-hour format
        const toTime = moment(to, ["HH:mm", "h:mm A"]).format("hh:mm A"); // Convert to 12-hour format

        const existingEntry = acc.find((entry) => entry.day === day);
        const newTimeSlot = { from: fromTime, to: toTime, maxBookings };

        if (existingEntry) {
          existingEntry.timeSlots.push(newTimeSlot);
        } else {
          acc.push({
            day,
            available,
            timeSlots: [newTimeSlot],
          });
        }

        return acc;
      }, [] as { day: string; available: boolean; timeSlots: { from: string; to: string; maxBookings: number }[] }[])
    : [];

  return {
    serviceTitle: basicInfo.serviceTitle || "",
    slug: basicInfo.slug || "",
    categoryId: basicInfo.categoryId || "",
    subCategoryId: basicInfo.subCategoryId || "",
    serviceOverview: basicInfo?.serviceOverview || "",
    price: Number(basicInfo?.price) || 0,
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
        // address: isUpdate? location?.address || "": location[0]?.address || "",
        address: isUpdate ? location?.address || "" : location?.address || "",
        city: isUpdate ? location?.city || "" : location?.city || "",
        state: isUpdate ? location?.state || "" : location?.state || "",
        country: isUpdate ? location?.country || "" : location?.country || "",
        pinCode: isUpdate ? location?.pinCode || "" : location?.pinCode || "",
        googleMapsPlaceId: isUpdate
          ? location?.googleMapsPlaceId || ""
          : location?.googleMapsPlaceId || "",
        longitude: isUpdate
          ? location?.coordinates?.longitude || ""
          : location?.longitude || 0,
        latitude: isUpdate
          ? location?.coordinates?.latitude || ""
          : location?.latitude || 0,
      },
    ],
    additionalService: updatedAdditionalInfo || [],
    // additionalService: formattedAvailability,

    faq: faq || [],
    availability: formattedAvailability,
    // seo: [
    //   {
    //     metaTitle: data.seo?.[0]?.metaTitle || "",
    //     metaKeywords: convertToMetaKeyword || [],
    //     metaDescription: data.seo?.[0]?.metaDescription || "",
    //   },
    // ],
    seo: metaDetails,
  };
};

// export const formatAvailabilityPayload = (fields: IAvailabilityField[]) => {
//   const availabilityMap: Record<
//     string,
//     { day: string; available: boolean; timeSlots: TimeSlot[] }
//   > = {};
//   console.log(
//     "RUNNING....................................................................."
//   );
//   interface TimeSlot {
//     from: string;
//     to: string;
//   }
//   console.log("6789; ", fields);
//   const isAllDay = fields?.every((field) => field.day === "all-date");

//   const isTimeOverlap = (existingSlots: TimeSlot[], newSlot: TimeSlot) => {
//     return existingSlots.some(({ from, to }) => {
//       return (
//         (newSlot.from >= from && newSlot.from < to) || // Overlaps at the start
//         (newSlot.to > from && newSlot.to <= to) || // Overlaps at the end
//         (newSlot.from <= from && newSlot.to >= to) // Encloses an existing slot
//       );
//     });
//   };

//   for (const { day, fromFormatted, toFormatted, slot } of fields) {
//     if (!day || !fromFormatted || !toFormatted || slot === null) continue;

//     const fromTime = moment(fromFormatted, "HH:mm");
//     const toTime = moment(toFormatted, "HH:mm");

//     if (!availabilityMap[day]) {
//       availabilityMap[day] = {
//         day,
//         available: true,
//         timeSlots: [],
//       };
//     }

//     const newSlot = {
//       from: fromFormatted,
//       to: toFormatted,
//       maxBookings: slot,
//     };

//     console.log('New slot: ', newSlot)

//     if (isTimeOverlap(availabilityMap[day].timeSlots, newSlot)) {
//       console.log("Error----------------------01");
//       return {
//         allDay: isAllDay,
//         isValid: false,
//         error: "Time slots cannot overlap.",
//       };
//     }

//     if (toTime.isBefore(fromTime) || fromTime.isSame(toTime)) {
//       console.log("Error----------------------02");
//       return {
//         allDay: isAllDay,
//         isValid: false,
//         error: "End time must be later than start time.",
//       };
//     }

//     availabilityMap[day].timeSlots.push(newSlot);
//   }

//   return Object.values(availabilityMap);
// };

// export const formateDataForDropdown = (
//   data: string[] | number[],
//   dataLabel: string,
//   dataId: string
// ) => {
//   // console.log("STAFF: ", data);
//   if (
//     data === null ||
//     dataLabel === "" ||
//     dataId === "" ||
//     dataId.length === 0
//   ) {
//     return [];
//   }

//   const formattedData = data?.map((item: any) => {
//     return {
//       label: item[dataLabel],
//       id: item[dataId],
//     };
//   });

//   return formattedData;
// };

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// export const formatAvailabilityPayload = (fields: IAvailabilityField[]) => {
//   const availabilityMap: Record<
//     string,
//     { day: string; available: boolean; timeSlots: TimeSlot[] }
//   > = {};
//   console.log(
//     "RUNNING....................................................................."
//   );
//   interface TimeSlot {
//     from: string;
//     to: string;
//   }
//   console.log("6789; ", fields);
//   const isAllDay = fields?.every((field) => field.day === "all-date");

//   const isTimeOverlap = (existingSlots: TimeSlot[], newSlot: TimeSlot) => {
//     return existingSlots.some(({ from, to }) => {
//       return (
//         (newSlot.from >= from && newSlot.from < to) || // Overlaps at the start
//         (newSlot.to > from && newSlot.to <= to) || // Overlaps at the end
//         (newSlot.from <= from && newSlot.to >= to) // Encloses an existing slot
//       );
//     });
//   };

//   for (const { day, maxBookings, from, to, slot } of fields) {
//     if (!day || !maxBookings || !from || !to || slot === null) continue;

//     // const fromTime = moment(fromFormatted, "HH:mm");
//     // const toTime = moment(toFormatted, "HH:mm");

//     if (!availabilityMap[day]) {
//       availabilityMap[day] = {
//         day,
//         available: true,
//         timeSlots: [],
//       };
//     }

//     const newSlot = {
//       from: from,
//       to: to,
//       maxBookings: maxBookings,
//     };

//     console.log("New slot: ", newSlot);

//     if (isTimeOverlap(availabilityMap[day].timeSlots, newSlot)) {
//       console.log("Error----------------------01");
//       return {
//         allDay: isAllDay,
//         isValid: false,
//         error: "Time slots cannot overlap.",
//       };
//     }

//     if (to.isBefore(from) || from.isSame(to)) {
//       console.log("Error----------------------02");
//       return {
//         allDay: isAllDay,
//         isValid: false,
//         error: "End time must be later than start time.",
//       };
//     }

//     availabilityMap[day].timeSlots.push(newSlot);
//   }

//   return Object.values(availabilityMap);
// };

// export const formateDataForDropdown = (
//   data: string[] | number[],
//   dataLabel: string,
//   dataId: string
// ) => {
//   // console.log("STAFF: ", data);
//   if (
//     data === null ||
//     dataLabel === "" ||
//     dataId === "" ||
//     dataId.length === 0
//   ) {
//     return [];
//   }

//   const formattedData = data?.map((item: any) => {
//     return {
//       label: item[dataLabel],
//       id: item[dataId],
//     };
//   });

//   return formattedData;
// };

/////////////////////////////////////////////////////////////////////////////////////////

// import moment from "moment";

// interface TimeSlot {
//   from: string;
//   to: string;
//   maxBookings: number;
// }

// export const formatAvailabilityPayload = (fields: IAvailabilityField[]) => {
//   const availabilityMap: Record<
//     string,
//     { day: string; available: boolean; timeSlots: TimeSlot[] }
//   > = {};

//   console.log(
//     "RUNNING....................................................................."
//   );
//   console.log("6789; ", fields);

//   // Check if all fields have "all-date" day
//   const isAllDay = fields?.every((field) => field.day === "all-date");

//   // Function to check if timeslots overlap
//   const isTimeOverlap = (existingSlots: TimeSlot[], newSlot: TimeSlot) => {
//     return existingSlots.some(({ from, to }) => {
//       return (
//         (newSlot.from >= from && newSlot.from < to) || // Overlaps at the start
//         (newSlot.to > from && newSlot.to <= to) || // Overlaps at the end
//         (newSlot.from <= from && newSlot.to >= to) // Encloses an existing slot
//       );
//     });
//   };

//   for (const { day, maxBookings, from, to, slot } of fields) {
//     if (!day || !maxBookings || !from || !to || slot === null) continue;

//     // Convert time from "AM/PM" format to 24-hour format using moment
//     const fromTime = moment(from, "hh:mm A");
//     const toTime = moment(to, "hh:mm A");

//     console.log("fromTime: ", fromTime);
//     console.log("toTime: ", toTime);

//     // Ensure the availability map is initialized for the day
//     if (!availabilityMap[day]) {
//       availabilityMap[day] = {
//         day,
//         available: true,
//         timeSlots: [],
//       };
//     }

//     const newSlot = {
//       from: fromTime.format("HH:mm"), // Store the time in 24-hour format
//       to: toTime.format("HH:mm"), // Store the time in 24-hour format
//       maxBookings: maxBookings,
//     };

//     console.log("New slot: ", newSlot);

//     // Check if there are overlapping time slots
//     if (isTimeOverlap(availabilityMap[day].timeSlots, newSlot)) {
//       console.log("Error----------------------01");
//       return {
//         allDay: isAllDay,
//         isValid: false,
//         error: "Time slots cannot overlap.",
//       };
//     }

//     // Check if the end time is after the start time
//     if (toTime.isBefore(fromTime) || fromTime.isSame(toTime)) {
//       console.log("Error----------------------02");
//       return {
//         allDay: isAllDay,
//         isValid: false,
//         error: "End time must be later than start time.",
//       };
//     }

//     // Add the new slot to the availability map
//     availabilityMap[day].timeSlots.push(newSlot);
//   }

//   // Return the formatted availability data
//   return Object.values(availabilityMap);
// };

import moment from "moment";

interface TimeSlot {
  from: string;
  to: string;
  maxBookings: number;
}

export const formatAvailabilityPayload = (fields: IAvailabilityField[]) => {
  const availabilityMap: Record<
    string,
    { day: string; available: boolean; timeSlots: TimeSlot[] }
  > = {};

  console.log("Processing fields: ", fields);

  const isAllDay = fields?.every((field) => field.day === "all-date");

  const isTimeOverlap = (existingSlots: TimeSlot[], newSlot: TimeSlot) => {
    const newFromTime = moment(newSlot.from, "HH:mm");
    const newToTime = moment(newSlot.to, "HH:mm");

    return existingSlots.some(({ from, to }) => {
      const existingFromTime = moment(from, "HH:mm");
      const existingToTime = moment(to, "HH:mm");

      return (
        newFromTime.isBetween(
          existingFromTime,
          existingToTime,
          undefined,
          "[)"
        ) || // Overlaps at the start
        newToTime.isBetween(
          existingFromTime,
          existingToTime,
          undefined,
          "(]"
        ) || // Overlaps at the end
        (newFromTime.isSameOrBefore(existingFromTime) &&
          newToTime.isSameOrAfter(existingToTime)) // Encloses an existing slot
      );
    });
  };

  let errors: string[] = [];

  for (const { day, maxBookings, from, to, slot } of fields) {
    if (!day || !maxBookings || !from || !to || slot === null) continue;

    // Function to parse time in both 24-hour and 12-hour formats
    const parseTime = (time: string) => {
      let parsedTime = moment(time, "HH:mm", true); // Try 24-hour format
      if (!parsedTime.isValid()) {
        parsedTime = moment(time, "hh:mm A", true); // Try 12-hour format
      }
      return parsedTime;
    };

    const fromTime = parseTime(from);
    const toTime = parseTime(to);

    // Ensure time conversion was successful
    if (!fromTime.isValid() || !toTime.isValid()) {
      console.error("Invalid time format:", { from, to });
      errors.push("Invalid time format.");
      continue; // Skip this entry instead of returning
    }

    // Ensure the availability map is initialized for the day
    if (!availabilityMap[day]) {
      availabilityMap[day] = {
        day,
        available: true,
        timeSlots: [],
      };
    }

    const newSlot = {
      from: fromTime.format("HH:mm"), // Convert to 24-hour format
      to: toTime.format("HH:mm"),
      maxBookings: maxBookings,
    };

    // console.log("New slot: ", newSlot);

    // Check if the new slot overlaps with existing ones
    if (isTimeOverlap(availabilityMap[day].timeSlots, newSlot)) {
      console.log("Error: Time slots cannot overlap.");
      errors.push("Time slots cannot overlap.");
      continue; // Skip adding this slot
    }

    // Check if end time is later than start time
    if (!toTime.isAfter(fromTime)) {
      console.log("Error: End time must be later than start time.");
      errors.push("End time must be later than start time.");
      continue; // Skip adding this slot
    }

    // Update availability map
    availabilityMap[day] = {
      ...availabilityMap[day], // Preserve existing data
      timeSlots: [...availabilityMap[day].timeSlots, newSlot], // Append new slot
    };
  }

  if (errors.length > 0) {
    return {
      allDay: isAllDay,
      isValid: false,
      errors, // Return all collected errors
    };
  }

  // return Object.values(availabilityMap);
  return {
    allDay: isAllDay,
    isValid: true,
    errors,
  };
};

export const formateDataForDropdown = (
  data: string[] | number[],
  dataLabel: string,
  dataId: string
) => {
  if (
    data === null ||
    dataLabel === "" ||
    dataId === "" ||
    dataId.length === 0
  ) {
    return [];
  }

  // Format the dropdown data
  const formattedData = data?.map((item: any) => {
    return {
      label: item[dataLabel],
      id: item[dataId],
    };
  });

  return formattedData;
};
