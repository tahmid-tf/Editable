import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { enGB } from "date-fns/locale";

const useStyles = makeStyles((theme) => ({
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: theme.spacing(2),
    borderRadius: "7px",
  },
  inputField: {
    marginBottom: theme.spacing(2),
  },
}));

const InputWithCalendarModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDateChange = (item) => {
    setState([item.selection]);
    const startDate = item.selection.startDate.toLocaleDateString();
    const endDate = item.selection.endDate.toLocaleDateString();
    setInputValue(`${startDate} - ${endDate}`);
  };

  const handleSubmit = () => {
    const startDate = state[0].startDate.toLocaleDateString();
    const endDate = state[0].endDate.toLocaleDateString();
    setInputValue(`${startDate} - ${endDate}`);
    handleClose();
  };

  return (
    <div>
      <TextField
        className={classes.inputField}
        label="Select Date Range"
        variant="outlined"
        fullWidth
        value={inputValue}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleOpen}>
                <CalendarTodayIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Modal open={open} onClose={handleClose}>
        <Box className={classes.modalStyle}>
          <DateRangePicker
            locale={enGB}
            onChange={(item) => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginRight: 8 }}
            >
              Submit
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default InputWithCalendarModal;
