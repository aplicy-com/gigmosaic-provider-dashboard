import * as yup from "yup";
import moment from "moment";

export const serviceTitleRule = yup
  .string()
  .required("Service Title is required")
  .min(2, "Service Title is too short")
  .max(100, "Service Title is too long");

export const serviceSlugRule = yup
  .string()
  .required("Slug is required")
  .min(2, "Slug is too short")
  .max(100, "Slug is too long");

export const serviceCategoryRule = yup
  .string()
  .required("Category is required");

export const serviceSubCategoryRule = yup
  .string()
  .required("Sub-Category is required");

export const serviceDurationRule = yup
  .number()
  .typeError("Duration must be a valid number")
  .required("Duration is required")
  .positive("Duration must be greater than 0");

export const amountRule = yup
  .number()
  .typeError("Amount must be a valid number")
  .required("Amount is required")
  .positive("Amount must be greater than 0");

export const offerTypeRule = yup.string().required("Offer Type is required");

export const offerAmountRule = yup
  .number()
  .transform((value, originalValue) => (originalValue === "" ? null : value))
  .typeError("Offer Amount must be a valid number")
  .positive("Offer Amount must be greater than 0")
  .nullable();

export const offerDurationTypeRule = yup
  .string()
  .typeError("Offer Duration Type must be a valid text")
  .required("Offer Duration Type is required");

export const offerDurationRule = yup
  .string()
  .typeError("Offer Duration must be a valid text")
  .required("Offer Duration is required");

export const afterDiscountAmountRule = yup
  .number()
  .typeError("After Discount Amount  must be a valid number")
  .required("After Discount Amount is required")
  .positive("After Discount Amount must be greater than 0");

export const isActiveRule = yup.boolean().required("Is Active is required");

export const serviceProviderRule = yup
  .string()
  .required("Service Provider is required");

export const serviceOverviewRule = yup
  .string()
  .required("Service Overview is required")
  .min(10, "Service Overview is too short")
  .max(3000, "Service Overview is too long");

export const staffRule = yup
  .array()
  .min(1, "Staff is required")
  .required("Staff is required");

export const includesRule = yup
  .array()
  .required("Includes is required")
  .max(5, "Includes must be less than 5")
  .nullable();

export const additionalServiceRule = yup
  .array()
  .of(
    yup.object().shape({
      serviceItem: yup
        .string()
        .required("Title is required")
        .max(80, "Title is too long")
        .min(2, "Title is too short"),
      price: yup
        .number()
        .required("Price is required")
        .moreThan(0, "Price must be greater than 0"),
      duration: yup
        .number()
        .required("Duration is required")
        .moreThan(0, "Duration must be greater than 0"),
      images: yup.mixed().required("Image is required"),
    })
  )
  .nullable();

export const faqRule = yup.object().required("At least one FAQ is required");

export const metaTitleRule = yup
  .string()
  .typeError("Meta Title must be a valid text")
  .required("Meta Title is required")
  .min(3, "Meta Title is too short")
  .max(60, "Meta Title is too long");

export const metaDescriptionRule = yup
  .string()
  .typeError("Meta Description  must be a valid text")
  .required("Meta Description is required")
  .min(3, "Meta Description is too short")
  .max(160, "Meta Description must be less than 160");

export const metaKeywordsRule = yup
  .array()
  .required("Meta Keyword is required")
  .min(1, "Meta Keywords is required")
  .max(10, "Meta Keywords must be less than 10");

export const videoLinkRule = yup.string().required("Video Link is required");

export const addressRule = yup
  .string()
  .min(3, "Address is too short")
  .max(250, "Address is too long");

export const countryRule = yup
  .string()
  .required("Country is required")
  .min(3, "Country is too short")
  .max(80, "Country is too long");

export const cityRule = yup
  .string()
  .min(3, "City is too short")
  .max(80, "City is too long");

export const stateRule = yup
  .string()
  .min(3, "State is too short")
  .max(80, "State is too long");

export const pincodeRule = yup
  .string()
  .min(3, "Pincode is too short")
  .max(20, "Pincode is too long");

export const latitudeRule = yup
  .number()
  // .min(3, "Latitude is too short")
  .max(30, "Latitude is too long")
  .typeError("Latitude must be a valid number")
  .nullable();

export const longitudeRule = yup
  .number()
  // .min(3, "Longitude is too short")
  .max(30, "Longitude is too long")
  .typeError("Longitude must be a valid number")
  .nullable();

export const googleMapIdRule = yup
  .string()
  // .min(3, "Google Map Id is too short")
  .max(200, "Google Map Id is too long")
  .typeError("Google Map Id must be a valid string")
  .nullable();

export const imageRule = yup
  .array()
  .required("Image is required")
  .min(1, "Image is required")
  .max(15, "Image must be less than 10");

export const linkRule = yup.string().url("Invalid URL");

export const availabilityRule = yup.object().shape({
  availability: yup
    .object()
    .test(
      "at-least-one-valid-day",
      "At least one day must have a valid time slot.",
      (value) =>
        value &&
        Object.values(value).some(
          (daySlots) =>
            Array.isArray(daySlots) &&
            daySlots.some(
              (slot) =>
                slot.from &&
                slot.to &&
                slot.slots &&
                !isNaN(Number(slot.slots)) &&
                Number(slot.slots) > 0
            )
        )
    ),
  // .required('Availability is required.'),
});

/////////////////////////new validation

export const basicInfo = yup.object().shape({
  serviceTitle: yup.string().required("Service Title is required"),
});
