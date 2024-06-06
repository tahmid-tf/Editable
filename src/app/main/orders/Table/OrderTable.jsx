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
import { Link } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { FiEdit } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdOutlineCheckBox } from "react-icons/md";
import { Checkbox, Pagination, TextField } from "@mui/material";

const columns = [
  "Order Date",
  "Order Id",
  "Remaining Days",
  "Preview Edit Status",
  "Editor",
  "Payment Status",
  "Files",
  "Order Status",
  "",
];

const rows = [
  {
    date: "2023-07-19",
    id: "TX3857",
    remaining: "04/07 days",
    previewstatus: "Approved",
    editorName: "Ayman",
    paymentStatus: "Successful",
    files: "https://drive.google.com/file/d/1/file1",
    orderStatus: "Completed",
    icon: "icon",
  },
  {
    date: "2023-07-19",
    id: "TX1948",
    remaining: "04/07 days",
    previewstatus: "N/A",
    editorName: "editor name x",
    paymentStatus: "Successful",
    files: "https://drive.google.com/file/d/1/file2",
    orderStatus: "Pending",
    icon: "icon",
  },
  {
    date: "2023-07-19",
    id: "TX4703",
    remaining: "04/07 days",
    previewstatus: "Rejected",
    editorName: "editor name y",
    paymentStatus: "Successful",
    files: "https://drive.google.com/file/d/1/file3",
    orderStatus: "Pending",
    icon: "icon",
  },
  {
    date: "2023-07-19",
    id: "TX5612",
    remaining: "04/07 days",
    previewstatus: "N/A",
    editorName: "editor name z",
    paymentStatus: "Successful",
    files: "https://drive.google.com/file/d/1/file4",
    orderStatus: "Cancelled",
    icon: "icon",
  },
  {
    date: "2023-07-19",
    id: "TX8243",
    remaining: "04/07 days",
    previewstatus: "User Review Pending",
    editorName: "editor name xx1",
    paymentStatus: "Successful",
    files: "https://drive.google.com/file/d/1/file5",
    orderStatus: "Preview Edit",
    icon: "icon",
  },
  {
    date: "2023-07-19",
    id: "TX6371",
    remaining: "04/07 days",
    previewstatus: "Pending",
    editorName: "editor name xx2",
    paymentStatus: "Successful",
    files: "https://drive.google.com/file/d/1/file6",
    orderStatus: "Pending",
    icon: "icon",
  },
  {
    date: "2023-07-19",
    id: "TX2936",
    remaining: "04/07 days",
    previewstatus: "Pending",
    editorName: "editor name xx3",
    paymentStatus: "Successful",
    files: "https://drive.google.com/file/d/1/file7",
    orderStatus: "Pending",
    icon: "icon",
  },
  {
    date: "2023-07-19",
    id: "TX4029",
    remaining: "04/07 days",
    previewstatus: "Pending",
    editorName: "editor name x yy1",
    paymentStatus: "Successful",
    files: "https://drive.google.com/file/d/1/file8",
    orderStatus: "Pending",
    icon: "icon",
  },
  {
    date: "2023-07-19",
    id: "TX7154",
    remaining: "04/07 days",
    previewstatus: "Pending",
    editorName: "editor name yy2",
    paymentStatus: "Successful",
    files: "https://drive.google.com/file/d/1/file9",
    orderStatus: "Pending",
    icon: "icon",
  },
  {
    date: "2023-07-19",
    id: "TX1248",
    remaining: "04/07 days",
    previewstatus: "Pending",
    editorName: "editor name yy3",
    paymentStatus: "Successful",
    files: "https://drive.google.com/file/d/1/file10",
    orderStatus: "Pending",
    icon: "icon",
  },
];

// Extract unique editor names
const uniqueEditors = [...new Set(rows.map((row) => row.editorName))];

function OrderTable() {
  // Editors
  const [editorSelectedValues, setEditorSelectedValues] =
    useState("Assign Editor");

  const handleEditorChange = (rowId, event) => {
    setEditorSelectedValues((prevValues) => ({
      ...prevValues,
      [rowId]: event.target.value,
    }));
  };

  // order status
  const [orderStatusValues, setOrderStatusValues] = useState({});

  const handleOrderStatusChange = (rowId, event) => {
    setOrderStatusValues((prevValues) => ({
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
    <div className="pb-36">
      <Paper className="flex flex-col flex-auto rounded-0 overflow-hidden">
        <div className="table-responsive">
          <Table className="simple w-full min-w-full">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
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
              {rows.map((row, index) => (
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
                                value === "Pending" && "bg-[#FFCC00] text-black"
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
                                value === "Failed" && "bg-[#CB1717] text-white"
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
                                  handleOrderStatusChange(row.id, event)
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
                                    "Preview Edit" && "bg-[#CBCBCB] text-Black"
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
  );
}

export default memo(OrderTable);
