import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Radio, Checkbox } from "@mui/material";
import cardImage from "../../../../../assets/images/pick-a-style/cardimage.png";

export default function StyleCard({
  title,
  li_1,
  li_2,
  li_3,
  warning_text,
  selectedValue,
  handleChange,
  value,
  type,
}) {
  const Control = type === "checkbox" ? Checkbox : Radio;

  return (
    <Card
      className="bg-[#F8F8F8]"
      sx={{
        maxWidth: 326,
        position: "relative",
      }}
      onClick={() => handleChange({ target: { value } })}
    >
      <CardActionArea
        sx={{
          height: 472,
        }}
        className=""
      >
        <Control
          checked={selectedValue}
          onChange={(e) => e.stopPropagation()} // Prevent event bubbling
          value={value}
          name="style-selection"
          sx={{ position: "absolute", top: 8, left: 22 }}
        />
        <CardMedia
          className="px-32 pt-[53px]"
          component="img"
          image={cardImage}
          alt="Style Image"
        />
        <CardContent className="px-32 h-full">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="font-600"
            style={{ fontFamily: "Roboto", fontSize: "24px" }}
          >
            {title}
          </Typography>
          <Typography className="py-5 text-[15px]" variant="body2">
            <li>{li_1}</li>
          </Typography>
          <Typography className="py-5 text-[15px]" variant="body2">
            <li>{li_2}</li>
          </Typography>
          <Typography className="py-5 text-[15px]" variant="body2">
            <li>{li_3}</li>
          </Typography>
          {warning_text && (
            <p className="pt-16 text-[12px] text-[#CB1717] font-bold">
              {warning_text}
            </p>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
