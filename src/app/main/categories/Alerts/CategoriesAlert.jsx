import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const CategoriesAlert = ({
  isDelete,
  closeDelete,
  isSuccess,
  closeSuccess,
  isError,
  closeError,
}) => {
  return (
    <div className="">
      {/* ========== delete alert ========== */}
      {/* <Button
        variant="contained"
        // onClick={deleteAlert}
      >
        Top-Center
      </Button> */}
      <Snackbar
        open={isDelete}
        autoHideDuration={5000}
        onClose={closeDelete}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="mt-40 "
      >
        <Alert
          // onClose={closeDelete}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "50px",
            backgroundColor: "#0469E3",
            padding: "0px 16px 0px 8px", // Adjust padding to reduce height
            "& .MuiAlert-icon": {
              display: "none",
            },
          }}
        >
          <span
            className="bg-white text-black  px-8 py-3 mr-5 rounded-full"
            // style={{ fontSize: "12px" }} // Set your desired font size here
          >
            Deleted
          </span>
          Category has been deleted
        </Alert>
      </Snackbar>

      {/* ========== Success alert ========== */}

      <Snackbar
        open={isSuccess}
        autoHideDuration={5000}
        onClose={closeSuccess}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="mt-40 "
      >
        <Alert
          // onClose={closeSuccess}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "50px",
            backgroundColor: "white",
            color: "#027A48",
            padding: "0px 16px 0px 8px", // Adjust padding to reduce height
            "& .MuiAlert-icon": {
              display: "none",
            },
          }}
        >
          <span
            className="bg-[#039855] text-white  px-8 py-3 mr-5 rounded-full"
            // style={{ fontSize: "12px" }} // Set your desired font size here
          >
            Success
          </span>
          Category Created Successfully!
        </Alert>
      </Snackbar>

      {/* ========== Error alert ========== */}

      <Snackbar
        open={isError}
        autoHideDuration={5000}
        onClose={closeError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="mt-40 "
      >
        <Alert
          // onClose={closeError}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: "50px",
            backgroundColor: "#FFFFFF",
            color: "#B42318",
            padding: "0px 16px 0px 8px", // Adjust padding to reduce height
            "& .MuiAlert-icon": {
              display: "none",
            },
          }}
        >
          <span
            className="bg-[#D92D20] text-white  px-8 py-3 mr-5 rounded-full"
            // style={{ fontSize: "12px" }} // Set your desired font size here
          >
            Error
          </span>
          An unexpected error has occurred. Please try again later
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CategoriesAlert;
