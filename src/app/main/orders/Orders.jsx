import React from "react";
import FusePageSimple from "@fuse/core/FusePageSimple";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import OrderTable from "./Table/OrderTable";
import OrderForm from "./Table/OrderForm";

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
      className="flex"
      header={
        <div className="p-24 bg-white">
          <h4>Orders</h4>
        </div>
      }
      content={
        <div className="flex-1 bg-white">
          <OrderForm />
          <OrderTable />
        </div>
      }
    />
  );
};

export default Orders;
