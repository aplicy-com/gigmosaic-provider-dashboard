import { useMutation } from "@tanstack/react-query";
import { sumbitServiceData } from "../../api/service/apiService";

// SERVICE
export const useSumbitServiceMutation = () => {
  //   const { showToast } = useToast();
  return useMutation({
    mutationFn: sumbitServiceData,
    onSuccess: () => {
      console.log("Service submitted successfully!", "success");
      //   showToast('Service submitted successfully!', 'success');
    },
    onError: (error: any) => {
      //   logger.error('Failed to submit service data:', error);
      console.error("Failed to submit service data:", error);

      const errorMessage =
        error?.response?.data?.errors[0]?.msg ||
        "An error occurred while submitting service data.";

      //   showToast(errorMessage, 'error');
      console.log("useSumbitServiceMutation :", errorMessage);
    },
  });
};
