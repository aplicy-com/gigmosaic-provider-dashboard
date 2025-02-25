import { Checkbox } from "@heroui/react";

interface CustomInputProps {
  label: string;
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  isDisabled?: boolean;
  onValueChange?: (value: boolean) => void;
  isSelected?: boolean;
}

const CustomCheckbox = ({
  label = "Enter label",
  size = "md",
  radius = "md",
  color = "primary",
  isDisabled = false,
  onValueChange,
  isSelected,
  ...props
}: CustomInputProps) => {
  return (
    <Checkbox
      size={size}
      radius={radius}
      color={color}
      isDisabled={isDisabled}
      isSelected={isSelected}
      onValueChange={onValueChange}
      {...props}
    >
      {label}
    </Checkbox>
  );
};

export default CustomCheckbox;
