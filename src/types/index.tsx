import { TimeInputValue } from "@heroui/react";

export interface IFaqProps {
  question: string;
  answer: string;
}

export interface IGallaryProps {
  images?: File[];
  videoLink?: string;
}

export interface IAvailabilityField {
  id: number;
  day: string | null;
  from: TimeInputValue | null;
  fromFormatted?: string;
  to: TimeInputValue | null;
  toFormatted?: string;
  slot: number | null;
}

export interface IAvailabilityProps {
  day: string;
  available: boolean;
  timeSlots: {
    from: string;
    to: string;
    maxBookings: number;
  }[];
}

export interface ILocationProps {
  address: string;
  country: string;
  city: string;
  state: string;
  pinCode: string;
  latitude: string;
  longitude: string;
  googleMapsPlaceId: string;
}
export interface IServiceProps {
  serviceId: string;
  serviceTitle: string;
  slug: string;
  price: number;
  isOffers: boolean;
  offerPrice: number;
  priceAfterDiscount: number;
  categoryId: string;
  serviceProvider: string;
  subCategoryId: string;
  duration: number;
  serviceOverview: string;
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
  seo: [
    {
      metaTitle: string;
      metaKeywords: string[];
      metaDescription: string;
    }
  ];
}

export interface IOfferProps {
  offerId: string;
  providerId: string;
  serviceId: string;
  offerTitle: string;
  offerType: 'FIXED' | 'PERCENTAGE';
  offerPrice: number;  // This is now the discount value (either fixed amount or percentage)
  priceAfterDiscount: number;  
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
