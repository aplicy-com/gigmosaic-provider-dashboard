export interface IServiceProps {
  serviceId: string;
  serviceTitle: string;
  slug: string;
  categoryId: string;
  serviceProvider: string;
  subCategoryId: string;
  duration: number;
  serviceOverview: string;
  price: number;
  staff: string[];
  includes?: string[];
  isActive: boolean;
  gallery: [
    {
      serviceImages: [];
      videoLink: string;
    }
  ];
  location: [
    {
      address: string;
      city: string;
      state: string;
      country: string;
      pinCode: string;
      googleMapsPlaceId?: string;
      longitude?: number;
      latitude?: number;
    }
  ];
  additionalServices?: [];
  faq?: [];
  availability: {
    alldate: boolean;
    Monday?: { from: string; to: string }[];
    Tuesday?: { from: string; to: string }[];
    Wednesday?: { from: string; to: string }[];
    Thursday?: { from: string; to: string }[];
    Friday?: { from: string; to: string }[];
    Saturday?: { from: string; to: string }[];
    Sunday?: { from: string; to: string }[];
  };
}
