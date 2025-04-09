import { useTranslation } from "react-i18next";
import CustomAutocomplete from "../components/ui/CustomAutocomplete";
import { useState } from "react";
import axios from "axios";
import { Button } from "@heroui/react";

const Dashboard = () => {
  const { t } = useTranslation();
  const [valuew, setValue] = useState("");
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const backendurl = import.meta.env.VITE_BACKEND_PORT;
  const [loading, setLoading] = useState(false);

  const options = [
    {
      label: "Cat",
      id: "1",
      description: "The second most popular pet in the world",
    },
    { label: "Dog", id: "2", description: "The most popular pet in the world" },
    { label: "Elephant", id: "3", description: "The largest land animal" },
    { label: "Lion", id: "4", description: "The king of the jungle" },
    { label: "Tiger", id: "5", description: "The largest cat species" },
    { label: "Giraffe", id: "6", description: "The tallest land animal" },
  ];

  const getUsers = async () => {
    setLoading(true);
    console.log("Running getUsers function...");
    try {
      const response = await axios.get(`${backendurl}/user/api/v1/user`);
      console.log("Response: ", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error creating user in backend:", error.response.data);
      } else {
        console.error(
          "Error creating user in backend:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomAutocomplete
        label={t("car") || "Car"}
        placeholder="Enter pet name"
        defaultItems={options}
        onSelectionChange={setSelectedKey}
        onInputChange={setValue}
      />

      <Button
        isLoading={loading}
        value="danger"
        onPress={getUsers}
        className="mt-10"
      >
        Get Users
      </Button>
    </>
  );
};

export default Dashboard;
