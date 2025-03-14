import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOfferData } from "../../api/service/apiOffers";
import { addToast } from "@heroui/react";
import { QueryKey } from "../queryKey";

export const useDeleteOfferMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOfferData,
    onSuccess: () => {
      addToast({
        title: "Delete Success",
        description: "Offer deleted successfully",
        radius: "md",
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_ALL_OFFERS] });
    },
    onError: (error: Error | { response?: { data?: { errors?: Array<{ msg: string }> } } }) => {
      const errorMessage =
        ('response' in error && error.response?.data?.errors?.[0]?.msg) ||
        (error instanceof Error ? error.message : "An error occurred while deleting the offer.");

      addToast({
        title: "Delete Error",
        description: errorMessage,
        radius: "md",
        color: "danger",
      });
      console.error("Delete offer error:", errorMessage);
    },
  });
};

