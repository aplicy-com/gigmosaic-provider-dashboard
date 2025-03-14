import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateServiceData } from "../../api/service/apiService";
import { updateOfferData } from "../../api/service/apiOffers";
import { addToast } from "@heroui/react";
import { QueryKey } from "../queryKey";
import { IOfferProps, IServiceProps } from "../../types";


export const useUpdateServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, serviceData }: { id: string; serviceData: IServiceProps }) =>
      updateServiceData(id, serviceData),
    onSuccess: () => {
      console.log("Service data updated successfully");
      addToast({
        title: "Update Success",
        description: "Service data updated successfully",
        radius: "md",
        color: "danger",
      });
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_ALL_SERVICE] });
    },
    onError: (error: Error | { response?: { data?: { errors?: Array<{ msg: string }> } } }) => {
      const errorMessage =
        (error as { response?: { data?: { errors?: Array<{ msg: string }> } } })?.response?.data?.errors?.[0]?.msg ||
        "An error occurred while updateting service data.";
      addToast({
        title: "Update Error",
        description: errorMessage,
        radius: "md",
        color: "danger",
      });
      console.log("useUpdateServiceMutation 001:", errorMessage);
    },
  });
};

export const useUpdateOfferMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, offerData }: { id: string; offerData: IOfferProps }) =>
      updateOfferData(id, offerData),
    onSuccess: () => {
      console.log("Offer data updated successfully");
      addToast({
        title: "Update Success",
        description: "Offer data updated successfully",
        radius: "md",
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_ALL_OFFERS] });
    },
    onError: (error: Error | { response?: { data?: { errors?: Array<{ msg: string }> } } }) => {
      const errorMessage =
        (error as { response?: { data?: { errors?: Array<{ msg: string }> } } })?.response?.data?.errors?.[0]?.msg ||
        "An error occurred while updating offer data.";
      addToast({
        title: "Update Error",
        description: errorMessage,
        radius: "md",
        color: "danger",
      });
      console.log("useUpdateOfferMutation:", errorMessage);
    },
  });
};
