import { Card, CardBody, CardHeader, Image } from "@heroui/react";
import { SlLocationPin } from "react-icons/sl";
import { FaRegEdit, FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GrStatusGood } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CustomButton from "./CustomButton";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";

const ServiceCard = () => {
  const isOffers = false;
  const isActive = true;

  return (
    <>
      <div className="cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="relative">
          <div className="bg-gray-200 flex justify-center items-center cursor-pointer w-full h-[250px] relative overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              //   src="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Preview"
              className="object-cover w-full h-full"
              shadow="md"
              isZoomed
              radius="none"
            />
          </div>

          <div className="absolute top-0 ledt-0 p-3 z-20">
            <small className=" bg-gray-200 text-gray-600  px-2 py-1 rounded-md font-medium">
              Car Wash & Detailing
            </small>
          </div>

          <div className="absolute top-0 right-0  p-3 z-20 ">
            <small className="flex items-center bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
              <TbRosetteDiscountCheckFilled className="mr-1 text-lg" />
              Save $30
            </small>
          </div>
        </div>
        <Card radius="none">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start"></CardHeader>
          <CardBody className="overflow-visible -mt-3 pb-3">
            <div className="flex flex-initial mb-1 items-center line-clamp-1">
              <SlLocationPin size={12} className="mr-1" />
              <small className="text-caption ">Fredericton,New Brunswick</small>
            </div>
            <p className="text-subtitle1 line-clamp-2">
              Professional Office & Commercial Cleaning
            </p>

            <div>
              <div className="flex items-center justify-between mt-2">
                {/* rating */}
                <div className="flex items-center gap-4">
                  <div className="text-caption2py-[2px] px-1 rounded-full flex justify-center items-center">
                    {/* <FaRegHeart className="text-pink-500 hover:text-pink-600" size={16} /> */}
                    <FaHeart className="text-pink-500 " size={16} />
                  </div>
                  <div className="flex flex-initial justify-center items-center -ml-2">
                    <FaStar className="text-yellow-500  mr-1 " size={16} />
                    <small className="-mb-1 font-medium ">
                      4.5 <span className="text-caption2 "> (366)</span>
                    </small>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Price Display */}
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-900">$9200</span>
                    <small className=" text-gray-500 line-through">
                      $12000
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mt-3">
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
                      <small className="font-medium text-gray-600">
                        Active
                      </small>
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
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ServiceCard;
