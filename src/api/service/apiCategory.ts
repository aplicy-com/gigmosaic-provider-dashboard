import { apiClient } from "../axios/apiClient";
import { Path } from "../axios/endpoint";

export const getAllCategoryData = async () => {
  try {
    const res = await apiClient.get(Path.category);
    return res.data;
  } catch (error: any) {
    console.log("ERROR: ", error);
    // logger.error(error);
    throw error;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const res = await apiClient.get(Path.category + `/${id}`);
    return res.data;
  } catch (error: any) {
    console.log("ERROR: ", error);
    // logger.error(error);
    throw error;
  }
};
