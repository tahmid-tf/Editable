import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Radio, Checkbox } from "@mui/material";
import { BiSolidShoppingBag } from "react-icons/bi";
import { useState } from "react";

export default function PriceCard() {
  // const [isChecked, setIsChecked] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the isChecked state

    if (isChecked) {
      console.log("call a function to change order type expressed to Standerd");
    }
  };

  // pricingCard to update API DATA
  const priceData = {
    monochromPrice: 300,
    cullingPrice: 100,
    skinRetuchingPrice: 1000,
    expressDalevaryPrice: 500,
  };
  const amount =
    priceData.monochromPrice +
    priceData.cullingPrice +
    priceData.skinRetuchingPrice;

  let totalPrice;

  if (isChecked) {
    totalPrice = amount + priceData.expressDalevaryPrice;
  } else {
    totalPrice = amount;
  }
  console.log("totalPrice", totalPrice);
  // pricingCard

  return (
    <Card
      sx={{
        position: "relative",
        boxShadow: 4,
      }}
      // onClick={() => handleChange({ target: { value } })}
    >
      <CardActionArea
        sx={{
          width: 440,
          height: 595,
        }}
        className=""
      >
        <CardContent className="h-full bg-white">
          <div className="p-10">
            {/* card header */}
            <div className="flex flex-col justify-center items-center">
              <div className="flex items-center justify-center w-[92px] h-[92px] bg-[#7d7d7d34] rounded-full">
                <BiSolidShoppingBag size={50} />
              </div>
              <div className="pt-20 pb-36">
                <p
                  className="font-600 text-[#121212]"
                  style={{ fontFamily: "Roboto", fontSize: "38px" }}
                >
                  USD {totalPrice}
                </p>
              </div>
            </div>
            {/* title */}
            <div
              style={{
                borderBottom: "2px solid #EDEDED",
                paddingBottom: "8px",
              }}
            >
              <p className="text-[20px] text-[#474747]">
                Basic Charge (Wedding Category)
              </p>
            </div>
            {/* sub total */}
            <div
              style={{ borderBottom: "2px dashed #EDEDED" }}
              className="pt-[26px] pb-10"
            >
              <div className="py-10  flex items-center justify-between ">
                <p className="text-[16px] text-[#707070]">
                  Monochrome Melodies (1000 items)
                </p>
                <p className="text-[16px] text-[#121212] font-semibold">
                  ${priceData.monochromPrice}
                </p>
              </div>
              <div className="py-10  flex items-center justify-between">
                <p className="text-[16px] text-[#707070]">
                  Culling (5000 items)
                </p>
                <p className="text-[16px] text-[#121212] font-semibold">
                  ${priceData.cullingPrice}
                </p>
              </div>
              <div className="py-10  flex items-center justify-between">
                <p className="text-[16px] text-[#707070]">
                  Skin Retouching (1000 items)
                </p>
                <p className="text-[16px] text-[#121212] font-semibold">
                  ${priceData.skinRetuchingPrice}
                </p>
              </div>
            </div>
            {/* Total */}
            <div className="pt-10">
              <div className="py-10  flex items-center justify-between">
                <p className="text-[18px] pl-[32px] text-[#707070]">Amount</p>
                <p className="text-[18px] font-semibold">USD {amount}</p>
              </div>
              <div className="py-10  flex items-center justify-between">
                <div className="flex justify-center items-center">
                  {/* <Checkbox size="" color="primary" /> */}
                  <Checkbox
                    size="small"
                    color="primary"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <p className="text-[18px] text-[#707070]">Express Delivery</p>
                </div>
                <p className="text-[18px] font-semibold">
                  USD {priceData.expressDalevaryPrice}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
