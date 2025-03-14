import { Chip } from "@heroui/react";

interface IChipProps {
  label: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning";
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "dot";
  size?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg" | "full";
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const CustomChip = ({
  label = "lable",
  radius = "full",
  color = "primary",
  variant = "flat",
  size = "sm",
  startContent,
  endContent,
}: IChipProps) => {
  return (
    <>
      <Chip
        size={size}
        color={color}
        variant={variant}
        radius={radius}
        startContent={startContent}
        endContent={endContent}
      >
        {label}
      </Chip>
    </>
  );
};

export default CustomChip;
