import * as Yup from 'yup';
import moment from 'moment';

export const serviceTitleRule = Yup.string()
  .required('Service Title is required')
  .min(2, 'Service Title is too short')
  .max(80, 'Service Title is too long');

export const serviceSlugRule = Yup.string()
  .required('Slug is required')
  .min(2, 'Slug is too short')
  .max(80, 'Slug is too long');

export const serviceCategoryRule = Yup.string().required(
  'Category is required',
);

export const serviceSubCategoryRule = Yup.string().required(
  'Sub-Category is required',
);

export const serviceDurationRule = Yup.number()
  .typeError('Duration must be a valid number')
  .required('Duration is required')
  .positive('Duration must be greater than 0');

export const amountRule = Yup.number()
  .typeError('Amount must be a valid number')
  .required('Amount is required')
  .positive('Amount must be greater than 0');

export const offerTypeRule = Yup.string().required('Offer Type is required');

export const offerAmountRule = Yup.number()
  .transform((value, originalValue) => (originalValue === '' ? null : value))
  .typeError('Offer Amount must be a valid number')
  .positive('Offer Amount must be greater than 0')
  .nullable();

export const offerDurationTypeRule = Yup.string()
  .typeError('Offer Duration Type must be a valid text')
  .required('Offer Duration Type is required');

export const offerDurationRule = Yup.string()
  .typeError('Offer Duration must be a valid text')
  .required('Offer Duration is required');

export const afterDiscountAmountRule = Yup.number()
  .typeError('After Discount Amount  must be a valid number')
  .required('After Discount Amount is required')
  .positive('After Discount Amount must be greater than 0');

export const isActiveRule = Yup.boolean().required('Is Active is required');

export const serviceProviderRule = Yup.string().required(
  'Service Provider is required',
);

export const serviceOverviewRule = Yup.string()
  .required('Service Overview is required')
  .min(2, 'Service Overview is too short')
  .max(3000, 'Service Overview is too long');

export const staffRule = Yup.array()
  .min(1, 'Staff is required')
  .required('Staff is required');
// export const staffRule = Yup.array().oneOf([], 'Staff is required');

export const includesRule = Yup.array()
  .required('Includes is required')
  .max(5, 'Includes must be less than 5')
  .nullable();

// export const additionalServiceRule = Yup.object({
//   serviceItem: Yup.string()
//     .required('Title is required')
//     .max(80, 'Title is too long')
//     .min(2, 'Title is too short'),
//   price: Yup.number()
//     .required('Price is required')
//     .negative('Price must be greater than 0'),
//   duration: Yup.number()
//     .required('Duration is required')
//     .negative('Duration must be greater than 0'),
//   images: Yup.number().required('Image is required'),
// }).nullable();

export const additionalServiceRule = Yup.array()
  .of(
    Yup.object().shape({
      serviceItem: Yup.string()
        .required('Title is required')
        .max(80, 'Title is too long')
        .min(2, 'Title is too short'),
      price: Yup.number()
        .required('Price is required')
        .moreThan(0, 'Price must be greater than 0'),
      duration: Yup.number()
        .required('Duration is required')
        .moreThan(0, 'Duration must be greater than 0'),
      images: Yup.mixed().required('Image is required'),
    }),
  )
  .nullable();

// export const faqRule = Yup.object()
//   .shape({
//     question: Yup.string()
//       .required('Question is required')
//       .min(2, 'Question is too short')
//       .max(250, 'Question is too long'),
//     answer: Yup.string()
//       .required('Answer is required')
//       .min(2, 'Answer is too short')
//       .max(250, 'Answer is too long'),
//   })
//   .nullable();

// export const faqRule = Yup.array()
//   .of(
//     Yup.object().shape({
//       question: Yup.string()
//         .trim()
//         .min(5, 'Question must be at least 5 characters')
//         .max(200, 'Question must be at most 200 characters')
//         .required('Question is required'),
//       answer: Yup.string()
//         .trim()
//         .min(5, 'Answer must be at least 5 characters')
//         .max(500, 'Answer must be at most 500 characters')
//         .required('Answer is required'),
//     }),
//   )
//   .min(1, 'At least one FAQ is required');

export const faqRule = Yup.object().required('At least one FAQ is required');

export const metaTitleRule = Yup.string()
  .typeError('Meta Title must be a valid text')
  .required('Meta Title is required')
  .min(3, 'Meta Title is too short')
  .max(60, 'Meta Title is too long');

export const metaDescriptionRule = Yup.string()
  .typeError('Meta Description  must be a valid text')
  .required('Meta Description is required')
  .min(3, 'Meta Description is too short')
  .max(160, 'Meta Description is too long');

export const metaKeywordsRule = Yup.array()
  .required('Meta Keyword is required')
  .min(1, 'Meta Keywords is required')
  .max(10, 'Meta Keywords must be less than 10');

export const videoLinkRule = Yup.string().required('Video Link is required');

// export const availabilityRule = Yup.object().required(
//   'Availability is required',
// );

export const addressRule = Yup.string()
  .required('Address is required')
  .min(2, 'Address is too short')
  .max(250, 'Address is too long');

export const countryRule = Yup.string().required('Country is required');

export const cityRule = Yup.string()
  .required('City is required')
  .min(2, 'City is too short')
  .max(80, 'City is too long');

export const stateRule = Yup.string()
  .required('State is required')
  .min(2, 'State is too short')
  .max(80, 'State is too long');

export const pincodeRule = Yup.string()
  .required('Pincode is required')
  .min(2, 'Pincode is too short')
  .max(20, 'Pincode is too long');

export const latitudeRule = Yup.number()
  .typeError('Latitude must be a valid number')
  .required('Latitude is required');

export const longitudeRule = Yup.number()
  .typeError('Longitude must be a valid number')
  .required('Longitude is required');

export const googleMapIdRule = Yup.string()
  .typeError('Longitude must be a valid string')
  .required('Google Map ID is required');

export const imageRule = Yup.array()
  .required('Image is required')
  .min(1, 'Image is required')
  .max(15, 'Image must be less than 10');

export const linkRule = Yup.string().url('Invalid URL');

// export const availabilityRule = Yup.object().shape({
//   AllDays: Yup.array().of(
//     Yup.object().shape({
//       from: Yup.mixed().nullable().required('Start time is required'),
//       to: Yup.mixed()
//         .nullable()
//         .required('End time is required')
//         .test(
//           'is-after',
//           'End time must be after start time',
//           function (value) {
//             const { from } = this.parent;
//             return from && value
//               ? moment(value, 'HH:mm').isAfter(moment(from, 'HH:mm'))
//               : true;
//           },
//         ),
//       slots: Yup.number()
//         .typeError('Slots must be a number')
//         .positive('Slots must be greater than 0')
//         .required('Slots are required'),
//     }),
//   ),
//   Monday: Yup.array().of(
//     Yup.object().shape({
//       from: Yup.mixed().nullable().required('Start time is required'),
//       to: Yup.mixed()
//         .nullable()
//         .required('End time is required')
//         .test(
//           'is-after',
//           'End time must be after start time',
//           function (value) {
//             const { from } = this.parent;
//             return from && value
//               ? moment(value, 'HH:mm').isAfter(moment(from, 'HH:mm'))
//               : true;
//           },
//         ),
//       slots: Yup.number()
//         .typeError('Slots must be a number')
//         .positive('Slots must be greater than 0')
//         .required('Slots are required'),
//     }),
//   ),
//   Tuesday: Yup.array().of(
//     Yup.object().shape({
//       from: Yup.mixed().nullable().required('Start time is required'),
//       to: Yup.mixed()
//         .nullable()
//         .required('End time is required')
//         .test(
//           'is-after',
//           'End time must be after start time',
//           function (value) {
//             const { from } = this.parent;
//             return from && value
//               ? moment(value, 'HH:mm').isAfter(moment(from, 'HH:mm'))
//               : true;
//           },
//         ),
//       slots: Yup.number()
//         .typeError('Slots must be a number')
//         .positive('Slots must be greater than 0')
//         .required('Slots are required'),
//     }),
//   ),
//   Wednesday: Yup.array().of(
//     Yup.object().shape({
//       from: Yup.mixed().nullable().required('Start time is required'),
//       to: Yup.mixed()
//         .nullable()
//         .required('End time is required')
//         .test(
//           'is-after',
//           'End time must be after start time',
//           function (value) {
//             const { from } = this.parent;
//             return from && value
//               ? moment(value, 'HH:mm').isAfter(moment(from, 'HH:mm'))
//               : true;
//           },
//         ),
//       slots: Yup.number()
//         .typeError('Slots must be a number')
//         .positive('Slots must be greater than 0')
//         .required('Slots are required'),
//     }),
//   ),
//   Thursday: Yup.array().of(
//     Yup.object().shape({
//       from: Yup.mixed().nullable().required('Start time is required'),
//       to: Yup.mixed()
//         .nullable()
//         .required('End time is required')
//         .test(
//           'is-after',
//           'End time must be after start time',
//           function (value) {
//             const { from } = this.parent;
//             return from && value
//               ? moment(value, 'HH:mm').isAfter(moment(from, 'HH:mm'))
//               : true;
//           },
//         ),
//       slots: Yup.number()
//         .typeError('Slots must be a number')
//         .positive('Slots must be greater than 0')
//         .required('Slots are required'),
//     }),
//   ),
//   Friday: Yup.array().of(
//     Yup.object().shape({
//       from: Yup.mixed().nullable().required('Start time is required'),
//       to: Yup.mixed()
//         .nullable()
//         .required('End time is required')
//         .test(
//           'is-after',
//           'End time must be after start time',
//           function (value) {
//             const { from } = this.parent;
//             return from && value
//               ? moment(value, 'HH:mm').isAfter(moment(from, 'HH:mm'))
//               : true;
//           },
//         ),
//       slots: Yup.number()
//         .typeError('Slots must be a number')
//         .positive('Slots must be greater than 0')
//         .required('Slots are required'),
//     }),
//   ),
//   Saturday: Yup.array().of(
//     Yup.object().shape({
//       from: Yup.mixed().nullable().required('Start time is required'),
//       to: Yup.mixed()
//         .nullable()
//         .required('End time is required')
//         .test(
//           'is-after',
//           'End time must be after start time',
//           function (value) {
//             const { from } = this.parent;
//             return from && value
//               ? moment(value, 'HH:mm').isAfter(moment(from, 'HH:mm'))
//               : true;
//           },
//         ),
//       slots: Yup.number()
//         .typeError('Slots must be a number')
//         .positive('Slots must be greater than 0')
//         .required('Slots are required'),
//     }),
//   ),
//   Sunday: Yup.array().of(
//     Yup.object().shape({
//       from: Yup.mixed().nullable().required('Start time is required'),
//       to: Yup.mixed()
//         .nullable()
//         .required('End time is required')
//         .test(
//           'is-after',
//           'End time must be after start time',
//           function (value) {
//             const { from } = this.parent;
//             return from && value
//               ? moment(value, 'HH:mm').isAfter(moment(from, 'HH:mm'))
//               : true;
//           },
//         ),
//       slots: Yup.number()
//         .typeError('Slots must be a number')
//         .positive('Slots must be greater than 0')
//         .required('Slots are required'),
//     }),
//   ),
// });

// export const availabilityRule = Yup.object().shape({
//   AllDays: Yup.object()
//     .test(
//       'at-least-one-slot',
//       'At least one available time slot is required.',
//       (value) =>
//         value &&
//         Object.values(value).some((daySlots) =>
//           (daySlots as { from: string; to: string; slots: number }[]).some(
//             (slot) => slot.from && slot.to && slot.slots > 0,
//           ),
//         ),
//     )
//     .required('Availability is required.'),
// });

export const availabilityRule = Yup.object().shape({
  availability: Yup.object().test(
    'at-least-one-valid-day',
    'At least one day must have a valid time slot.',
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
              Number(slot.slots) > 0,
          ),
      ),
  ),
  // .required('Availability is required.'),
});
