import React, { useState } from "react";
import StylesTable from "./Table/StylesTable";
import StylesAlerts from "./Alerts/StylesAlerts";

const Styles = () => {
  // delete
  const [isDelete, setIsDelete] = useState(false);
  const deleteAlert = () => {
    setIsDelete(true);
  };
  const closeDelete = () => {
    setIsDelete(false);
  };

  // Success
  const [isSuccess, setIsSuccess] = useState(false);
  const successAlert = () => {
    setIsSuccess(true);
  };
  const closeSuccess = () => {
    setIsSuccess(false);
  };

  // Error
  const [isError, setIsError] = useState(false);
  const errorAlert = () => {
    setIsError(true);
  };
  const closeError = () => {
    setIsError(false);
  };
  return (
    <div className="px-36 h-full flex flex-col">
      <StylesAlerts
        isDelete={isDelete}
        closeDelete={closeDelete}
        isSuccess={isSuccess}
        closeSuccess={closeSuccess}
        isError={isError}
        closeError={closeError}
      />
      <div>
        <p className="text-[20px] font-bold text-[#868686] py-36">Styles</p>
      </div>
      <div className="flex-1">
        <StylesTable
          deleteAlert={deleteAlert}
          successAlert={successAlert}
          errorAlert={errorAlert}
        />
      </div>
    </div>
  );
};

export default Styles;
