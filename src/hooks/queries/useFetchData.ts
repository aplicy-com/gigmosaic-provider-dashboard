import { useQuery } from "@tanstack/react-query";
import { getServiceDataById } from "../../api/service/apiService";
import { getAllStaffData } from "../../api/service/apiStaff";
import { getAllCategoryData } from "../../api/service/apiCategory";
import { getAllSubCategoryData } from "../../api/service/apiSubCategory";

//GET SERVICE DATA BY ID
export const useFetchServiceDataById = (id?: string) => {
  return useQuery({
    queryKey: ["fetchServiceDataById", id],
    queryFn: () =>
      id ? getServiceDataById(id) : Promise.reject("No ID provided"),
    staleTime: 5000,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

//GET STAFF DATA BY ID
export const useFetchStaff = () => {
  return useQuery({
    queryKey: ["fetchServiceDataById"],
    queryFn: getAllStaffData,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });
};

//GET CATEGORY DATA BY ID
export const useFetchCategory = () => {
  return useQuery({
    queryKey: ["cate"],
    queryFn: getAllCategoryData,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });
};

//GET SUB CATEGORY DATA BY ID
export const useFetchSubCategory = () => {
  return useQuery({
    queryKey: ["subcate"],
    queryFn: getAllSubCategoryData,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });
};
