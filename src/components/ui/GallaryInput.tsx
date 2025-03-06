// import { useState, useEffect } from "react";
// import CustomInput from "./CustomInput";
// import { BsLink45Deg } from "react-icons/bs";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { IoMdClose } from "react-icons/io";

// interface GallaryInputProps {
//   onChangeValue: (value: { images: File[]; videoLink: string }) => void;
//   value: string[];
//   link: string;
// }

// const GallaryInput = ({ onChangeValue, value, link }: GallaryInputProps) => {
//   const [images, setImages] = useState<File[]>([]);
//   const [videoLink, setVideoLink] = useState<string>("");

//   useEffect(() => {
//     // setImages(value);
//     console.log("videoLink: ", link);
//     setVideoLink(link);
//   }, [value, link]);

//   console.log("IMAGES: ", images);
//   console.log("VIDEO LINK: ", videoLink);

//   useEffect(() => {
//     onChangeValue({ images, videoLink });
//   }, [images, videoLink, onChangeValue]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;

//     const selectedFiles = Array.from(e.target.files);

//     if (images.length + selectedFiles.length > 5) {
//       console.log("You can only upload up to 5 images.");
//       return;
//     }

//     const validFiles = selectedFiles.filter((file) =>
//       ["image/jpeg", "image/png"].includes(file.type)
//     );

//     if (validFiles.length !== selectedFiles.length) {
//       console.log("Only JPEG and PNG formats are supported.");
//     }

//     setImages((prevImages) => [...prevImages, ...validFiles]);
//   };

//   const deleteImage = (index: number) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   return (
//     <>
//       {/* Image Upload Section */}
//       <div className="flex flex-initial gap-5 relative">
//         {images.map((file, index) => (
//           <div
//             className="rounded-lg bg-gray-200 flex justify-center items-center cursor-pointer aspect-square max-w-[120px] max-h-[120px] relative"
//             key={index}
//           >
//             <img
//               src={URL.createObjectURL(file)}
//               alt="Preview"
//               className="rounded-lg object-contain aspect-square max-w-[120px] max-h-[120px] relative"
//             />

//             <span
//               onClick={() => deleteImage(index)}
//               className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center cursor-pointer"
//             >
//               <IoMdClose />
//             </span>
//           </div>
//         ))}

//         {/* Upload Button */}
//         {images.length < 5 && (
//           <label
//             htmlFor="file-input"
//             className="flex flex-col justify-center items-center hover:bg-gray-200 bg-gray-100 min-w-[120px] min-h-[120px] rounded-lg cursor-pointer border border-dashed border-gray-400"
//           >
//             <IoCloudUploadOutline size={24} />
//             <input
//               type="file"
//               accept="image/jpeg, image/png"
//               multiple
//               onChange={handleFileChange}
//               className="hidden"
//               id="file-input"
//             />
//             <small className="text-xs mt-2">JPEG, PNG</small>
//           </label>
//         )}
//       </div>

//       {/* Video Link Input */}
//       <CustomInput
//         size="md"
//         label="Video Link"
//         type="url"
//         placeholder="https://www.example.com"
//         defaultValue={videoLink}
//         startContent={<BsLink45Deg />}
//         onValueChange={(value) => setVideoLink(value)}
//       />
//     </>
//   );
// };

// export default GallaryInput;

// import { useState, useEffect } from "react";
// import CustomInput from "./CustomInput";
// import { BsLink45Deg } from "react-icons/bs";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import { IoMdClose } from "react-icons/io";

// interface GallaryInputProps {
//   onChangeValue: (value: { images: File[]; videoLink: string }) => void;
//   value: string[];
//   link: string;
// }

// const GallaryInput = ({ onChangeValue, value, link }: GallaryInputProps) => {
//   const [images, setImages] = useState<File[]>([]);
//   const [videoLink, setVideoLink] = useState<string>(link);
//   console.log("Link---000", link);
//   useEffect(() => {
//     setVideoLink(link);
//     // setDisplayVideoLink(link);
//     onChangeValue({ images, videoLink });
//   }, [images, videoLink]);

//   console.log("Image---000", images);
//   console.log("Video Link---000", videoLink);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     const selectedFiles = Array.from(e.target.files);

//     if (images.length + selectedFiles.length > 5) {
//       console.log("You can only upload up to 5 images.");
//       return;
//     }

//     const validFiles = selectedFiles.filter((file) =>
//       ["image/jpeg", "image/png"].includes(file.type)
//     );

//     if (validFiles.length !== selectedFiles.length) {
//       console.log("Only JPEG and PNG formats are supported.");
//     }

//     setImages((prevImages) => [...prevImages, ...validFiles]);
//   };

//   const deleteImage = (index: number) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   return (
//     <>
//       {/* Image Upload Section */}
//       <div className="flex flex-initial gap-5 relative">
//         {images.map((file, index) => (
//           <div
//             className="rounded-lg bg-gray-200 flex justify-center items-center cursor-pointer aspect-square max-w-[120px] max-h-[120px] relative"
//             key={index}
//           >
//             <img
//               src={URL.createObjectURL(file)}
//               //  src={
//               //         field.images instanceof File
//               //           ? URL.createObjectURL(field.images)
//               //           : field.images
//               //       }
//               alt="Preview"
//               className="rounded-lg object-contain aspect-square max-w-[120px] max-h-[120px] relative"
//             />
//             <span
//               onClick={() => deleteImage(index)}
//               className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center cursor-pointer"
//             >
//               <IoMdClose />
//             </span>
//           </div>
//         ))}

//         {/* Upload Button */}
//         {images.length < 5 && (
//           <label
//             htmlFor="file-input"
//             className="flex flex-col justify-center items-center hover:bg-gray-200 bg-gray-100 min-w-[120px] min-h-[120px] rounded-lg cursor-pointer border border-dashed border-gray-400"
//           >
//             <IoCloudUploadOutline size={24} />
//             <input
//               type="file"
//               accept="image/jpeg, image/png"
//               multiple
//               onChange={handleFileChange}
//               className="hidden"
//               id="file-input"
//             />
//             <small className="text-xs mt-2">JPEG, PNG</small>
//           </label>
//         )}
//       </div>

//       {/* Video Link Input */}
//       <CustomInput
//         size="md"
//         label="Video Link"
//         type="url"
//         placeholder="https://www.example.com"
//         value={videoLink}
//         // defaultValue={displayVideoLink}
//         startContent={<BsLink45Deg />}
//         onValueChange={setVideoLink}
//       />
//     </>
//   );
// };

// export default GallaryInput;

import { useState, useEffect } from "react";
import CustomInput from "./CustomInput";
import { BsLink45Deg } from "react-icons/bs";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

interface GallaryInputProps {
  onChangeValue: (value: {
    images: (string | File)[];
    videoLink: string;
  }) => void;
  value?: string[];
  link?: string;
  error?: any;
}

const GallaryInput = ({
  onChangeValue,
  value,
  link,
  error,
}: GallaryInputProps) => {
  const [images, setImages] = useState<(string | File)[]>(value || []); // Include both URLs and Files
  const [videoLink, setVideoLink] = useState<string>(link || "");

  // Update state when backend data changes
  useEffect(() => {
    setImages(value || []);
    setVideoLink(link || "");
  }, [value, link]);

  // Trigger parent update when images/videoLink changes
  useEffect(() => {
    onChangeValue({ images, videoLink });
  }, [images, videoLink]);

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
  };

  const deleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <>
      {/* Image Upload Section */}
      <div className="flex flex-initial gap-5 relative">
        {images.map((item, index) => (
          <div
            className="rounded-lg bg-gray-200 flex justify-center items-center cursor-pointer aspect-square max-w-[120px] max-h-[120px] relative"
            key={index}
          >
            <img
              src={typeof item === "string" ? item : URL.createObjectURL(item)}
              alt="Preview"
              className="rounded-lg object-contain aspect-square max-w-[120px] max-h-[120px] relative"
            />
            <span
              onClick={() => deleteImage(index)}
              className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center cursor-pointer"
            >
              <IoMdClose />
            </span>
          </div>
        ))}

        {/* Upload Button */}
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
            <small className="text-xs mt-2">JPEG, PNG</small>
          </label>
        )}
      </div>

      {error?.images && (
        <small className="text-error -mt-5">{error?.images}</small>
      )}

      {/* Video Link Input */}
      <CustomInput
        size="md"
        label="Video Link"
        type="text"
        placeholder="https://www.example.com"
        value={videoLink}
        startContent={<BsLink45Deg />}
        onValueChange={setVideoLink}
      />
      {error?.videoLink && (
        <small className="text-error -mt-5">{error?.videoLink}</small>
      )}
    </>
  );
};

export default GallaryInput;
