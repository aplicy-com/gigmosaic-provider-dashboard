import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  getAllServiceData,
  getServiceDataById,
} from "../../api/service/apiService";
import { getAllStaffData, getStaffById } from "../../api/service/apiStaff";
import {
  getAllCategoryData,
  getCategoryById,
} from "../../api/service/apiCategory";
import { getAllSubCategoryData } from "../../api/service/apiSubCategory";
import { QueryKey } from "../queryKey";

//GET ALL SERVICE
export const useFetchAllService = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: [QueryKey.GET_ALL_SERVICE, page, limit],
    queryFn: ({ queryKey }) => {
      const [_, page, limit] = queryKey as [string, number?, number?];
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

export const useFetchStaffById = (id?: string) => {
  return useQuery({
    queryKey: [QueryKey.GET_ALL_STAFF, id],
    queryFn: () => (id ? getStaffById(id) : Promise.reject("No ID provided")),
    // staleTime: 1 * 60 * 1000,
    enabled: !!id,
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
