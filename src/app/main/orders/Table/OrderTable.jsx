import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { memo } from "react";
import format from "date-fns/format";
import clsx from "clsx";
import Button from "@mui/material/Button";
import FuseLoading from "@fuse/core/FuseLoading";
import { Link } from "react-router-dom";

/**
 * The RecentTransactionsWidget widget.
 */
function OrderTable() {
  //   const { data: widgets, isLoading } = useGetFinanceDashboardWidgetsQuery();

  let isLoading = false;

  if (isLoading) {
    return <FuseLoading />;
  }

  //   const widget = widgets?.recentTransactions;

  //   console.log("widget", widget);

  //   if (!widget) {
  //     return null;
  //   }

  //   const { columns, rows } = widget;

  const columns = [
    "Order Date",
    "Order Id",
    "Remaining Days",
    "Preview Edit Status",
    "Editor",
    "Payment Status",
    "Files",
    "Order Status",
  ];

  const rows = [
    {
      date: "2023-07-19",
      id: "TX3857",
      remaining: "04/07 days",
      previewstatus: "Approved",
      editorName: "Ayman",
      paymentStatus: "Successful",
      files: "Download",
      status: "Completed",
    },
    {
      date: "2023-07-19",
      id: "TX1948",
      remaining: "04/07 days",
      previewstatus: "N/A",
      editorName: "Assign Editor",
      paymentStatus: "Successful",
      files: "Download",
      status: "Pending",
    },
    {
      date: "2023-07-19",
      id: "TX4703",
      remaining: "04/07 days",
      previewstatus: "Rejected",
      editorName: "Assign Editor",
      paymentStatus: "Successful",
      files: "Download",
      status: "Pending",
    },
    {
      date: "2023-07-19",
      id: "TX5612",
      remaining: "04/07 days",
      previewstatus: "N/A",
      editorName: "Ayman",
      paymentStatus: "Successful",
      files: "Download",
      status: "Cancelled",
    },
    {
      date: "2023-07-19",
      id: "TX8243",
      remaining: "04/07 days",
      previewstatus: "User Review Pending",
      editorName: "Assign Editor",
      paymentStatus: "Successful",
      files: "Download",
      status: "Preview Edit",
    },
    {
      date: "2023-07-19",
      id: "TX6371",
      remaining: "04/07 days",
      previewstatus: "Pending",
      editorName: "Assign Editor",
      paymentStatus: "Successful",
      files: "Download",
      status: "Pending",
    },
    {
      date: "2023-07-19",
      id: "TX2936",
      remaining: "04/07 days",
      previewstatus: "Pending",
      editorName: "Assign Editor",
      paymentStatus: "Successful",
      files: "Download",
      status: "Pending",
    },
    {
      date: "2023-07-19",
      id: "TX4029",
      remaining: "04/07 days",
      previewstatus: "Pending",
      editorName: "Assign Editor",
      paymentStatus: "Successful",
      files: "Download",
      status: "Pending",
    },
    {
      date: "2023-07-19",
      id: "TX7154",
      remaining: "04/07 days",
      previewstatus: "Pending",
      editorName: "Assign Editor",
      paymentStatus: "Successful",
      files: "Download",
      status: "Pending",
    },
    {
      date: "2023-07-19",
      id: "TX1248",
      remaining: "04/07 days",
      previewstatus: "Pending",
      editorName: "Assign Editor",
      paymentStatus: "Successful",
      files: "Download link",
      status: "Pending",
    },
  ];

  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <div>
        <Typography className="mr-16 text-lg font-medium tracking-tight leading-6 truncate">
          Recent transactions
        </Typography>
        <Typography className="font-medium" color="text.secondary">
          1 pending, 4 completed
        </Typography>
      </div>

      <div className="table-responsive mt-24">
        <Table className="simple w-full min-w-full">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  <Typography
                    color="text.secondary"
                    className="font-semibold text-12 whitespace-nowrap"
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
                          <Typography color="text.secondary">
                            {value}
                          </Typography>
                        </TableCell>
                      );
                    }
                    case "previewstatus": {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Typography
                            className={clsx(
                              "inline-flex items-center text-12 px-10 py-2 rounded-full tracking-wide ",
                              value === "Approved" && "bg-[#039855] text-white",
                              value === "N/A" && "bg-[#CBCBCB] text-black ",
                              value === "Rejected" && "bg-[#CB1717] text-white",
                              value === "User Review Pending" &&
                                "bg-[#CBCBCB] text-Black",
                              value === "Pending" && "bg-[#FFCC00] text-black"
                            )}
                          >
                            {value}
                          </Typography>
                        </TableCell>
                      );
                    }
                    case "editorName": {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Typography
                            className={clsx(
                              "inline-flex items-center  text-12 px-10 py-2 rounded-full tracking-wide  bg-[#CBCBCB]",
                              value === "Assign Editor" &&
                                "bg-[#F29339] text-black"
                            )}
                          >
                            {value}
                          </Typography>
                        </TableCell>
                      );
                    }
                    case "paymentStatus": {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Typography
                            className={clsx(
                              "inline-flex items-center text-12 px-10 py-2 rounded-full tracking-wide ",
                              value === "Pending" && "bg-[#FFCC00] text-black",
                              value === "Successful" &&
                                "bg-[#039855] text-white ",
                              value === "Cancelled" && "bg-[#CB1717] text-white"
                            )}
                          >
                            {value}
                          </Typography>
                        </TableCell>
                      );
                    }
                    case "status": {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <Typography
                            className={clsx(
                              "inline-flex items-center text-12 px-10 py-2 rounded-full tracking-wide ",
                              value === "Pending" && "bg-[#FFCC00] text-black",
                              value === "Completed" &&
                                "bg-[#039855] text-white ",
                              value === "Cancelled" &&
                                "bg-[#CB1717] text-white",
                              value === "Preview Edit" &&
                                "bg-[#CBCBCB] text-Black"
                            )}
                          >
                            {value}
                          </Typography>
                        </TableCell>
                      );
                    }
                    case "files": {
                      return (
                        <TableCell key={key} component="th" scope="row">
                          <div className="bg-black px-10 py-5">
                            <Link
                              className=""
                              style={{
                                textDecoration: "none",
                                color: "white",
                              }}
                              to={{ value }}
                            >
                              Download
                            </Link>
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
  );
}

export default memo(OrderTable);
