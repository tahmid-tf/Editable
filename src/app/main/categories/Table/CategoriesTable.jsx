import * as React from "react";
import { Box, Grid, Modal, Pagination, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { memo, useState } from "react";
import Button from "@mui/material/Button";
import FuseLoading from "@fuse/core/FuseLoading";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { allColumnsData, allRowsData } from "./CategoriesData";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateCategoriesForm from "./CreateCategoriesForm";
import EditCategoriesForm from "./EditCategoriesForm";

function OrderTable({ deleteAlert, successAlert, errorAlert }) {
  // ================================================= create categories model =================================================

  const [open, setOpen] = useState(false); // State for modal visibility

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // ================================================= edit categories model =================================================

  const [editOpen, setEditOpen] = useState(false); // State for modal visibility

  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  // ================================== Table data ================================

  const requiredColumns = new Set([
    "Name",
    "Style Price",
    "Style Threshold",
    "Culling Price",
    "Culling Threshold",
    "Retouch Price",
    "Retouch Threshold",
    "Preview Price",
    "Preview Threshold",
    "",
  ]);

  const selectedColumns = allColumnsData.filter((column) =>
    requiredColumns.has(column)
  );

  const selectedRowsData = allRowsData.map((row) => ({
    name: row.name,
    stylePrice: row.stylePrice,
    styleThreshold: row.styleThreshold,
    cullingPrice: row.cullingPrice,
    cullingThreshold: row.cullingThreshold,
    retouchPrice: row.retouchPrice,
    retouchThreshold: row.retouchThreshold,
    previewPrice: row.previewPrice,
    previewThreshold: row.previewThreshold,
    icon: row.icon,
  }));

  // ================================ filter ================================
  const [searchValue, setSearchValue] = useState("");

  const filterRows = (rows) => {
    return rows.filter((row) => {
      const matchesSearchValue = row.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      return matchesSearchValue;
    });
  };

  // ================================ filter end ================================

  const visibleColumns = selectedColumns;
  const visibleRows = filterRows(selectedRowsData);

  // Function to handle LuEye icon click
  const handleDeleteClick = () => {
    deleteAlert();
    // errorAlert();
    // successAlert();
    console.log("LuEye clicked");
  };

  // Function to handle FiEdit icon click
  const handleFiEditClick = () => {
    handleEditOpen();
    console.log("FiEdit clicked");
  };

  // page navigation
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(20); // Assuming total pages are known

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleInputChange = (event) => {
    const pageNumber = parseInt(event.target.value, 10);
    if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  // page navigation .end

  //
  let isLoading = false;

  if (isLoading) {
    return <FuseLoading />;
  }
  //

  return (
    <div className="h-full flex flex-col justify-between">
      {/* create categories */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className="bg-white flex justify-center items-center">
          {/* <h1>Modal</h1> */}
          <CreateCategoriesForm
            onClose={handleClose}
            successAlert={successAlert}
          />
        </div>
      </Modal>
      {/* edit categories */}
      <Modal
        open={editOpen}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className="bg-white flex justify-center items-center">
          {/* <h1>Modal</h1> */}
          <EditCategoriesForm onClose={handleEditClose} />
        </div>
      </Modal>
      <div className="">
        <div className="">
          <Grid container spacing={2} className="py-10 justify-between">
            <Grid item>
              <TextField
                sx={{
                  height: "38px",
                }}
                // fullWidth
                // label="Search"
                placeholder="Search"
                name="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained" // Use contained variant for better visibility
                // size="small"
                // bg-[#146ef5ef] hover:bg-[#0066ff]
                sx={{
                  backgroundColor: "#146ef5ef",
                  color: "white",
                  borderRadius: "4px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  height: "38px", // Adjust height as needed
                  ":hover": {
                    backgroundColor: "#0066ff",
                    color: "white",
                  },
                }}
                onClick={handleOpen}
              >
                Create Category
              </Button>
            </Grid>
          </Grid>
          <div className="flex justify-between py-20">
            <div className="flex">
              <div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0 text-lg font-400">
                <span>Total Categories:</span>
                <b> 03</b>
              </div>
            </div>
          </div>
        </div>
        {/* ========================== table =========================== */}
        <div className="pb-36">
          <Paper
            className="flex flex-col flex-auto rounded-0 overflow-hidden"
            sx={{ boxShadow: "none", border: "1px solid #DFE0EB" }}
          >
            <div className="table-responsive">
              <Table className="simple w-full min-w-full">
                <TableHead>
                  <TableRow>
                    {visibleColumns.map((column, index) => (
                      <TableCell key={index}>
                        <Typography
                          color="text.secondary"
                          className="font-semibold text-16 text-black whitespace-nowrap"
                          style={{
                            whiteSpace: "pre-line",
                            wordBreak: "break-all",
                          }}
                        >
                          {column.replace(" ", "\n")}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {visibleRows.map((row, index) => (
                    <TableRow key={index}>
                      {Object.entries(row).map(([key, value]) => {
                        switch (key) {
                          case "icon": {
                            return (
                              <TableCell key={key} component="th" scope="row">
                                <div className="flex gap-5">
                                  <button onClick={handleFiEditClick}>
                                    <FiEdit size={18} />
                                  </button>
                                  <button onClick={handleDeleteClick}>
                                    <RiDeleteBinLine size={20} />
                                  </button>
                                </div>
                              </TableCell>
                            );
                          }
                          default: {
                            return (
                              <TableCell key={key} component="th" scope="row">
                                <Typography>{value}</Typography>
                              </TableCell>
                            );
                          }
                        }
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Paper>
        </div>
      </div>
      <div className="my-48 flex justify-center">
        <Pagination
          count={totalPages}
          color="secondary"
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

export default memo(OrderTable);
