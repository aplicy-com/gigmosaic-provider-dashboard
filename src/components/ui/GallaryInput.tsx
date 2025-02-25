import { useState } from "react";
import CustomInput from "./CustomInput";
import { BsLink45Deg } from "react-icons/bs";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

interface GallaryInputProps {
  onChangeValue: (value: File[]) => void;
}

const GallaryInput = ({ onChangeValue }: GallaryInputProps) => {
  const [images, setImages] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > 5) {
      console.log("You can only upload up to 5 images.");
      return;
    }

    const validFiles = selectedFiles.filter((file) =>
      ["image/jpeg", "image/png"].includes(file.type)
    );

    if (validFiles.length !== selectedFiles.length) {
      console.log("Only JPEG and PNG formats are supported.");
    }

    setImages((prevImages) => [...prevImages, ...validFiles]);
    onChangeValue([...images, ...validFiles]);
  };

  const deleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    onChangeValue(images.filter((_, i) => i !== index));
  };
  return (
    <>
      <div className="flex flex-initial gap-5 relative">
        {images.map((file, index) => (
          <div
            className="rounded-lg bg-gray-200 flex justify-center items-center cursor-pointer aspect-square max-w-[120px]  max-h-[120px] relative "
            key={index}
          >
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="rounded-lg object-contain aspect-square max-w-[120px] max-h-[120px] relative "
            />

            <span
              onClick={() => deleteImage(index)}
              className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center cursor-pointer"
            >
              <IoMdClose />
            </span>
          </div>
        ))}
        {images.length < 5 && (
          <label
            htmlFor="file-input"
            className="flex flex-col justify-center items-center hover:bg-gray-200 bg-gray-100 min-w-[120px] min-h-[120px] rounded-lg cursor-pointer border border-dashed border-gray-400"
          >
            <IoCloudUploadOutline size={24} />
            <input
              type="file"
              accept="image/jpeg, image/png"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
            />
            <small className="text-xs mt-2">SVG, PNG, JPG</small>
          </label>
        )}
      </div>
      {/* </div> */}
      <CustomInput
        size="md"
        label="Video Link"
        type="url"
        placeholder="https://www.example.com"
        startContent={<BsLink45Deg />}
      />
    </>
  );
};

export default GallaryInput;
