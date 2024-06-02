import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";

export default function OrderForm() {
  const [searchValue, setSearchValue] = React.useState("");
  const [orderStatusValue, setOrderStatusValue] = React.useState("");
  const [paymentStatusValue, setPaymentStatusValue] = React.useState("");
  const [editorValue, setEditorValue] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);

  const orderStatusOptions = [
    "Pending",
    "Completed",
    "Cancelled",
    "Preview Edit",
  ];
  const paymentStatusOptions = ["Unpaid", "Paid", "Successfull"];
  const editorOptions = ["Ayman", "Jane Smith", "Michael Brown"];

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "search") {
      setSearchValue(value);
    } else if (name === "orderStatus") {
      setOrderStatusValue(value);
    } else if (name === "paymentStatus") {
      setPaymentStatusValue(value);
    } else if (name === "editor") {
      setEditorValue(value);
    }
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  return (
    <Grid container spacing={2} className="py-10">
      <Grid item xs={3}>
        <TextField
          fullWidth
          label="Search"
          name="search"
          value={searchValue}
          onChange={handleChange}
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
        <DesktopDatePicker
          label="Date Picker"
          inputFormat="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "black",
            color: "white", // Add color for text visibility
            borderRadius: "4px",
            width: "100%",
            height: "48px", // Adjust height as needed

            ":hover": {
              backgroundColor: "gray", // Darker shade on hover
              color: "white", // Lighter text color on hover
            },
          }}
        >
          New Orders
        </Button>
      </Grid>
    </Grid>
  );
}
