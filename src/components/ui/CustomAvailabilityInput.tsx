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
}

const CustomAvailabilityInput = ({ onChangeValue }: AvailabilityInputProps) => {
  const [allDay, setAllDay] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");
  const [fields, setFields] = useState<IAvailabilityField[]>([
    {
      id: Date.now(),
      day: null,
      from: null,
      to: null,
      slot: null,
    },
  ]);

  const handleAddField = () => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        day: null,
        from: null,
        to: null,
        slot: null,
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

  useEffect(() => {
    setFields([
      {
        id: Date.now(),
        day: "",
        from: null,
        to: null,
        slot: null,
      },
    ]);
  }, [allDay]);

  const formattedPayload = formatAvailabilityPayload(fields);

  useEffect(() => {
    if (!Array.isArray(formattedPayload) && "error" in formattedPayload) {
      setErrors(formattedPayload.error);
      onChangeValue([]);
    } else {
      setErrors("");
      onChangeValue(formattedPayload);
    }
  }, [fields]);

  return (
    <>
      <div>
        <CustomCheckbox
          label="All Day"
          isSelected={allDay}
          onValueChange={setAllDay}
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
                  onSelectionChange={(value) =>
                    handleUpdateField(field.id, { day: value as string })
                  }
                />
              </div>

              <div className="max-w-[125px]">
                <CustomTimeInput
                  label="From"
                  // isRequired
                  value={field.from}
                  onChange={(value) =>
                    handleUpdateField(field.id, {
                      from: value,
                      // Convert and store formatted time
                      fromFormatted: convertTimeToReadble(value),
                    })
                  }
                  startContent={<FaRegClock />}
                />
              </div>

              <div className="max-w-[125px]">
                <CustomTimeInput
                  label="To"
                  value={field.to}
                  onChange={(value) =>
                    handleUpdateField(field.id, {
                      to: value,
                      toFormatted: convertTimeToReadble(value),
                    })
                  }
                  startContent={<FaRegClock />}
                />
              </div>
              <div className="max-w-[125px]">
                <CustomNumberInput
                  label="Slot"
                  onValueChange={(value) =>
                    handleUpdateField(field.id, { slot: Number(value) })
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
                  onSelectionChange={(value) =>
                    handleUpdateField(field.id, { day: value as string })
                  }
                />
              </div>

              <div className="max-w-[125px]">
                <CustomTimeInput
                  label="From"
                  value={field.from}
                  onChange={(value) =>
                    handleUpdateField(field.id, {
                      from: value,
                      // Convert and store formatted time
                      fromFormatted: convertTimeToReadble(value),
                    })
                  }
                  startContent={<FaRegClock />}
                />
              </div>

              <div className="max-w-[125px]">
                <CustomTimeInput
                  label="To"
                  value={field.to}
                  onChange={(value) =>
                    handleUpdateField(field.id, {
                      to: value,
                      toFormatted: convertTimeToReadble(value),
                    })
                  }
                  startContent={<FaRegClock />}
                />
              </div>

              <div className="max-w-[125px]">
                <CustomNumberInput
                  label="Slot"
                  onValueChange={(value) =>
                    handleUpdateField(field.id, { slot: Number(value) })
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
