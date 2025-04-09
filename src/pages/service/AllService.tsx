import CustomButton from "../../components/ui/CustomButton";
import ServiceCard from "../../components/ui/ServiceCard";
import { MdAddCircleOutline } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { IoGridOutline } from "react-icons/io5";
import CustomInput from "../../components/ui/CustomInput";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/ui/CustomPagination";
import { useEffect, useMemo, useState } from "react";
import ServiceCardList from "../../components/ui/ServiceCardList";
import { useFetchAllService } from "../../hooks/queries/useFetchData";
import Loading from "../../components/ui/Loading";

const AllService = () => {
  const navigate = useNavigate();
  const [isListView, setIsListView] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useFetchAllService({
    page: currentPage,
    limit: 8,
  });



  const apiData = useMemo(() => data?.services || [], [data]);
  const totalPage = useMemo(() => data?.pages || 1, [data]);

  return (
    <>
      {isLoading ? <Loading label="Loading..." /> : <></>}
      <div className="grid sm:grid-cols-2 gap-2 md:gap-5">
        <div className="flex justify-start items-center gap-2 md:gap-4 mb-8 ">
          <CustomInput
            placeholder="Search..."
            type="text"
            size="sm"
            endContent={<IoSearchSharp size={20} />}
            className="sm:max-w-[300px]"
          />
        </div>

        <div className="flex justify-end items-center gap-4 mb-8 ">
          <CustomButton
            isIconOnly={true}
            size="sm"
            startContent={<IoGridOutline size={18} />}
            onPress={() => setIsListView(false)}
            className="hidden sm:flex"
          />
          <CustomButton
            isIconOnly={true}
            size="sm"
            startContent={<FaList size={18} />}
            onPress={() => setIsListView(true)}
            className="hidden sm:flex"
          />
          <CustomButton
            label="Add Service"
            type="button"
            size="sm"
            color="primary"
            startContent={<MdAddCircleOutline size={20} />}
            onPress={() => navigate("/service/add-service")}
            className="-mt-6 sm:mt-0"
          />
        </div>
      </div>

      {/* Content */}
      {isListView ? (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            <ServiceCardList data={apiData} />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          <ServiceCard data={apiData} />
        </div>
      )}

      <div className="flex justify-end items-end py-5 mt-7">
        <CustomPagination
          page={currentPage}
          initialPage={1}
          total={totalPage}
          size="md"
          onChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default AllService;
