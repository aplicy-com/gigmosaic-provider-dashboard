import * as yup from "yup";
import {
  // additionalServiceRule,
  amountRule,
  includesRule,
  serviceCategoryRule,
  serviceOverviewRule,
  serviceSlugRule,
  serviceSubCategoryRule,
  serviceTitleRule,
  metaTitleRule,
  metaDescriptionRule,
  metaKeywordsRule,
  cityRule,
  stateRule,
  countryRule,
  addressRule,
  pincodeRule,
} from "./ValidationRules";

const serviceValidation = yup.object().shape({
  basicInfo: yup.object().shape({
    serviceTitle: serviceTitleRule,
    slug: serviceSlugRule,
    categoryId: serviceCategoryRule,
    subCategoryId: serviceSubCategoryRule,
    price: amountRule,
    serviceOverview: serviceOverviewRule,
  }),

  metaDetails: yup.object().shape({
    metaTitle: metaTitleRule,
    metaDescription: metaDescriptionRule,
    metaKeywords: metaKeywordsRule,
  }),

  location: yup.object().shape({
    city: cityRule,
    state: stateRule,
    country: countryRule,
    pinCode: pincodeRule,
    address: addressRule,
    // latitude: latitudeRule,
    // longitude: longitudeRule,
    // googleMapsPlaceId: googleMapIdRule,
  }),
  availability: yup.array().of(
    yup.object().shape({
      day: yup.string().required("Day is required"),
      from: yup.string().required("From time is required"),
      to: yup.string().required("To time is required"),
      maxBookings: yup
        .number()
        .required("Slot is required")
        .positive("Slot must be positive number"),
    })
  ),

  include: yup
    .array()
    .nullable()
    .of(yup.string().min(3, "Include must be at least 3 characters long")),

  gallaryData: yup.object().shape({
    images: yup.array().ensure().min(1, "At least one image is required"),
    videoLink: yup.string().url("Enter valid url").nullable(),
  }),

  // faq: yup.array().of(
  //   yup.object().shape({
  //     question: yup
  //       .string()
  //       .min(3, "Question must be at least 3 characters")
  //       .when("answer", {
  //         is: (answer: string | undefined) => Boolean(answer), // If answer exists
  //         then: yup.string().required("Question is required"),
  //       }),
  //     answer: yup
  //       .string()
  //       .min(3, "Answer must be at least 3 characters")
  //       .when("question", {
  //         is: (question: string | undefined) => Boolean(question), // If question exists
  //         then: yup.string().required("Answer is required"),
  //       }),
  //   })
  // ),
});

export default serviceValidation;
