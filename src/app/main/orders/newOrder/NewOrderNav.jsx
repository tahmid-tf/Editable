import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

const NewOrderNav = () => {
  const arrow = (
    <MdKeyboardArrowRight className="mx-8" color="#667085" size={18} />
  );
  return (
    <div>
      <ul className="flex  items-center">
        <li className="text-[#667085] text-[14px]">Orders</li>
        <li>{arrow}</li>
        <li className="text-[#667085] text-[14px]">Express</li>
        <li>{arrow}</li>
        <li className="text-[#667085] text-[14px]">Wedding</li>
        <li>{arrow}</li>
        <li className="text-[#001AFF] text-[14px] font-medium">
          My Wedding Photos
        </li>
      </ul>
    </div>
  );
};

export default NewOrderNav;
