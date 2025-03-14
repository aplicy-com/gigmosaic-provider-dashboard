import DataTable from "../../components/ui/DataTable";
import { IoSearchSharp } from "react-icons/io5";
import CustomInput from "../../components/ui/CustomInput";
import AddStaffModa from "./AddStaffModa";

const AllStaff = () => {
  return (
    <>
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
          <AddStaffModa />
        </div>
      </div>
      <DataTable />
    </>
  );
};

export default AllStaff;
