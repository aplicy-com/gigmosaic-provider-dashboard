import moment from "moment";
import { TimeInputValue } from "@heroui/react";

export const convertTimeToReadble = (value: TimeInputValue | null) => {
  try {
    if (value) {
      const formattedTime = moment()
        .hour(value.hour)
        .minute(value.minute)
        .format("hh:mm A");

      return formattedTime;
    }
  } catch (error) {
    console.log(
      "Something went wrong while converting time to readable format: ",
      error
    );
  }
};
