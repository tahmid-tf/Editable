import React from "react";
import CategoriesTable from "./Table/CategoriesTable";

const Categories = () => {
  return (
    <div className="bg-white px-36">
      <div>
        <p className="text-[20px] font-bold text-[#868686] py-36">Categories</p>
      </div>
      <div className="">
        <CategoriesTable />
      </div>
    </div>
  );
};

export default Categories;
