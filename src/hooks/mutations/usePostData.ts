import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sumbitServiceData } from "../../api/service/apiService";
import { addToast } from "@heroui/react";
import { QueryKey } from "../queryKey";
import { sumbitStaffData } from "../../api/service/apiStaff";
import { useNavigate } from "react-router-dom";

// SERVICE
export const useSumbitServiceMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: sumbitServiceData,
    onSuccess: () => {
      addToast({
        title: "Service Added",
        description: "Service Added Successfully",
        radius: "md",
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_ALL_SERVICE] });
      navigate("/service/all-service");
    },
    onError: (error: any) => {
      console.error("Failed to submit service data:", error);

      const errorMessage =
        error?.response?.data?.errors[0]?.msg ||
        "An error occurred while submitting service data.";

      addToast({
        title: "Error",
        description: errorMessage,
        radius: "md",
        color: "danger",
      });
      console.error("useSumbitServiceMutation :", errorMessage);
    },
  });
};

// STAFF
export const useSumbitStaffMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sumbitStaffData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKey.GET_ALL_STAFF] });
    },
    onError: (error: any) => {
      console.error("Failed to submit staff data:", error);

      const errorMessage =
        error?.response?.data?.errors[0]?.msg ||
        "An error occurred while submitting staff data.";

      addToast({
        title: "Error",
        description: errorMessage,
        radius: "md",
        color: "danger",
      });
      console.error("useSumbitServiceMutation :", errorMessage);
    },
  });
};
