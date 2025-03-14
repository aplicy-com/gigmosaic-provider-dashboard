import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useFetchStaff } from "../../hooks/queries/useFetchData";
import moment from "moment";
import CustomChip from "./CustomChip";
import EditStaffModal from "../../pages/staff/EditStaffModal";
import CustomButton from "./CustomButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteStaffMutation } from "../../hooks/mutations/useDeleteData";

const DataTable = () => {
  const { data } = useFetchStaff();
  const { mutate } = useDeleteStaffMutation();
  console.log("Staff Data: ", data);

  const columns = [
    {
      key: "id",
      label: "Staff ID",
    },
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "email",
      label: "email",
    },
    {
      key: "zipcode",
      label: "Zipcode",
    },
    {
      key: "city",
      label: "City",
    },
    {
      key: "state",
      label: "State",
    },
    {
      key: "country",
      label: "Country",
    },
    {
      key: "PhoneNo",
      label: "Phone No",
    },
    {
      key: "createAt",
      label: "Regi Date",
    },
    {
      key: "description",
      label: "Note",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "action",
      label: "Action",
    },
  ];

  const handleDelete = (id: string) => {
    console.log("IDD: ", id);
    if (!id) return;
    mutate(id);
  };

  return (
    <>
      <Table
        isStriped
        selectionMode="single"
        color="success"
        radius="none"
        removeWrapper
        aria-label="Example static collection table"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className="bg-gray-500 text-white font-bold uppercase"
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No data to display"}>
          {data?.staff?.map((item: any) => (
            <TableRow key={item?.staffId} className="cursor-pointer">
              <TableCell>{item?.staffId}</TableCell>
              <TableCell>{item?.fullName}</TableCell>
              <TableCell>{item?.email}</TableCell>
              <TableCell>{item?.zipCode}</TableCell>
              <TableCell>{item?.city}</TableCell>
              <TableCell>{item?.state}</TableCell>
              <TableCell>{item?.country}</TableCell>
              <TableCell>{item?.phoneNumber}</TableCell>
              <TableCell>
                {moment(item?.createAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell>View</TableCell>
              <TableCell>
                {item?.status === true ? (
                  <CustomChip label="Active" color="success" />
                ) : (
                  <CustomChip label="Inactive" color="danger" />
                )}
              </TableCell>
              <TableCell className="flex flex-initial">
                <EditStaffModal id={item.staffId} />
                <CustomButton
                  type="button"
                  isIconOnly
                  className="bg-transparent"
                  startContent={
                    <RiDeleteBin6Line
                      size={18}
                      className="text-red-500 hover:text-red-700"
                    />
                  }
                  onPress={() => handleDelete(item.staffId)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DataTable;
