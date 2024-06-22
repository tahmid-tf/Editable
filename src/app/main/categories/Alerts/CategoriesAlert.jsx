import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

const CategoriesAlert = ({ isDelete, closeDelete }) => {
  return (
    <div className="">
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
    </div>
  );
};

export default CategoriesAlert;
