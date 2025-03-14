import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sumbitServiceData } from "../../api/service/apiService";
import { submitOfferData } from "../../api/service/apiOffers";
import { addToast } from "@heroui/react";
import { QueryKey } from "../queryKey";

// SERVICE
export const useSumbitServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sumbitServiceData,
    onSuccess: () => {
      console.log("Service submitted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_ALL_SERVICE] });
    },
    onError: (error: Error & { response?: { data?: { errors?: Array<{ msg: string }> } } }) => {
      console.error("Failed to submit service data:", error);

      const errorMessage =
        error?.response?.data?.errors?.[0]?.msg ||
        "An error occurred while submitting service data.";

      addToast({
        title: "Validation Error",
        description: errorMessage,
        radius: "md",
        color: "danger",
      });
      console.log("useSumbitServiceMutation :", errorMessage);
    },
  });
};

// OFFER
export const useSubmitOfferMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitOfferData,
    onSuccess: () => {
      console.log("Offer submitted successfully!", "success");
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_ALL_OFFERS] });
    },
    onError: (error: Error & { response?: { data?: { message?: string } } }) => {
      console.error("Failed to submit offer data:", error);
      const errorMessage = error.response?.data?.message || 
        error.message || 
        "An error occurred while submitting offer data.";

      addToast({
        title: "Validation Error",
        description: errorMessage,
        radius: "md",
        color: "danger",
      });
      console.log("useSubmitOfferMutation:", errorMessage);
    },
  });
};
