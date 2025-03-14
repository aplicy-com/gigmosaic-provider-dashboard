import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  Input,
  Chip,
} from "@heroui/react";
import { useFetchAllOffers, useFetchProviderServices } from "../../hooks/queries/useFetchData";
import CustomButton from "../../components/ui/CustomButton";
import AddOffer from "./AddOffer";
import { IOfferProps } from "../../types";
import { FiEdit, FiFilePlus, FiSearch, FiTrash, FiCheck, FiX } from "react-icons/fi";
import { format } from "date-fns";
import { useDeleteOfferMutation } from "../../hooks/mutations/useDeleteData";

const AllOffers: React.FC = () => {
  const providerId = "PRV_002"; // This should match the providerId in AddOffer
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editOfferData, setEditOfferData] = useState<IOfferProps | undefined>(undefined);
  const { data: offersData, isLoading } = useFetchAllOffers(providerId);
  const { data: servicesData } = useFetchProviderServices(providerId);
  const services = servicesData?.data || [];
  console.log("Services Data: ", servicesData);
  
  console.log("Offers Data: ", offersData);
  
  
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "offerTitle",
    direction: "ascending" as "ascending" | "descending"
  });
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const rowsPerPageOptions = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "15", label: "15" },
    { value: "20", label: "20" },
  ];

  const handleEdit = (offer: IOfferProps) => {
    setEditOfferData(offer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditOfferData(undefined);
  };

  const deleteMutation = useDeleteOfferMutation();

  const handleDelete = async (offerId: string) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      try {
        await deleteMutation.mutateAsync(offerId);
      } catch (err) {
        console.error("Error deleting offer:", err);
      }
    }
  };

  const filteredItems = useMemo(() => {
    const items = offersData?.offers || [];
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    return items.filter((item: IOfferProps) =>
      item.offerTitle.toLowerCase().includes(query) ||
      item.offerId.toLowerCase().includes(query)
    );
  }, [offersData?.offers, searchQuery]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof IOfferProps];
      const second = b[sortDescriptor.column as keyof IOfferProps];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredItems, sortDescriptor]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedItems.slice(start, end);
  }, [sortedItems, page, rowsPerPage]);

  const pages = Math.ceil((sortedItems?.length || 0) / rowsPerPage);

  const columns = [
    // {
    //   name: "OFFER ID",
    //   uid: "offerId",
    //   sortable: true,
    // },
    {
      name: "OFFER",
      uid: "offerTitle",
      sortable: true,
    },
    {
      name: "SERVICE",
      uid: "serviceId",
      sortable: true,
    },
    {
      name: "TYPE",
      uid: "offerType",
      sortable: true,
    },
    {
      name: "ORIGINAL PRICE",
      uid: "originalPrice",
      sortable: true,
    },
    {
      name: "DISCOUNT",
      uid: "offerPrice",  
      sortable: true,
    },
    {
      name: "FINAL PRICE",
      uid: "priceAfterDiscount", 
      sortable: true,
    },
    {
      name: "VALIDITY",
      uid: "startDate",
      sortable: true,
    },
    {
      name: "STATUS",
      uid: "isActive",
      sortable: true,
    },
    {
      name: "ACTIONS",
      uid: "actions",
      sortable: false,
    },
  ];

  const renderCell = (offer: IOfferProps, columnKey: React.Key) => {
    switch (columnKey) {
      case "serviceId": {
        const service = services.find((s: { serviceId: string; serviceTitle: string }) => s.serviceId === offer.serviceId);
        return service?.serviceTitle || offer.serviceId;
      }
      case "originalPrice": {
        const servicePrice = services.find((s: { serviceId: string; price: number }) => s.serviceId === offer.serviceId)?.price;
        return servicePrice ? `$${servicePrice}` : '-';
      }
      case "offerId":
        return offer.offerId;
      case "offerTitle":
        return offer.offerTitle;
      case "offerType":
        return (
          <Chip
            color={offer.offerType === 'FIXED' ? 'primary' : 'secondary'}
            variant="flat"
            size="sm"
          >
            {offer.offerType==='FIXED' ? '$' : '%'}
          </Chip>
        );
      case "offerPrice":
        return (
          <span>
            {offer.offerType === 'FIXED' ? '$' : ''}{offer.offerPrice}{offer.offerType === 'PERCENTAGE' ? '%' : ''}
          </span>
        );
      case "discountValue":
        return (
          <span>
            {offer.offerType === 'FIXED' ? '$' : ''}{offer.offerPrice}{offer.offerType === 'PERCENTAGE' ? '%' : ''}
          </span>
        );
      case "priceAfterDiscount": 
        return `$${offer.priceAfterDiscount}`;
      case "startDate":
        return (
          <div className="flex flex-col">
            <span> {format(new Date(offer.startDate), 'dd/MM/yyyy')}</span>
            <span> {format(new Date(offer.endDate), 'dd/MM/yyyy')}</span>
          </div>
        );
      case "isActive": {
        const isExpired = new Date(offer.endDate) < new Date();
        return (
          <Chip
            color={offer.isActive && !isExpired ? 'success' : 'default'}
            variant="flat"
            size="sm"
          >
            {offer.isActive && !isExpired ? <FiCheck/> : <FiX/>}
          </Chip>
        );
      }
      case "actions":
        return (
          <div className="flex justify-end gap-2">
            <CustomButton
              isIconOnly
              variant="light"
              color="primary"
              size="sm"
              onPress={() => handleEdit(offer)}
              label="Edit"
            >
              <FiEdit size={20} className="text-primary" />
            </CustomButton>
            <CustomButton
              isIconOnly
              variant="light"
              color="danger"
              size="sm"
              onPress={() => handleDelete(offer.offerId)}
              label="Delete"
            >
              <FiTrash size={20} className="text-danger" />
            </CustomButton>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col mb-5 sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-xl font-bold">Offers</h1>
      </div>
      <div className="flex flex-col mb-2 sm:flex-row justify-between items-start sm:items-center gap-3">
        <Select
          size="sm"
          label="Rows per page"
          className="w-36"
          placeholder={rowsPerPage.toString()}
          selectedKeys={[rowsPerPage.toString()]}
          onChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
          }}
          radius="none"
        >
          {rowsPerPageOptions.map((option) => (
            <SelectItem key={option.value} name-value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>

        <div className="flex w-full justify-end gap-3">
          <Input
            isClearable
            radius="none"
            className="w-full sm:max-w-[44%]"
            placeholder="Search offers..."
            startContent={<FiSearch className="text-default-300" />}
            value={searchQuery}
            onClear={() => setSearchQuery("")}
            onValueChange={(value) => setSearchQuery(value)}
          />
          <CustomButton
            size="md"
            variant="solid"
            color="primary"
            onPress={() => setIsModalOpen(true)}
            startContent={<FiFilePlus size={24} />}
            label="Add Offer"
            radius="none"
          />
        </div>
      </div>

      <Table
        radius="none"
        aria-label="Offers table"
        className="w-full"
        sortDescriptor={sortDescriptor}
        onSortChange={(descriptor) =>
          setSortDescriptor({
            ...descriptor,
            column: String(descriptor.column),
          })
        }
        bottomContent={
          <div className="flex justify-between items-center px-2 py-2">
            <span className="text-small text-default-400">
              Total {sortedItems.length} offers
            </span>
            <Pagination
              radius="none"
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        }
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {paginatedItems.length === 0 ? (
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.uid}>
                  {column.uid === "offerTitle" && (
                    <div className="text-center">
                      {searchQuery
                        ? "No offers found matching your search"
                        : "No offers available"}
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ) : (
            paginatedItems.map((item: IOfferProps) => (
              <TableRow key={item.offerId}>
                {columns.map((column) => (
                  <TableCell key={column.uid}>
                    {renderCell(item, column.uid)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>

      </Table>

      <Modal
        isOpen={isModalOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseModal();
        }}
        size="xl"
        classNames={{
          base: "rounded-none",
          header: "rounded-none",
          body: "rounded-none p-5",
          footer: "rounded-none",
          backdrop: "backdrop-opacity-10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {editOfferData ? "Edit Offer" : "Add Offer"}
              </ModalHeader>
              <ModalBody>
                <AddOffer
                  editOfferData={editOfferData}
                  onSuccess={() => {
                    onClose();
                    handleCloseModal();
                  }}
                  isModal={true}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AllOffers;
