import { Spinner } from "@heroui/react";

interface LoadingProps {
  label?: string;
  variant?: "default" | "simple" | "gradient" | "wave" | "spinner" | "dots";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
}

const Loading = ({
  label = "Loading...",
  variant = "default",
  color = "success",
  size = "md",
}: LoadingProps) => {
  return (
    <>
      {/* <div className="flex items-center justify-center w-full h-full"> */}
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-40">
        <Spinner
          classNames={{ label: " text-sm text-white" }}
          label={label}
          variant={variant}
          color={color}
          size={size}
        />
      </div>
    </>
  );
};

export default Loading;
