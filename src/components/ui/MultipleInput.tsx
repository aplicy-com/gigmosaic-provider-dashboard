// import { useEffect, useState } from "react";
// import CustomInput from "./CustomInput";
// import CustomButton from "./CustomButton";
// import { IoTrashBin } from "react-icons/io5";
// import { IoMdClose } from "react-icons/io";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import CustomNumberInput from "./CustomNumberInput";

// interface MultipleInputProps {
//   onChangeValude: (
//     values: { serviceItem: string; price: number; images: File | null }[]
//   ) => void;
//   value: { serviceItem: string; price: number; images: string }[];
// }

// const MultipleInput = ({ onChangeValude, value }: MultipleInputProps) => {
//   const [fields, setFields] = useState<
//     { id: number; serviceItem: string; price: number; images: File | null }[]
//   >([{ id: Date.now(), serviceItem: "", price: 0, images: null }]);

//   console.log("Info add00000: ", value);

//   useEffect(() => {
//     if (value?.length === 0) {
//       console.log("Data no 1");
//       return;
//     }
//     if (value?.length && fields.length && fields[0].serviceItem === "") {
//       console.log("Data no 2");
//       return;
//     }
//     setFields(value.map((item) => ({ ...item, id: Date.now() })));
//   }, [value]);

//   console.log("SET INFOR: ", fields);

//   const handleAddField = () => {
//     setFields([...fields, { id: Date.now(), serviceItem: "", price: 0, images: null }]);
//   };

//   const handleRemoveField = (id: number) => {
//     setFields(fields.filter((field) => field.id !== id));
//   };

//   const handleValueChange = (
//     id: number,
//     key: "serviceItem" | "price",
//     newValue: string
//   ) => {
//     setFields((prevFields) =>
//       prevFields.map((field) =>
//         field.id === id
//           ? {
//               ...field,
//               [key]: key === "price" ? Number(newValue) || 0 : newValue,
//             }
//           : field
//       )
//     );
//   };

//   const handleImageChange = (id: number, file: File | null) => {
//     setFields((prevFields) =>
//       prevFields.map((field) =>
//         field.id === id ? { ...field, images: file } : field
//       )
//     );
//   };

//   const handleRemoveImage = (id: number) => {
//     setFields((prevFields) =>
//       prevFields.map((field) =>
//         field.id === id ? { ...field, images: null } : field
//       )
//     );
//   };

//   useEffect(() => {
//     const filteredFields = fields.filter(
//       (field) =>
//         field?.serviceItem?.trim() !== "" ||
//         (field?.price !== null && field?.price !== 0) ||
//         field?.images !== null
//     );
//     onChangeValude(filteredFields?.length > 0 ? filteredFields : []);
//   }, [fields, onChangeValude]);

//   return (
//     <>
//       {fields.map((field) => (
//         <div
//           key={field.id}
//           className="flex gap-5 flex-inline justify-center items-center"
//         >
//           <div className="relative">
//             <label
//               className="rounded-lg bg-gray-200 flex justify-center items-center cursor-pointer aspect-square w-[60px] h-[60px] "
//               htmlFor={`images-upload-${field.id}`}
//             >
// {field.images ? (
//   <>
//     <img
//       src={URL.createObjectURL(field.images)}
//       alt="Preview"
//       className="rounded-lg object-contain aspect-square w-full h-full relative"
//     />
//     <span
//       onClick={() => handleRemoveImage(field.id)}
//       className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center cursor-pointer"
//     >
//       <IoMdClose />
//     </span>
//   </>
// ) : (
//   <span className="text-gray-500">+</span>
// )}
//             </label>
//           </div>

//           {/* Hidden File Input */}
// <input
//   id={`images-upload-${field.id}`}
//   type="file"
//   accept="images/*"
//   className="hidden "
//   onChange={(e) => {
//     if (e.target.files && e.target.files[0]) {
//       handleImageChange(field.id, e.target.files[0]);
//     }
//   }}
// />

//           {/* Name Input */}
//           <CustomInput
//             label="Name"
//             type="text"
//             placeholder="Enter title"
//             value={field.serviceItem}
//             onValueChange={(newValue) =>
//               handleValueChange(field.id, "serviceItem", newValue as string)
//             }
//           />

//           {/* Price Input */}
//           <CustomNumberInput
//             label="Price"
//             placeholder="Enter Price"
//             value={field.price}
//             onValueChange={(newValue) =>
//               handleValueChange(field.id, "price", newValue.toString())
//             }
//           />

//           {/* Remove Button */}
//           {fields.length > 1 && (
//             <div className="mt-6 cursor-pointer">
//               <CustomButton
//                 isIconOnly={true}
//                 variant="light"
//                 onPress={() => handleRemoveField(field.id)}
//               >
//                 <IoTrashBin size={20} className="text-red-400" />
//               </CustomButton>
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Add New Button */}
//       <div className="-mt-3">
//         <CustomButton
//           label="Add New"
//           className="text-green-600"
//           startContent={
//             <IoIosAddCircleOutline
//               size={20}
//               className="text-green-600 cursor-pointer"
//             />
//           }
//           variant="light"
//           onPress={handleAddField}
//         />
//       </div>
//     </>
//   );
// };

// export default MultipleInput;

import { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomNumberInput from "./CustomNumberInput";
import { RiDeleteBin4Line } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

interface ItemField {
  id: number;
  serviceItem: string;
  price: number;
  images: string | File | null;
}

// interface MultipleInputProps {
//   onChangeValude: (values: ItemField[] ) => void;
//   value?: ItemField[];
//   isUpdate?: boolean;
// }

// interface MultipleInputProps {
//   onChangeValude: (values: ItemField[]) => void;
//   value?: ItemField[];
//   isUpdate?: boolean;
// }
interface MultipleInputProps {
  onChangeValude: (
    values: { serviceItem: string; price: number; images: File | null }[]
  ) => void;
  value?: { serviceItem: string; price: number; images: File | null }[];
  isUpdate?: boolean;
}

const MultipleInput = ({
  onChangeValude,
  value,
  isUpdate = true,
}: MultipleInputProps) => {
  const [fields, setFields] = useState<ItemField[]>([
    { id: Date.now(), serviceItem: "", price: 0, images: null },
  ]);

  // console.log("Fields State: ", fields);
  // console.log("Received Value: ", value);

  useEffect(() => {
    setvalueToField();
  }, [value]);

  const setvalueToField = async () => {
    if (!isUpdate) return;
    if (!value) return;
    if (value?.length > 0) {
      setFields(value);
    }
  };

  useEffect(() => {
    const filteredFields = fields.filter(
      (field) =>
        field.serviceItem !== "" || field.price !== 0 || field.images !== null
    );
    console.log("Lakshan00000: ", filteredFields);
    onChangeValude(filteredFields.length > 0 ? filteredFields : []);
  }, [fields]);

  const handleAddField = () => {
    setFields([
      ...fields,
      { id: Date.now(), serviceItem: "", price: 0, images: null },
    ]);
  };

  const handleRemoveField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleValueChange = (
    id: number,
    key: "serviceItem" | "price",
    newValue: string | number
  ) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, [key]: newValue } : field
      )
    );
  };

  // const handleImageChange = (id: number, file: File | null) => {
  //   setFields(
  //     fields.map((field) =>
  //       field.id === id ? { ...field, images: file } : field
  //     )
  //   );
  // };
  const handleImageChange = (id: number, file: File | null) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, images: file } : field
      )
    );
  };

  const handleRemoveImage = (id: number) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, images: null } : field
      )
    );
  };

  // console.log("Images: ", fields[0].images);
  console.log("VALUE001: ", value);
  console.log("Fields State: ", fields);

  return (
    <>
      {fields.map((field) => (
        <div
          key={field.id}
          className="flex gap-5 flex-inline justify-center items-center"
        >
          <div className="relative">
            <label
              className="rounded-lg bg-gray-200 flex justify-center items-center cursor-pointer aspect-square w-[60px] h-[60px] "
              htmlFor={`images-upload-${field.id}`}
            >
              {field.images ? (
                <>
                  <img
                    src={
                      field.images instanceof File
                        ? URL.createObjectURL(field.images)
                        : field.images
                    }
                    alt="Preview"
                    className="rounded-lg object-contain aspect-square w-full h-full relative"
                  />
                  <span
                    onClick={() => handleRemoveImage(field.id)}
                    className="absolute -top-2 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center cursor-pointer"
                  >
                    <IoMdClose />
                  </span>
                </>
              ) : (
                <span className="text-gray-500">+</span>
              )}
            </label>
          </div>

          {/* Hidden File Input */}
          <input
            id={`images-upload-${field.id}`}
            type="file"
            accept="images/*"
            className="hidden "
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleImageChange(field.id, e.target.files[0]);
              }
            }}
          />

          {/* Name Input */}
          <CustomInput
            label="Name"
            type="text"
            placeholder="Enter title"
            value={field.serviceItem}
            onValueChange={(newValue) =>
              handleValueChange(field.id, "serviceItem", newValue as string)
            }
          />

          {/* Price Input */}
          <CustomNumberInput
            label="Price"
            placeholder="Enter Price"
            value={field.price}
            onValueChange={(newValue) =>
              handleValueChange(field.id, "price", newValue.toString())
            }
          />

          {/* Remove Button */}
          {fields.length > 1 && (
            <div className="mt-6 cursor-pointer">
              <CustomButton
                isIconOnly={true}
                variant="light"
                onPress={() => handleRemoveField(field.id)}
              >
                <RiDeleteBin4Line size={20} className="text-red-400" />
              </CustomButton>
            </div>
          )}
        </div>
      ))}

      {/* Add New Button */}
      <div className="-mt-3">
        <CustomButton
          label="Add New"
          className="text-green-600"
          startContent={
            <IoIosAddCircleOutline
              size={20}
              className="text-green-600 cursor-pointer"
            />
          }
          variant="light"
          onPress={handleAddField}
        />
      </div>
    </>
  );
};

export default MultipleInput;
