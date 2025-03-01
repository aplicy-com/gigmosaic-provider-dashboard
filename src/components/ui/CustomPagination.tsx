import { Pagination } from "@heroui/react";

interface PaginationProps {
  initialPage: number;
  total: number;
  size?: "sm" | "md" | "lg";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  variant?: "bordered" | "light" | "flat" | "faded";
  className?: string;
  showControls?: boolean;
  loop?: boolean;
  showShadow?: boolean;
}

const CustomPagination = ({
  size = "sm",
  color = "primary",
  variant = "bordered",
  showControls = true,
  loop = false,
  showShadow = false,
  className,
  ...props
}: PaginationProps) => {
  return (
    <>
      <Pagination
        size={size}
        loop={loop}
        color={color}
        showShadow={showShadow}
        variant={variant}
        showControls={showControls}
        className={className}
        siblings={2}
        {...props}
      ></Pagination>
    </>
  );
};

export default CustomPagination;
