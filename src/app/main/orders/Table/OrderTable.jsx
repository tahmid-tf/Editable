import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Grid, Modal } from "@mui/material";
// table
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { memo, useState } from "react";
import format from "date-fns/format";
import clsx from "clsx";
import Button from "@mui/material/Button";
import FuseLoading from "@fuse/core/FuseLoading";
import { FiEdit } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { Checkbox, Pagination, TextField } from "@mui/material";
import { allColumnsData, allRowsData } from "./OrdersData";
import { AiFillInfoCircle } from "react-icons/ai";
import InputWithCalendarModal from "./InputWithCalendarModal";
import { InputAdornment, IconButton } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GeneralinfoForm from "./GeneralinfoForm";

function OrderTable() {
  // =================================================  new order model =================================================
  const [newOrderOpen, setNewOrderOpen] = useState(false); // State for modal visibility
  const handleNewOrderOpen = () => {
    setNewOrderOpen(true);
  };
  const handleNewOrderClose = () => {
    setNewOrderOpen(false);
  };
  // ================================== Modal calendar ================================
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  console.log("i-value", inputValue);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDateChange = (startDate, endDate) => {
    setInputValue(`${startDate} - ${endDate}`);
  };

  // ================================== Table data ================================
  const requiredColumns = new Set([
    "Order Date",
    "Order ID",
    "Remaining Days",
    "Preview Edit Status",
    "Editor",
    "Payment Status",
    "Files",
    "Order Status",
    "",
  ]);

  const selectedColumns = allColumnsData.filter((column) =>
    requiredColumns.has(column)
  );

  const selectedRowsData = allRowsData.map((row) => ({
    date: row.date,
    id: row.id,
    remaining: row.remaining,
    previewstatus: row.previewstatus,
    editorName: row.editorName,
    paymentStatus: row.paymentStatus,
    files: row.files,
    orderStatus: row.orderStatus,
    icon: row.icon,
  }));

  // ================================ form ================================

  // const [searchValue, setSearchValue] = React.useState("");
  const [orderStatusValue, setOrderStatusValue] = useState("");
  // console.log("orderStatusValue", orderStatusValue);
  const [paymentStatusValue, setPaymentStatusValue] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const orderStatusOptions = [
    "Order Status",
    "Pending",
    "Completed",
    "Cancelled",
    "Preview Edit",
  ];
  const paymentStatusOptions = ["Payment Status", "Pending", "Successful"];
  const editorOptions = [
    "Editor",
    "Assign Editor",
    "Ayman",
    "Jane Smith",
    "Michael Brown",
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("nv", name, value);
    if (name === "orderStatus") {
      setOrderStatusValue(value);
    } else if (name === "paymentStatus") {
      setPaymentStatusValue(value);
    } else if (name === "editor") {
      setEditorValue(value);
    }
  };

  // const handleDateChange = (newValue) => {
  //   setSelectedDate(newValue);
  // };

  // ================================ form end ================================
  // ================================ filter ================================
  const [searchValue, setSearchValue] = useState("");

  const filterRows = (rows) => {
    return rows.filter((row) => {
      const matchesSearchValue = row.id
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const matchesOrderStatus =
        orderStatusValue === "" ||
        orderStatusValue === "Order Status" ||
        row.orderStatus === orderStatusValue;
      const matchesPaymentStatus =
        paymentStatusValue === "" ||
        paymentStatusValue === "Payment Status" ||
        row.paymentStatus === paymentStatusValue;
      const matchesEditor =
        editorValue === "" ||
        editorValue === "Editor" ||
        row.editorName === editorValue;
      // Date range filter logic
      const isEmptyDateRange = !inputValue || inputValue.trim() === "";
      const isDateInRange =
        isEmptyDateRange ||
        (function () {
          const [startDateString, endDateString] = inputValue.split(" - ");
          const startDate = new Date(startDateString);
          const endDate = new Date(endDateString);
          endDate.setDate(endDate.getDate() + 1); // to make this logic workable increase one day
          // console.log("endDate", endDate);
          const rowDate = new Date(row.date);

          // Check for single day or date range (inclusive)
          return startDate.getTime() === endDate.getTime()
            ? startDate.getTime() <= rowDate.getTime() // Include both start and end dates for single day selection
            : startDate.getTime() <= rowDate.getTime() &&
                rowDate.getTime() <= endDate.getTime(); // Existing range check (inclusive)
        })();
      // Date range filter logic - end

      return (
        matchesSearchValue &&
        matchesOrderStatus &&
        matchesPaymentStatus &&
        matchesEditor &&
        isDateInRange
      );
    });
  };

  // ================================ filter end ================================

  // columns and rows
  // const [showAll, setShowAll] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Toggle checkbox state on click
  const handleClick = () => {
    setShowAll(!showAll);
  };
  // Toggle checkbox end

  const visibleColumns = showAll ? allColumnsData : selectedColumns;
  // const visibleRows = showAll ? allRowsData : selectedRowsData;
  const visibleRows = filterRows(showAll ? allRowsData : selectedRowsData);

  // Editors
  // Extract unique editor names
  const uniqueEditors = [
    ...new Set(selectedRowsData.map((row) => row.editorName)),
  ];
  const [editorSelectedValues, setEditorSelectedValues] =
    useState("Assign Editor");

  const handleEditorChange = (rowId, event) => {
    setEditorSelectedValues((prevValues) => ({
      ...prevValues,
      [rowId]: event.target.value,
    }));
  };

  // order status values
  const [orderStatusValues, setOrderStatusValues] = useState({});
  // console.log("osv", orderStatusValues);

  const handleOrderStatusChanges = (rowId, event) => {
    setOrderStatusValues((prevValues) => ({
      ...prevValues,
      [rowId]: event.target.value,
    }));
  };

  // order type
  const uniqueOrders = [...new Set(allRowsData.map((row) => row.orderType))];
  const [orderTypeValues, setOrderTypeValues] = useState({});

  const handleOrderTypeChange = (rowId, event) => {
    setOrderTypeValues((prevValues) => ({
      ...prevValues,
      [rowId]: event.target.value,
    }));
  };

  // Function to handle LuEye icon click
  const handleLuEyeClick = () => {
    console.log("LuEye clicked");
  };

  // Function to handle FiEdit icon click
  const handleFiEditClick = () => {
    console.log("FiEdit clicked");
  };

  //
  let isLoading = false;

  if (isLoading) {
    return <FuseLoading />;
  }
  //

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

  return (
    <div className="">
      {/* new order modal */}
      <Modal
        open={newOrderOpen}
        onClose={handleNewOrderClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className="bg-white flex justify-center items-center">
          {/* <h1>Modal</h1> */}
          <GeneralinfoForm
            onClose={handleNewOrderClose}
            // successAlert={successAlert}
          />
        </div>
      </Modal>
      <div className="">
        <Grid container spacing={2} className="py-10">
          <Grid item xs={3}>
            <TextField
              label="Search"
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="order-status-label">Order Status</InputLabel>
              <Select
                labelId="order-status-label"
                id="orderStatus"
                name="orderStatus"
                value={orderStatusValue}
                label="Order Status"
                onChange={handleChange}
                // onChange={(e) => setOrderStatusValue(e.target.value)}
                sx={{
                  "& .MuiSelect-select": {
                    backgroundColor: "white",
                    borderRadius: "4px",
                  },
                }}
              >
                {orderStatusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="payment-status-label">Payment Status</InputLabel>
              <Select
                labelId="payment-status-label"
                id="paymentStatus"
                name="paymentStatus"
                value={paymentStatusValue}
                label="Payment Status"
                onChange={handleChange}
                sx={{
                  "& .MuiSelect-select": {
                    backgroundColor: "white",
                    borderRadius: "4px",
                  },
                }}
              >
                {paymentStatusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="editor-label">Editor</InputLabel>
              <Select
                labelId="editor-label"
                id="editor"
                name="editor"
                value={editorValue}
                label="Editor"
                onChange={handleChange}
                sx={{
                  "& .MuiSelect-select": {
                    backgroundColor: "white",
                    borderRadius: "4px",
                  },
                }}
              >
                {editorOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <div>
              <TextField
                label="Select Date Range"
                placeholder="MM-DD-YYYY"
                variant="outlined"
                fullWidth
                // disabled
                onClick={handleOpen}
                value={inputValue}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                      // onClick={handleOpen}
                      >
                        <CalendarTodayIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <InputWithCalendarModal
                open={open}
                onClose={handleClose}
                onDateChange={handleDateChange}
              />
            </div>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              size="small"
              sx={{
                width: "100%",
                height: "48px",
                // paddingLeft: "24px",
                // paddingRight: "24px",
                borderRadius: "4px",
                backgroundColor: "#146ef5ef",
                color: "white",
                ":hover": {
                  backgroundColor: "#0066ff",
                  color: "white",
                },
              }}
              onClick={handleNewOrderOpen}
            >
              New Orders
            </Button>
          </Grid>
        </Grid>
        <div className="flex justify-between py-20">
          <div className="flex">
            <div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0 text-lg font-400">
              <span>Total Orders:</span>
              <b> 100</b>
            </div>
            {/* <Typography className="font-medium" color="text.secondary">
            Total Orders: 100
          </Typography> */}
            <Typography className="font-medium mx-20" color="text.secondary">
              |
            </Typography>
            <div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0  text-lg font-400">
              <span>Completed Orders:</span>
              <b> 80</b>
            </div>

            <Typography className="font-medium mx-20" color="text.secondary">
              |
            </Typography>
            <div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0  text-lg font-400">
              <span>Pending Orders:</span>
              <b> 10</b>
            </div>
          </div>
          {/* <div className="flex items-center gap-5">
          <MdOutlineCheckBoxOutlineBlank size={18} />
          <MdOutlineCheckBox size={18} />
          <Typography className="font-medium" color="text.secondary">
            Show all columns
          </Typography>
        </div> */}
          <div
            className="flex items-center cursor-pointer"
            onClick={handleClick}
          >
            <Checkbox checked={showAll} size="small" />{" "}
            {/* Use checked state for checkbox */}
            <Typography className="font-medium" color="text.secondary">
              Show all columns
            </Typography>
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
                      >
                        {column}
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
                        case "date": {
                          return (
                            <TableCell key={key} component="th" scope="row">
                              <Typography>
                                {format(new Date(value), "MMM dd, y")}
                              </Typography>
                            </TableCell>
                          );
                        }
                        case "id": {
                          return (
                            <TableCell key={key} component="th" scope="row">
                              <Typography color="" className="">
                                {value}
                              </Typography>
                            </TableCell>
                          );
                        }
                        case "previewstatus": {
                          return (
                            <TableCell key={key} component="th" scope="row">
                              <div
                                className={clsx(
                                  "inline-flex items-center px-[10px] py-[2px] rounded-full tracking-wide",
                                  value === "Approved" &&
                                    "bg-[#039855] text-white",
                                  value === "N/A" && "bg-[#CBCBCB] text-black",
                                  value === "Rejected" &&
                                    "bg-[#CB1717] text-white",
                                  value === "User Review Pending" &&
                                    "bg-[#CBCBCB] text-black",
                                  value === "Pending" &&
                                    "bg-[#FFCC00] text-black"
                                )}
                              >
                                <div className="tracking-[0.2px] leading-[20px] font-medium">
                                  {value}
                                </div>
                              </div>
                            </TableCell>
                          );
                        }
                        case "editorName":
                          return (
                            <TableCell key={key} component="th" scope="row">
                              <div
                                className={clsx(
                                  "inline-flex items-center px-10 py-2 rounded-full tracking-wide",
                                  (editorSelectedValues[row.id] || value) ===
                                    "Assign Editor"
                                    ? "bg-[#F29339] text-black"
                                    : "bg-[#CBCBCB]"
                                )}
                              >
                                <select
                                  value={editorSelectedValues[row.id] || value}
                                  onChange={(event) =>
                                    handleEditorChange(row.id, event)
                                  }
                                  className={clsx(
                                    "",
                                    (editorSelectedValues[row.id] || value) ===
                                      "Assign Editor"
                                      ? "bg-[#F29339] text-black"
                                      : "bg-[#CBCBCB]"
                                  )}
                                >
                                  <option
                                    className="bg-white"
                                    value="Assign Editor"
                                  >
                                    Assign Editor
                                  </option>
                                  {uniqueEditors.map((editor, idx) => (
                                    <option
                                      key={idx}
                                      value={editor}
                                      className="bg-white"
                                    >
                                      {editor}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </TableCell>
                          );

                        case "paymentStatus": {
                          return (
                            <TableCell key={key} component="th" scope="row">
                              <div
                                className={clsx(
                                  "inline-flex items-center px-[10px] py-[2px] rounded-full tracking-wide",
                                  value === "Successful" &&
                                    "bg-[#039855] text-white",
                                  value === "Failed" &&
                                    "bg-[#CB1717] text-white",
                                  value === "Pending" &&
                                    "bg-[#FFCC00] text-black"
                                )}
                              >
                                <div className="tracking-[0.2px] leading-[20px] font-medium">
                                  {value}
                                </div>
                              </div>
                            </TableCell>
                          );
                        }

                        case "orderStatus": {
                          return (
                            <TableCell key={key} component="th" scope="row">
                              <Typography
                                className={clsx(
                                  "inline-flex items-center px-10 py-2 rounded-full tracking-wide ",
                                  (orderStatusValues[row.id] || value) ===
                                    "Pending" && "bg-[#FFCC00] text-black",
                                  (orderStatusValues[row.id] || value) ===
                                    "Completed" && "bg-[#039855] text-white ",
                                  (orderStatusValues[row.id] || value) ===
                                    "Cancelled" && "bg-[#CB1717] text-white",
                                  (orderStatusValues[row.id] || value) ===
                                    "Preview Edit" && "bg-[#CBCBCB] text-Black"
                                )}
                              >
                                <select
                                  value={orderStatusValues[row.id] || value}
                                  onChange={(event) =>
                                    handleOrderStatusChanges(row.id, event)
                                  }
                                  className={clsx(
                                    "inline-flex items-center tracking-wide ",
                                    (orderStatusValues[row.id] || value) ===
                                      "Pending" && "bg-[#FFCC00] text-black",
                                    (orderStatusValues[row.id] || value) ===
                                      "Completed" && "bg-[#039855] text-white ",
                                    (orderStatusValues[row.id] || value) ===
                                      "Cancelled" && "bg-[#CB1717] text-white",
                                    (orderStatusValues[row.id] || value) ===
                                      "Preview Edit" &&
                                      "bg-[#CBCBCB] text-Black"
                                  )}
                                >
                                  <option
                                    className="bg-white text-black"
                                    value="Pending"
                                  >
                                    Pending
                                  </option>
                                  <option
                                    className="bg-white text-black"
                                    value="Completed"
                                  >
                                    Completed
                                  </option>
                                  <option
                                    className="bg-white text-black"
                                    value="Cancelled"
                                  >
                                    Cancelled
                                  </option>
                                  <option
                                    className="bg-white text-black"
                                    value="Preview Edit"
                                  >
                                    Preview Edit
                                  </option>
                                </select>
                              </Typography>
                            </TableCell>
                          );
                        }
                        case "files": {
                          return (
                            <TableCell key={key} component="th" scope="row">
                              <div
                                className={clsx(
                                  "inline-flex items-center px-[10px] py-[2px] tracking-wide",
                                  "bg-black text-white"
                                )}
                              >
                                <a
                                  href={value}
                                  // target="_blank"
                                  download
                                  className="tracking-[0.2px] leading-[20px] font-medium"
                                  style={{
                                    textDecoration: "none",
                                    color: "white",
                                  }}
                                >
                                  Download
                                </a>
                              </div>
                            </TableCell>
                          );
                        }

                        case "icon": {
                          return (
                            <TableCell key={key} component="th" scope="row">
                              <div className="flex gap-5">
                                <button onClick={handleLuEyeClick}>
                                  <LuEye size={20} />
                                </button>
                                <button onClick={handleFiEditClick}>
                                  <FiEdit size={18} />
                                </button>
                              </div>
                            </TableCell>
                          );
                        }
                        // ========== show all columns ==========
                        case "orderType":
                          return (
                            <TableCell key={key} component="th" scope="row">
                              <div
                                className={clsx(
                                  "inline-flex items-center px-10 py-2 rounded-full tracking-wide",
                                  (orderTypeValues[row.id] || value) ===
                                    "Standard"
                                    ? "bg-green text-white"
                                    : "bg-[#CBCBCB]",
                                  (orderTypeValues[row.id] || value) ===
                                    "Express"
                                    ? "bg-blue text-white"
                                    : "bg-[#CBCBCB]",
                                  (orderTypeValues[row.id] || value) ===
                                    "Custom"
                                    ? "bg-[#FFC107] text-black"
                                    : "bg-[#CBCBCB]"
                                )}
                              >
                                <select
                                  value={orderTypeValues[row.id] || value}
                                  onChange={(event) =>
                                    handleOrderTypeChange(row.id, event)
                                  }
                                  className={clsx(
                                    "",
                                    (orderTypeValues[row.id] || value) ===
                                      "Standard"
                                      ? "bg-green text-white"
                                      : "bg-[#CBCBCB]",
                                    (orderTypeValues[row.id] || value) ===
                                      "Express"
                                      ? "bg-blue text-white"
                                      : "bg-[#CBCBCB]",
                                    (orderTypeValues[row.id] || value) ===
                                      "Custom"
                                      ? "bg-[#FFC107] text-black"
                                      : "bg-[#CBCBCB]"
                                  )}
                                >
                                  <option
                                    className="bg-white text-black"
                                    value="Order Types"
                                  >
                                    Order Types
                                  </option>
                                  {uniqueOrders.map((orderType, id) => (
                                    <option
                                      key={id}
                                      value={orderType}
                                      className="bg-white text-black"
                                    >
                                      {orderType}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </TableCell>
                          );

                        case "price": {
                          return (
                            <TableCell
                              key={key}
                              component="th"
                              scope="row"
                              className=""
                            >
                              <Typography className="flex items-center gap-3">
                                <Typography color="" className="">
                                  {value}
                                </Typography>
                                <AiFillInfoCircle size={10} />
                              </Typography>
                            </TableCell>
                          );
                        }

                        case "files2": {
                          return (
                            <TableCell key={key} component="th" scope="row">
                              <div
                                className={clsx(
                                  "inline-flex items-center px-[10px] py-[2px] tracking-wide",
                                  "bg-black text-white"
                                )}
                              >
                                <a
                                  href={value}
                                  // target="_blank"
                                  download
                                  className="tracking-[0.2px] leading-[20px] font-medium"
                                  style={{
                                    textDecoration: "none",
                                    color: "white",
                                  }}
                                >
                                  Download
                                </a>
                              </div>
                            </TableCell>
                          );
                        }

                        // show all cases .end

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
          {/* <div className="mt-48 flex justify-center">
        <Pagination count={20} color="secondary" />
      </div> */}
        </Paper>
        <div className="mt-48 flex justify-center">
          <Pagination
            count={totalPages}
            color="secondary"
            page={currentPage}
            onChange={handleChangePage}
          />

          {/* <TextField
          label="Go to page"
          type="number"
          InputLabelProps={{ shrink: true }} // Reduce label size on focus
          variant="outlined"
          value={currentPage}
          onChange={handleInputChange}
          sx={{ width: 80, marginRight: 2 }} // Set input width and margin
        /> */}
        </div>
      </div>
    </div>
  );
}

export default memo(OrderTable);
