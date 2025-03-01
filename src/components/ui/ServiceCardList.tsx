import { Card, CardBody, Image } from "@heroui/react";
import { FaHeart, FaRegEdit, FaStar } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

const ServiceCardList = () => {
  //   const isOffers = false;
  const isActive = true;

  return (
    <>
      <div className="flex flex-initial cursor-pointer  transition-all duration-300 ease-in-out">
        <div className=" bg-gray-200 flex justify-center items-center cursor-pointer max-h-[152px]   w-[308px] relative overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            // src="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Preview"
            className=" object-contain w-full h-full  relative"
            shadow="md"
            isZoomed
            radius="none"
          />
        </div>

        <Card radius="none" className="w-full ">
          <CardBody className="mr-2 ">
            <div className="flex justify-between items-center">
              <div className="absolute top-0 left-0 py-2 ml-2 z-20">
                <small className=" bg-gray-200 text-gray-600  px-2 py-1 rounded-md font-medium">
                  Car Wash & Detailing
                </small>
              </div>

              {/* Rating and discount */}
              <div className="absolute top-0 right-0 py-2 mr-2 z-20">
                <div className="flex flex-initial items-center gap-4">
                  <div className="text-caption2py-[2px] px-1 rounded-full flex justify-center items-center">
                    {/* <FaRegHeart
                      className="text-pink-500 hover:text-pink-600"
                      size={16}
                    /> */}
                    <FaHeart className="text-pink-500 " size={16} />
                  </div>
                  <div className="flex flex-initial justify-center items-center -ml-2">
                    <FaStar className="text-yellow-500  mr-1 " size={16} />
                    <small className="-mb-1 font-medium ">
                      4.5 <span className="text-caption2 "> (366)</span>
                    </small>
                  </div>

                  <small className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                    <TbRosetteDiscountCheckFilled className="mr-1 text-lg" />
                    Save $30
                  </small>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-initial mb-2 items-center line-clamp-1 mt-7 ">
              <SlLocationPin size={12} className="mr-1" />
              <small className="text-caption ">Fredericton,New Brunswick</small>
            </div>

            {/* Title */}
            <div className="flex flex-initial justify-between items-center">
              <p className="text-subtitle1 line-clamp-1 mr-2">
                Professional Office & Commercial Cleaning Commercial Cleaning
                Commercial Cleaning
              </p>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900">$9200</span>
                <small className=" text-gray-500 line-through">$12000</small>
              </div>
            </div>

            {/* Action btn */}
            <div className="flex flex-initial justify-between items-end mt-3">
              <div className="flex flex-initial justify-center items-center gap-3">
                <Link to={"/service/edit"}>
                  <div className="flex flex-initial justify-center items-center hover:underline hover:text-primary">
                    <FaRegEdit className="mr-1" />
                    <small className="font-medium text-gray-600">Edit</small>
                  </div>
                </Link>

                {isActive ? (
                  <div className="flex flex-initial justify-center items-center hover:underline hover:text-primary">
                    <GrStatusGood className="mr-1 text-green-500" />
                    <small className="font-medium text-gray-600">Active</small>
                  </div>
                ) : (
                  <div className="flex flex-initial justify-center items-center hover:underline hover:text-primary">
                    <IoMdCloseCircleOutline
                      className="mr-1 text-red-500"
                      size={18}
                    />
                    <small className="font-medium text-gray-600">
                      Inactive
                    </small>
                  </div>
                )}
              </div>

              <CustomButton
                label="Apply Offers"
                variant="ghost"
                color="primary"
                className="text-gray-600 font-medium"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ServiceCardList;
