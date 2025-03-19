import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateServiceData } from "../../api/service/apiService";
import { addToast } from "@heroui/react";
import { QueryKey } from "../queryKey";
import { updateStffData } from "../../api/service/apiStaff";
import { useNavigate } from "react-router-dom";

export const useUpdateServiceMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
      navigate("/service/all-service");
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

export const useUpdateStaffMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, staffData }: { id: string; staffData: any }) =>
      updateStffData(id, staffData),
    onSuccess: () => {
      console.log("Service data updated successfully");
      addToast({
        title: "Update Success",
        description: "Staff data updated successfully",
        radius: "md",
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_ALL_STAFF] });
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
