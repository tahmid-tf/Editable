import React from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import OrderTable from "./Table/OrderTable";

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
    <Root
      header={
        <div className="p-24">
          <h4>Orders</h4>
        </div>
      }
      content={
        <div className="">
          <OrderTable />
        </div>
      }
    />
  );
};

export default Orders;
