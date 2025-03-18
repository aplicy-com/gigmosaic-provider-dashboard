import { apiClient } from "../axios/apiClient";
import { Path } from "../axios/endpoint";
import { IServiceProps } from "../../types";
// import logger from '../utils/logger';

export const sumbitStaffData = async (data) => {
  console.log("Running......submit");
  try {
    const res = await apiClient.post(Path.staff, data);
    console.log("RES: ", res);
    return res.data;
  } catch (error: any) {
    console.log(error);
    console.log("ERROR: ", error);
    // logger.error(error);
    throw error;
  }
};

// export const getAllStaffData = async () => {
//   try {
//     const res = await apiClient.get(Path.staff);
//     return res.data;
//   } catch (error: any) {
//     console.log("ERROR: ", error);
//     // logger.error(error);
//     throw error;
//   }
// };

export const getAllStaffData = async ({ page = 1, limit = 8 }) => {
  console.log("PAGE: ", page);
  console.log("LIMIT: ", limit);
  const quary = `?page=${page?.page}&limit=${limit}`;
  console.log("Quary: ", quary);
  try {
    const res = await apiClient.get(`${Path.staff}${quary}`);
    return res.data;
  } catch (error: any) {
    console.log("ERROR: ", error);
    throw error;
  }
};

export const getStaffById = async (id: string) => {
  try {
    const res = await apiClient.get(Path.staff + `/${id}`);
    return res.data;
  } catch (error: any) {
    console.log("ERROR: ", error);
    // logger.error(error);
    throw error;
  }
};

export const updateStffData = async (
  id: string,
  serviceData: IServiceProps
) => {
  try {
    console.log("ID------------------: ", id);
    const res = await apiClient.put(`${Path.staff}/${id}`, serviceData);
    return res.data;
  } catch (error: any) {
    console.log("ERROR: ", error);
    // logger.error(error);
    throw error;
  }
};

export const deleteStffData = async (id: string) => {
  try {
    console.log("ID------------------: ", id);
    const res = await apiClient.delete(Path.staff + `/${id}`);
    return res.data;
  } catch (error: any) {
    console.log("ERROR: ", error);
    // logger.error(error);
    throw error;
  }
};
