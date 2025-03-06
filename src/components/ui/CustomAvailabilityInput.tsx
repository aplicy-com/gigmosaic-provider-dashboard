// import { useEffect, useState } from "react";
// import CustomTimeInput from "./CustomTimeInput";
// import { convertTimeToReadble } from "../../utils/convertTime";
// import { FaRegClock } from "react-icons/fa";
// import { CiCalendar } from "react-icons/ci";
// import CustomNumberInput from "./CustomNumberInput";
// import CustomAutocomplete from "./CustomAutocomplete";
// import CustomCheckbox from "./CustomCheckbox";
// import { days } from "../../data/sampleData";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import CustomButton from "./CustomButton";
// import { IoTrashBin } from "react-icons/io5";
// import { IAvailabilityField } from "../../types";
// import { formatAvailabilityPayload } from "../../utils/serviceUtils";

// interface AvailabilityInputProps {
//   onChangeValue: (value: IAvailabilityField[]) => void;
//   value?: IAvailabilityField[];
// }

// const CustomAvailabilityInput = ({
//   value,
//   onChangeValue,
// }: AvailabilityInputProps) => {
//   const [allDay, setAllDay] = useState<boolean>(false);
//   const [errors, setErrors] = useState<string>("");
//   const [fields, setFields] = useState<IAvailabilityField[]>([
//     {
//       id: Date.now(),
//       day: null,
//       from: null,
//       to: null,
//       slot: null,
//     },
//   ]);

//   // useEffect(() => {
//   //   console.log("77777777777777777777777777777777");
//   //   if (!value) return;
//   //   if (value) {
//   //     console.log("111111111111111111111111111");
//   //     setFields(value);
//   //   } else {
//   //     setFields([
//   //       {
//   //         id: Date.now(),
//   //         day: "",
//   //         timeSlots: [],
//   //       },
//   //     ]);
//   //   }
//   // }, [value]);

//   // useEffect(() => {
//   //   console.log("77777777777777777777777777777777");

//   //   if (!value) return;

//   //   if (value && Array.isArray(value)) {
//   //     console.log("111111111111111111111111111");

//   //     // Format the value data into fields with time slots if available
//   //     const formattedFields = value.map((field) => ({
//   //       id: Date.now() + Math.random(),
//   //       day: field.day,
//   //       timeSlots:
//   //         field.timeSlots?.map((slot) => ({
//   //           from: slot.from,
//   //           to: slot.to,
//   //           maxBookings: slot.maxBookings,
//   //         })) || [],
//   //     }));

//   //     setFields(formattedFields);
//   //   } else {
//   //     setFields([
//   //       {
//   //         id: Date.now(),
//   //         day: "",
//   //         timeSlots: [],
//   //       },
//   //     ]);
//   //   }
//   // }, [value]);

// useEffect(() => {
//   console.log("77777777777777777777777777777777");

//   if (!value) return;

//   if (value && Array.isArray(value)) {
//     console.log("111111111111111111111111111");

//     // Format the value data into fields with flattened time slots
//     const formattedFields = value.flatMap(
//       (field) =>
//         field.timeSlots?.map((slot) => ({
//           id: Date.now() + Math.random(),
//           day: field.day,
//           available: field.available,
//           from: slot.from,
//           to: slot.to,
//           maxBookings: slot.maxBookings,
//         })) || []
//     );

//     setFields(formattedFields);
//   } else {
//     setFields([
//       {
//         id: Date.now(),
//         day: "",
//         from: null,
//         to: null,
//         maxBookings: null,
//       },
//     ]);
//   }
// }, [value]);

//   const handleAddField = () => {
//     setFields([
//       ...fields,
//       {
//         id: Date.now(),
//         day: null,
//         from: null,
//         to: null,
//         slot: null,
//       },
//     ]);
//   };

//   console.log("AVILABILITY: ", value);

//   const handleRemoveField = (id: number) => {
//     if (fields.length > 1) {
//       setFields(fields.filter((field) => field.id !== id));
//     }
//   };

//   const handleUpdateField = (
//     id: number,
//     updatedField: Partial<IAvailabilityField>
//   ) => {
//     setFields((prevFields) =>
//       prevFields.map((field) =>
//         field.id === id ? { ...field, ...updatedField } : field
//       )
//     );
//   };

//   useEffect(() => {
//     setFields([
//       {
//         id: Date.now(),
//         day: "",
//         from: null,
//         to: null,
//         slot: null,
//       },
//     ]);
//   }, [allDay]);

//   const formattedPayload = formatAvailabilityPayload(fields);

//   useEffect(() => {
//     if (!Array.isArray(formattedPayload) && "error" in formattedPayload) {
//       setErrors(formattedPayload.error);
//       onChangeValue([]);
//     } else {
//       setErrors("");
//       onChangeValue(formattedPayload);
//     }
//   }, [fields]);

//   console.log("FEILD: ", fields);

//   return (
//     <>
//       <div>
//         <CustomCheckbox
//           label="All Day"
//           isSelected={allDay}
//           onValueChange={setAllDay}
//         />
//       </div>

//       {fields.map((field) => (
//         <div key={field.id} className="flex flex-initial gap-6">
//           {allDay ? (
//             <>
//               <div className="max-w-sm">
//                 <CustomAutocomplete
//                   label="Day"
//                   placeholder="All Day"
//                   defaultItems={[{ label: "All Day", id: "all-date" }]}
//                   startContent={<CiCalendar size={20} />}
//                   // defaultSelectedKey={allDay ? "all-day" : field.day}
//                   defaultSelectedKey={field.day}
//                   onSelectionChange={(value) =>
//                     handleUpdateField(field.id, { day: value as string })
//                   }
//                 />
//                 <p>daya: {field?.day}</p>
//                 <p>Lakhdnand dduwudiwuhuhi</p>
//               </div>

//               {/* <p>{field?.day}</p> */}

//               <div className="max-w-[125px]">
//                 <CustomTimeInput
//                   label="From"
//                   // isRequired
//                   // value={field.from}
//                   onChange={(value) =>
//                     handleUpdateField(field.id, {
//                       from: value,
//                       // Convert and store formatted time
//                       fromFormatted: convertTimeToReadble(value),
//                     })
//                   }
//                   startContent={<FaRegClock />}
//                 />
//               </div>

//               <div className="max-w-[125px]">
//                 <CustomTimeInput
//                   label="To"
//                   // value={field.to}
//                   onChange={(value) =>
//                     handleUpdateField(field.id, {
//                       to: value,
//                       toFormatted: convertTimeToReadble(value),
//                     })
//                   }
//                   startContent={<FaRegClock />}
//                 />
//               </div>
//               <div className="max-w-[125px]">
//                 <CustomNumberInput
//                   label="Slot"
//                   onValueChange={(value) =>
//                     handleUpdateField(field.id, { slot: Number(value) })
//                   }
//                 />
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="max-w-sm">
//                 <CustomAutocomplete
//                   label="Day"
//                   placeholder="Select Days"
//                   defaultItems={days}
//                   startContent={<CiCalendar size={20} />}
//                   defaultSelectedKey={field.day}
//                   onSelectionChange={(value) =>
//                     handleUpdateField(field.id, { day: value as string })
//                   }
//                 />
//                 <p>Lakhdnand dduwudiwuhuhi {field?.slot}</p>
//                 <p>daya: {field?.day}</p>
//                 <p>from: {field?.from}</p>
//                 <p>to: {field?.to}</p>
//                 <p>to: {field?.maxBookings}</p>
//               </div>

//               <div className="max-w-[125px]">
//                 {/* <CustomTimeInput
//                   label="From"
//                   // value={field.from}
//                   onChange={(value) =>
//                     handleUpdateField(field.id, {
//                       from: value,
//                       // Convert and store formatted time
//                       fromFormatted: convertTimeToReadble(value),
//                     })
//                   }
//                   startContent={<FaRegClock />}
//                 /> */}
//                 <div className="max-w-[125px]">
//                   <label className="block text-sm font-medium">From</label>
//                   <input
//                     type="time"
//                     className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
//                     value={typeof field.from === "string" ? field.from : ""}
//                     onChange={(e) =>
//                       handleUpdateField(field.id, {
//                         from: e.target.value,
//                         fromFormatted: convertTimeToReadble(e.target.value),
//                       })
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="max-w-[125px]">
//                   <label className="block text-sm font-medium">to</label>
//                   <input
//                     type="time"
//                     className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
//                     value={typeof field.to === "string" ? field.from : ""}
//                     onChange={(e) =>
//                       handleUpdateField(field.id, {
//                         to: e.target.value,
//                         fromFormatted: convertTimeToReadble(e.target.value),
//                       })
//                     }
//                   />
//                 </div>
//               </div>

//               <div className="max-w-[125px]">
//                 <CustomNumberInput
//                   label="Slot"
//                   value={field?.maxBookings}
//                   onValueChange={(value) =>
//                     handleUpdateField(field.id, { slot: Number(value) })
//                   }
//                 />
//               </div>
//             </>
//           )}
//           {fields.length > 1 && (
//             <div className="mt-6 cursor-pointer">
//               <CustomButton
//                 isIconOnly
//                 variant="light"
//                 onPress={() => handleRemoveField(field.id)}
//               >
//                 <IoTrashBin size={20} className="text-red-400" />
//               </CustomButton>
//             </div>
//           )}
//         </div>
//       ))}

//       {errors && <small className="text-error -mt-4">{errors}</small>}

//       {!errors && (
//         <div className="-mt-3">
//           <CustomButton
//             label="Add New"
//             className="text-green-600"
//             startContent={
//               <IoIosAddCircleOutline
//                 size={20}
//                 className="text-green-600 cursor-pointer"
//               />
//             }
//             variant="light"
//             onPress={handleAddField}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default CustomAvailabilityInput;

// import { useEffect, useState } from "react";
// import CustomTimeInput from "./CustomTimeInput";
// import { convertTimeToReadble } from "../../utils/convertTime";
// import { FaRegClock } from "react-icons/fa";
// import { CiCalendar } from "react-icons/ci";
// import CustomNumberInput from "./CustomNumberInput";
// import CustomAutocomplete from "./CustomAutocomplete";
// import CustomCheckbox from "./CustomCheckbox";
// import { days } from "../../data/sampleData";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import CustomButton from "./CustomButton";
// import { IoTrashBin } from "react-icons/io5";
// import { IAvailabilityField } from "../../types";
// import { formatAvailabilityPayload } from "../../utils/serviceUtils";
// import { Time } from "@internationalized/date";

// interface AvailabilityInputProps {
//   onChangeValue: (value: IAvailabilityField[]) => void;
//   value?: IAvailabilityField[];
// }

// const CustomAvailabilityInput = ({
//   value,
//   onChangeValue,
// }: AvailabilityInputProps) => {
//   const [allDay, setAllDay] = useState<boolean>(false);
//   const [errors, setErrors] = useState<string>("");
//   const [fields, setFields] = useState<IAvailabilityField[]>([]);

//   useEffect(() => {
//     if (!value) return;
//     if (value.length > 0) {
//       setFields(
//         value.map((item) => ({ ...item, id: Date.now() + Math.random() }))
//       );
//     } else {
//       setFields([
//         {
//           id: Date.now(),
//           day: "",
//           timeSlots: [],
//         },
//       ]);
//     }
//   }, [value]);

//   const handleAddField = () => {
//     setFields([...fields, { id: Date.now(), day: "", timeSlots: [] }]);
//   };

//   const handleRemoveField = (id: number) => {
//     if (fields.length > 1) {
//       setFields(fields.filter((field) => field.id !== id));
//     }
//   };

//   const handleUpdateField = (
//     id: number,
//     updatedField: Partial<IAvailabilityField>
//   ) => {
//     setFields((prevFields) =>
//       prevFields.map((field) =>
//         field.id === id ? { ...field, ...updatedField } : field
//       )
//     );
//   };

//   const handleUpdateTimeSlot = (
//     fieldId: number,
//     slotIndex: number,
//     updatedSlot: Partial<IAvailabilityField["timeSlots"][number]>
//   ) => {
//     setFields((prevFields) =>
//       prevFields.map((field) =>
//         field.id === fieldId
//           ? {
//               ...field,
//               timeSlots: field.timeSlots.map((slot, index) =>
//                 index === slotIndex ? { ...slot, ...updatedSlot } : slot
//               ),
//             }
//           : field
//       )
//     );
//   };

//   useEffect(() => {
//     if (allDay) {
//       setFields([
//         {
//           id: Date.now(),
//           day: "All Day",
//           timeSlots: [],
//         },
//       ]);
//     }
//   }, [allDay]);

//   const formattedPayload = formatAvailabilityPayload(fields);

//   useEffect(() => {
//     if (!Array.isArray(formattedPayload) && "error" in formattedPayload) {
//       setErrors(formattedPayload.error);
//       onChangeValue([]);
//     } else {
//       setErrors("");
//       onChangeValue(formattedPayload);
//     }
//   }, [fields]);

//   return (
//     <>
//       <div>
//         <CustomCheckbox
//           label="All Day"
//           isSelected={allDay}
//           onValueChange={setAllDay}
//         />
//       </div>

// {fields.map((field) => (
//   <div key={field.id} className="flex flex-col gap-4">
//     <div className="max-w-sm">
//       <CustomAutocomplete
//         label="Day"
//         placeholder={allDay ? "All Day" : "Select Days"}
//         defaultItems={
//           allDay ? [{ label: "All Day", id: "all-day" }] : days
//         }
//         defaultSelectedKey={allDay ? "all-day" : field.day}
//         startContent={<CiCalendar size={20} />}
//         onSelectionChange={(value) =>
//           handleUpdateField(field.id, { day: value as string })
//         }
//       />
//     </div>

//     {field?.timeSlots?.map((slot, index) => (
//       <div key={index} className="flex flex-row gap-4">
//         <div className="max-w-[125px]">
//           <label className="block text-sm font-medium">From</label>
//           <input
//             type="time"
//             className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
//             value={slot?.from || ""}
//             onChange={(e) =>
//               handleUpdateTimeSlot(field.id, index, {
//                 from: e.target.value,
//                 fromFormatted: convertTimeToReadble(e.target.value),
//               })
//             }
//           />
//         </div>

//         <div className="max-w-[125px]">
//           <label className="block text-sm font-medium">To</label>
//           <input
//             type="time"
//             className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
//             value={slot?.to || ""}
//             onChange={(e) =>
//               handleUpdateTimeSlot(field.id, index, {
//                 to: e.target.value,
//                 toFormatted: convertTimeToReadble(e.target.value),
//               })
//             }
//           />
//         </div>

//         <div className="max-w-[125px]">
//           <label className="block text-sm font-medium">Slot</label>
//           <input
//             type="number"
//             className="w-full px-3 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-200"
//             value={slot?.maxBookings || ""}
//             onChange={(e) =>
//               handleUpdateTimeSlot(field.id, index, {
//                 maxBookings: Number(e.target.value),
//               })
//             }
//           />
//         </div>
//       </div>
//     ))}

//     <CustomButton
//       label="Add Time Slot"
//       className="text-blue-600"
//       startContent={
//         <IoIosAddCircleOutline
//           size={20}
//           className="text-blue-600 cursor-pointer"
//         />
//       }
//       variant="light"
//       onPress={() =>
//         handleUpdateField(field.id, {
//           timeSlots: [
//             ...(field.timeSlots || []),
//             { from: null, to: null, maxBookings: null },
//           ],
//         })
//       }
//     />

//     {fields.length > 1 && (
//       <div className="cursor-pointer">
//         <CustomButton
//           isIconOnly
//           variant="light"
//           onPress={() => handleRemoveField(field.id)}
//         >
//           <IoTrashBin size={20} className="text-red-400" />
//         </CustomButton>
//       </div>
//     )}
//   </div>
// ))}

//       {errors && <small className="text-error -mt-4">{errors}</small>}

//       {!errors && (
//         <div className="-mt-3">
//           <CustomButton
//             label="Add New"
//             className="text-green-600"
//             startContent={
//               <IoIosAddCircleOutline
//                 size={20}
//                 className="text-green-600 cursor-pointer"
//               />
//             }
//             variant="light"
//             onPress={handleAddField}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default CustomAvailabilityInput;

import { useEffect, useState } from "react";
import CustomTimeInput from "./CustomTimeInput";
import { convertTimeToReadble } from "../../utils/convertTime";
import { FaRegClock } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import CustomNumberInput from "./CustomNumberInput";
import CustomAutocomplete from "./CustomAutocomplete";
import CustomCheckbox from "./CustomCheckbox";
import { days } from "../../data/sampleData";
import { IoIosAddCircleOutline } from "react-icons/io";
import CustomButton from "./CustomButton";
import { IoTrashBin } from "react-icons/io5";
import { IAvailabilityField } from "../../types";
import { formatAvailabilityPayload } from "../../utils/serviceUtils";

interface AvailabilityInputProps {
  onChangeValue: (value: IAvailabilityField[]) => void;
  value?: IAvailabilityField[];
  isAllDay?: boolean;
}

const convertTo24HourFormat = (time: string): string => {
  // Check if time is already in correct format
  if (!time) return "";

  const [hour, minute] = time.split(":");
  const [minutePart, period] = minute.split(" ");

  let hours = parseInt(hour, 10);
  if (period?.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  } else if (period?.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutePart.padStart(2, "0")}`;
};

const CustomAvailabilityInput = ({
  isAllDay,
  value,
  onChangeValue,
}: AvailabilityInputProps) => {
  const [allDay, setAllDay] = useState<boolean>(false);
  const [ww, setww] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");
  const [fields, setFields] = useState<IAvailabilityField[]>([
    {
      id: Date.now(),
      day: "",
      from: null,
      to: null,
      maxBookings: null,
    },
  ]);

  useEffect(() => {
    if (!value) return;

    if (value && Array.isArray(value)) {
      const formattedFields = value.flatMap(
        (field) =>
          field.timeSlots?.map((slot) => ({
            id: Date.now() + Math.random(),
            day: field.day,
            available: field.available,
            from: slot.from,
            to: slot.to,
            maxBookings: slot.maxBookings,
          })) || []
      );
      setFields(formattedFields);
      setAllDay(isAllDay);
      setww(true);
    } else {
      setFields([
        {
          id: Date.now(),
          day: "",
          from: null,
          to: null,
          maxBookings: null,
        },
      ]);
    }
  }, [value, isAllDay]);
  // console.log("PRE FILL DATA00000000000-: ", fields);
  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        day: "",
        from: null,
        to: null,
        maxBookings: null,
      },
    ]);
  };

  const handleRemoveField = (id: number) => {
    if (fields.length > 1) {
      setFields(fields.filter((field) => field.id !== id));
    }
  };

  const handleUpdateField = (
    id: number,
    updatedField: Partial<IAvailabilityField>
  ) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, ...updatedField } : field
      )
    );
  };

  const chnageDatStatus = () => {
    setAllDay(!allDay);
    setFields([
      {
        id: Date.now(),
        day: "",
        from: null,
        to: null,
        maxBookings: null,
      },
    ]);
  };
  // useEffect(() => {
  // setFields([
  //   {
  //     id: Date.now(),
  //     day: "",
  //     from: null,
  //     to: null,
  //     maxBookings: null,
  //   },
  // ]);
  // }, [allDay]);

  const formattedPayload = formatAvailabilityPayload(fields);

  useEffect(() => {
    // if (!Array.isArray(formattedPayload) && "error" in formattedPayload) {
    if (formattedPayload.isValid === false) {
      setErrors(formattedPayload.errors);
      onChangeValue([]);
    } else {
      setErrors("");
      onChangeValue(fields);
    }
  }, [fields]);

  return (
    <>
      <div>
        <CustomCheckbox
          label="All Day"
          isSelected={allDay}
          onValueChange={chnageDatStatus}
        />
      </div>

      {fields.map((field) => (
        <div key={field.id} className="flex flex-initial gap-6">
          {allDay ? (
            <>
              <div className="max-w-sm">
                <CustomAutocomplete
                  label="Day"
                  placeholder="All Day"
                  defaultItems={[{ label: "All Day", id: "all-date" }]}
                  startContent={<CiCalendar size={20} />}
                  defaultSelectedKey={field.day}
                  onSelectionChange={(value) =>
                    handleUpdateField(field.id, { day: value as string })
                  }
                />
              </div>

              <div className="max-w-[125px]">
                <label className="block text-sm">From</label>
                <input
                  type="time"
                  className="w-full px-3 py-1 text-sm mt-1 border-2 rounded-lg focus:ring focus:ring-blue-200"
                  value={field.from ? convertTo24HourFormat(field.from) : ""}
                  onChange={(e) =>
                    handleUpdateField(field.id, {
                      from: e.target.value,
                    })
                  }
                />
              </div>

              <div className="max-w-[125px]">
                <label className="block text-sm font-medium">To</label>
                <input
                  type="time"
                  className="w-full px-3 py-1 text-sm mt-1 border-2 rounded-lg focus:ring focus:ring-blue-200"
                  value={field.to ? convertTo24HourFormat(field.to) : ""}
                  onChange={(e) =>
                    handleUpdateField(field.id, {
                      to: e.target.value,
                    })
                  }
                />
              </div>

              <div className="max-w-[125px]">
                <CustomNumberInput
                  label="Slot"
                  value={field.maxBookings}
                  onValueChange={(value) =>
                    handleUpdateField(field.id, { maxBookings: Number(value) })
                  }
                />
              </div>
            </>
          ) : (
            <>
              <div className="max-w-sm">
                <CustomAutocomplete
                  label="Day"
                  placeholder="Select Days"
                  defaultItems={days}
                  startContent={<CiCalendar size={20} />}
                  defaultSelectedKey={field.day}
                  onSelectionChange={(value) =>
                    handleUpdateField(field.id, { day: value as string })
                  }
                />
              </div>

              <div className="max-w-[125px]">
                <label className="block text-sm font-medium">From</label>
                <input
                  type="time"
                  className="w-full px-3 py-1 text-sm mt-1 border-2 rounded-lg focus:ring focus:ring-blue-200"
                  value={field.from ? convertTo24HourFormat(field.from) : ""}
                  onChange={(e) =>
                    handleUpdateField(field.id, {
                      from: e.target.value,
                    })
                  }
                />
              </div>

              <div className="max-w-[125px]">
                <label className="block text-sm font-medium">To</label>
                <input
                  type="time"
                  className="w-full px-3 py-1 text-sm mt-1 border-2 rounded-lg focus:ring focus:ring-blue-200"
                  value={field.to ? convertTo24HourFormat(field.to) : ""}
                  onChange={(e) =>
                    handleUpdateField(field.id, {
                      to: e.target.value,
                    })
                  }
                />
              </div>

              <div className="max-w-[125px]">
                <CustomNumberInput
                  label="Slot"
                  value={field.maxBookings}
                  onValueChange={(value) =>
                    handleUpdateField(field.id, { maxBookings: Number(value) })
                  }
                />
              </div>
            </>
          )}
          {fields.length > 1 && (
            <div className="mt-6 cursor-pointer">
              <CustomButton
                isIconOnly
                variant="light"
                onPress={() => handleRemoveField(field.id)}
              >
                <IoTrashBin size={20} className="text-red-400" />
              </CustomButton>
            </div>
          )}
        </div>
      ))}

      {errors && <small className="text-error -mt-4">{errors}</small>}

      {!errors && (
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
      )}
    </>
  );
};

export default CustomAvailabilityInput;
