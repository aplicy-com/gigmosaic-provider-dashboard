import { apiClient } from "../axios/apiClient";
import { Path } from "../axios/endpoint";
import { IOfferProps } from "../../types";

export const submitOfferData = async (data: IOfferProps) => {
  try {
    const res = await apiClient.post(Path.offer, data);
    return res.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Submit offer error:", (error as Error & { response?: { data: unknown } }).response?.data || error);
    }
    throw error;
  }
};


export const getAllOfferData = async (providerId: string) => {
  try {
    const res = await apiClient.get(`${Path.offer}/provider/${providerId}`);
    return res.data;
  } catch (error: unknown) {
    console.log("ERROR: ", error);
    throw error;
  }
};

export const getActiveOffersForService = async (serviceId: string) => {
  try {
    const res = await apiClient.get(`${Path.offer}/service/${serviceId}/active`);
    return res.data;
  } catch (error: unknown) {
    console.log("ERROR: ", error);
    throw error;
  }
};

export const getOfferDataById = async (id: string) => {
  try {
    const res = await apiClient.get(Path.offer + `/${id}`);
    return res.data;
  } catch (error: unknown) {
    console.log("ERROR: ", error);
    throw error;
  }
};

export const updateOfferData = async (
  id: string,
  offerData: IOfferProps
) => {
  try {
    const res = await apiClient.put(`${Path.offer}/${id}`, offerData);
    return res.data;
  } catch (error: unknown) {
    console.log("ERROR: ", error);
    throw error;
  }
};

export const deleteOfferData = async (id: string) => {
  try {
    const res = await apiClient.delete(`${Path.offer}/${id}`);
    return res.data;
  } catch (error: unknown) {
    console.error("Delete offer error:", error);
    throw error;
  }
};
