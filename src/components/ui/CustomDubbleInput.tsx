import { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { RiDeleteBin4Line } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";

interface FAQ {
  question: string;
  answer: string;
}

interface SingleMultipleInputProps {
  onChangeValue: (faq: FAQ[]) => void;
  value?: FAQ[];
  isUpdate?: boolean;
}

const CustomDoubleInput = ({
  onChangeValue,
  value,
  isUpdate = false,
}: SingleMultipleInputProps) => {
  const [fields, setFields] = useState<FAQ[]>([{ question: "", answer: "" }]);
  // console.log("FAQ--------------FAQ: ", value);

  useEffect(() => {
    onChangeValue(fields);
    if (!isUpdate) return;
    if (value) {
      setFields(value);
    }
  }, [value]);
  // console.log("FAQ00--------------FAQ00: ", fields);
  const handleAddField = () => {
    setFields([...fields, { question: "", answer: "" }]);
  };

  const handleRemoveField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleValueChange = (
    index: number,
    fieldKey: "question" | "answer",
    newValue: string
  ) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, [fieldKey]: newValue } : field
      )
    );
  };

  useEffect(() => {
    const filteredFields = fields.filter(
      (field) => field.question.trim() !== "" || field.answer.trim() !== ""
    );
    onChangeValue(filteredFields);
  }, [fields, onChangeValue]);

  return (
    <>
      {fields.map((field, index) => (
        <div
          key={index}
          className="flex gap-5 flex-inline justify-center items-center"
        >
          <CustomInput
            label="Question"
            type="text"
            placeholder="Enter your question"
            value={field.question}
            onValueChange={(newValue) =>
              handleValueChange(index, "question", newValue)
            }
          />

          <CustomInput
            label="Answer"
            type="text"
            placeholder="Enter your answer"
            value={field.answer}
            onValueChange={(newValue) =>
              handleValueChange(index, "answer", newValue)
            }
          />

          {fields.length > 1 && (
            <div className="mt-6 cursor-pointer">
              <CustomButton
                isIconOnly={true}
                variant="light"
                onPress={() => handleRemoveField(index)}
              >
                <RiDeleteBin4Line size={20} className="text-red-400" />
              </CustomButton>
            </div>
          )}
        </div>
      ))}

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

export default CustomDoubleInput;
