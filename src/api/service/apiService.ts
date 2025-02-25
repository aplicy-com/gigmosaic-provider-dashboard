import { apiClient } from "../axios/apiClient";
import { Path } from "../axios/endpoint";
import { IServiceProps } from "../../types";
// import logger from '../utils/logger';

export const sumbitServiceData = async (data: IServiceProps) => {
  console.log("Running......submit");
  try {
    const res = await apiClient.post(Path.service, data);
    console.log("RES: ", res);
    return res.data;
  } catch (error: any) {
    console.log(error);
    console.log("ERROR: ", error);
    // logger.error(error);
    throw error;
  }
};

export const getAllServiceData = async () => {
  try {
    const res = await apiClient.get(Path.service);
    return res.data;
  } catch (error: any) {
    console.log("ERROR: ", error);
    // logger.error(error);
    throw error;
  }
};

export const getServiceDataById = async (id: string) => {
  try {
    const res = await apiClient.get(Path.service + `/${id}`);
    return res.data;
  } catch (error: any) {
    console.log("ERROR: ", error);
    // logger.error(error);
    throw error;
  }
};

export const updateServiceData = async (
  id: string,
  serviceData: IServiceProps
) => {
  try {
    console.log("ID------------------: ", id);
    const res = await apiClient.put(`${Path.service}/${id}`, serviceData);
    return res.data;
  } catch (error: any) {
    console.log("ERROR: ", error);
    // logger.error(error);
    throw error;
  }
};
