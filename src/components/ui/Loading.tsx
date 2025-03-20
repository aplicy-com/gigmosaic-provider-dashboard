import { Spinner } from "@heroui/react";

interface LoadingProps {
  label?: string;
}

const Loading = ({ label = "Loading..." }: LoadingProps) => {
  return (
    <>
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/30 backdrop-blur-sm z-40">
        <Spinner color="primary" label={label} size="md" />
      </div>
    </>
  );
};

export default Loading;
