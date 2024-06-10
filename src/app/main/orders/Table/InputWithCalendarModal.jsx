import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
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
}));

const InputWithCalendarModal = ({ open, onClose, onDateChange }) => {
  const classes = useStyles();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: "selection",
    },
  ]);

  const handleDateChange = (item) => {
    setState([item.selection]);
    const startDate = item.selection.startDate.toLocaleDateString();
    const endDate = item.selection.endDate.toLocaleDateString();
    onDateChange(startDate, endDate);
  };

  const handleSubmit = () => {
    const startDate = state[0].startDate.toLocaleDateString();
    const endDate = state[0].endDate.toLocaleDateString();
    onDateChange(startDate, endDate);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={classes.modalStyle}>
        <DateRangePicker
          locale={enGB}
          onChange={(item) => handleDateChange(item)}
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
          <Button variant="contained" color="secondary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InputWithCalendarModal;
