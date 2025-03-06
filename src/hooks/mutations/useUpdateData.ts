import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateServiceData } from "../../api/service/apiService";
import { addToast } from "@heroui/react";
import { QueryKey } from "../queryKey";

export const useUpdateServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, serviceData }: { id: string; serviceData: any }) =>
      updateServiceData(id, serviceData),
    onSuccess: () => {
      console.log("Service data updated successfully");
      addToast({
        title: "Update Success",
        description: "Service data updated successfully",
        radius: "md",
        color: "danger",
      });
      queryClient.invalidateQueries({ queryKey: QueryKey.GET_ALL_SERVICE });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.errors[0]?.msg ||
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
