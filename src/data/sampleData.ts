export const days = [
  { label: "Monday", id: "monday" },
  { label: "Tuesday", id: "tuesday" },
  { label: "Wednesday", id: "wednesday" },
  { label: "Thursday", id: "thursday" },
  { label: "Friday", id: "friday" },
  { label: "Saturday", id: "saturday" },
  { label: "Sunday", id: "sunday" },
];

export const serviceInfo = [
  {
    serviceTitle: "Car service",
    slug: "car_service",
    categoryId: "CID_1",
    subCategoryId: "SCID_1",
    serviceOverview:
      "<p>Since you want to <strong>ignore TypeScript errors and force a build</strong>, you should modify the Since you want to <strong>ignore TypeScript errors and force a build</strong>, you should modify the </p>",
    price: 200,
    staff: ["STID_2", "STID_1"],
    includes: ["include 1", "include 2"],
    isActive: true,
    gallery: [
      {
        serviceImages: [
          "https://cdn.staging.gigmosaic.ca/service/2.png-1740819351737",
          "https://cdn.staging.gigmosaic.ca/service/10.png-1740819351737",
        ],
        videoLink: "http://localhost:5173/service/add",
      },
    ],
    location: [
      {
        address: "4452 Municipio de El Quebrachal, Argentina",
        city: "Municipio de El Quebrachal",
        state: "Salta",
        country: "Argentina",
        pinCode: "4452",
        googleMapsPlaceId:
          "516fd003c4490150c0599b221ba3d05539c0f00103f901f7eee99402000000c0020192031b4d756e69636970616c6964616420456c205175656272616368616c",
        longitude: -64.020531483,
        latitude: -25.335567317,
      },
    ],
    additionalService: [
      {
        id: 1,
        serviceItem: "add",
        price: "100",
        images:
          "https://cdn.staging.gigmosaic.ca/service-addtional-infomation/2.png-1740819356419",
      },
      {
        id: 2,
        serviceItem: "add 2",
        price: "200",
        images:
          "https://cdn.staging.gigmosaic.ca/service-addtional-infomation/1c.png-1740819356419",
      },
    ],
    faq: [
      {
        question: "faq",
        answer: "as",
      },
      {
        question: "faq1",
        answer: "as",
      },
    ],
    availability: [
      {
        day: "monday",
        available: true,
        timeSlots: [
          {
            from: "01:00 AM",
            to: "02:00 AM",
            maxBookings: 3,
          },
          {
            from: "03:00 AM",
            to: "04:00 AM",
            maxBookings: 2,
          },
        ],
      },
      {
        day: "saturday",
        available: true,
        timeSlots: [
          {
            from: "02:00 PM",
            to: "04:00 PM",
            maxBookings: 2,
          },
        ],
      },
    ],
    seo: [
      {
        metaTitle: "title",
        metaKeywords: ["tag1", "tag2", "tag3"],
        metaDescription: "description of meta",
      },
    ],
  },
];
