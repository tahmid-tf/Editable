import React from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import OrderTable from "./Table/OrderTable";
import PickStyle from "./Table/PickStyle";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

const Orders = () => {
  const { t } = useTranslation("orderPage");
  return (
    <div>
      {/* <div className="bg-white px-36">
        <div>
          <p className="text-[20px] font-bold text-[#868686] py-36">Orders</p>
        </div>
        <OrderTable />
      </div> */}
      <div className="bg-white px-36">
        <div>
          <p className="text-[20px] font-bold text-[#868686] py-36">
            Pick a style
          </p>
        </div>
        <PickStyle />
      </div>
    </div>
  );
};

export default Orders;
