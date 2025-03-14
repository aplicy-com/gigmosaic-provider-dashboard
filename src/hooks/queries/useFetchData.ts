import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getAllServiceData,
  getServiceDataById,
  getServicesByProviderId,
} from "../../api/service/apiService";
import { getAllStaffData } from "../../api/service/apiStaff";
import {
  getAllCategoryData,
  getCategoryById,
} from "../../api/service/apiCategory";
import { getAllSubCategoryData } from "../../api/service/apiSubCategory";
import { QueryKey } from "../queryKey";
import {
  getAllOfferData,
  getOfferDataById,
  getActiveOffersForService,
} from "../../api/service/apiOffers";

//GET ALL SERVICE

export const useFetchAllService = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: [QueryKey.GET_ALL_SERVICE, page, limit],
    queryFn: ({ queryKey }) => {
      const [, page, limit] = queryKey as [string, number?, number?];
      return getAllServiceData({ page, limit });
    },
    staleTime: 1 * 60 * 1000,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

//GET SERVICE DATA BY ID
export const useFetchServiceDataById = (id?: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_SERVICE_BY_ID, id],
    queryFn: () =>
      id ? getServiceDataById(id) : Promise.reject("No ID provided"),
    staleTime: 1 * 60 * 1000,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

//GET Category DATA BY ID
export const useFetchCategoryById = (id?: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_SERVICE_BY_ID, id],
    queryFn: () =>
      id ? getCategoryById(id) : Promise.reject("No ID provided"),
    staleTime: 1 * 60 * 1000,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

//GET ALL STAFF
export const useFetchStaff = () => {
  return useQuery({
    queryKey: [QueryKey.GET_ALL_STAFF],
    queryFn: getAllStaffData,
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

//GET ALL CATEGORY
export const useFetchCategory = () => {
  return useQuery({
    queryKey: [QueryKey.GET_ALL_CATEGORY],
    queryFn: getAllCategoryData,
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

//GET ALL SUB CATEGORY
export const useFetchSubCategory = () => {
  return useQuery({
    queryKey: [QueryKey.GET_ALL_SUBCATEGORY],
    queryFn: getAllSubCategoryData,
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

//GET ALL OFFERS
export const useFetchAllOffers = (providerId: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_ALL_OFFERS, providerId],
    queryFn: () => getAllOfferData(providerId),
    staleTime: 1 * 60 * 1000,
    enabled: !!providerId,
    refetchOnWindowFocus: false,
  });
};

//GET ACTIVE OFFERS FOR SERVICE
export const useFetchActiveOffersForService = (serviceId: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_ACTIVE_SERVICE_OFFERS, serviceId],
    queryFn: () => getActiveOffersForService(serviceId),
    staleTime: 1 * 60 * 1000,
    enabled: !!serviceId,
    refetchOnWindowFocus: false,
  });
};

//GET OFFER DATA BY ID
export const useFetchOfferDataById = (id?: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_OFFER_BY_ID, id],
    queryFn: () =>
      id ? getOfferDataById(id) : Promise.reject("No ID provided"),
    staleTime: 1 * 60 * 1000,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

//GET SERVICES BY PROVIDER ID
export const useFetchProviderServices = (providerId: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_PROVIDER_SERVICES, providerId],
    queryFn: () => getServicesByProviderId(providerId),
    staleTime: 1 * 60 * 1000,
    enabled: !!providerId,
    refetchOnWindowFocus: false,
  });
};
