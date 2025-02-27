import { Input } from "@heroui/react";
import { ReactNode } from "react";

interface CustomInputProps {
  label: string;
  type: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  variant?: "flat" | "bordered" | "underlined" | "faded";
  labelPlacement?: "inside" | "outside" | "outside-left";
  errorMessage?: string;
  description?: string;
  defaultValue?: string;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
  endContent?: ReactNode;
  startContent?: ReactNode;
  onValueChange?: (value: string) => void;
  value?: string;
}

const CustomInput = ({
  label = "Enter label",
  placeholder = "Enter placeholder",
  size = "md",
  radius = "md",
  type = "text",
  color = "default",
  variant = "flat",
  labelPlacement = "outside",
  description = "",
  errorMessage = "",
  isDisabled = false,
  isInvalid = false,
  defaultValue = "",
  startContent,
  endContent,
  onValueChange,
  value,
  ...props
}: CustomInputProps) => {
  return (
    <Input
      label={label}
      type={type}
      placeholder={placeholder}
      size={size}
      radius={radius}
      color={color}
      variant={variant}
      defaultValue={defaultValue}
      labelPlacement={labelPlacement}
      isDisabled={isDisabled}
      description={description}
      errorMessage={errorMessage}
      isInvalid={isInvalid}
      value={value}
      onValueChange={onValueChange}
      startContent={startContent}
      endContent={endContent}
      {...props}
    />
  );
};

export default CustomInput;
