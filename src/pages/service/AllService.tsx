import CustomButton from "../../components/ui/CustomButton";
import ServiceCard from "../../components/ui/ServiceCard";
import { MdAddCircleOutline } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";
import CustomInput from "../../components/ui/CustomInput";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/ui/CustomPagination";
import { useState } from "react";
import ServiceCardList from "../../components/ui/ServiceCardList";

const AllService = () => {
  const navigate = useNavigate();
  const [isListView, setIsListView] = useState<boolean>(true);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:gap-5">
        <div className="flex justify-start items-center gap-2 md:gap-4 mb-8 ">
          <CustomInput
            placeholder="Search..."
            type="text"
            size="sm"
            endContent={<IoSearchSharp size={20} />}
            className="max-w-[300px]"
          />
        </div>

        <div className="flex justify-end items-center gap-4 mb-8 ">
          <CustomButton
            isIconOnly={true}
            size="sm"
            startContent={<IoGridOutline size={18} />}
            onPress={() => setIsListView(false)}
          />
          <CustomButton
            isIconOnly={true}
            size="sm"
            startContent={<FaList size={18} />}
            onPress={() => setIsListView(true)}
          />
          <CustomButton
            label="Add Service"
            type="button"
            size="sm"
            color="primary"
            startContent={<MdAddCircleOutline size={20} />}
            onPress={() => navigate("/service/add")}
          />
        </div>
      </div>

      {/* Content */}
      {isListView ? (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            <ServiceCardList />
            <ServiceCardList />
            <ServiceCardList />
            <ServiceCardList />
            <ServiceCardList />
            <ServiceCardList />
            <ServiceCardList />
            <ServiceCardList />
            <ServiceCardList />
            <ServiceCardList />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1   lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />

          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </div>
      )}

      <div className="flex justify-end items-end py-5 mt-7">
        <CustomPagination initialPage={1} total={10} size="md" />
      </div>
    </>
  );
};

export default AllService;
