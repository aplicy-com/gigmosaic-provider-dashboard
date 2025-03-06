import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

const AddStaff = () => {
  const rows = [
    {
      key: "1",
      name: "Tony Reichert",
      role: "CEO",
      status: "Active",
      status1: "Active",
      role2: "Active",
    },
    {
      key: "2",
      name: "Zoey Lang",
      role: "Technical Lead",
      status: "Paused",
      status1: "Active",
      role2: "Active",
    },
    {
      key: "3",
      name: "Jane Fisher",
      role: "Senior Developer",
      status: "Active",
      status1: "Active",
      role2: "Active",
    },
    {
      key: "4",
      name: "William Howard",
      role: "Community Manager",
      status: "Vacation",
      status1: "Active",
      role2: "Active",
    },
  ];

  const columns = [
    {
      key: "name",
      label: "NAME",
    },
    {
      key: "role",
      label: "ROLE",
    },
    {
      key: "status",
      label: "STATUS",
    },
    {
      key: "role2",
      label: "ROLE",
    },
    {
      key: "status1",
      label: "STATUS",
    },
  ];

  return (
    <>
      <div className="overflow-x-auto">
        <table className="hidden sm:table w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                MacBook Pro
              </td>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
            </tr>
          </tbody>
        </table>

        {/* Mobile View (Cards) */}
        <div className="sm:hidden space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-medium text-gray-900">MacBook Pro</p>
            <p className="text-gray-500">Color: Silver</p>
            <p className="text-gray-500">Category: Laptop</p>
            <p className="text-gray-500">Price: $2999</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddStaff;
