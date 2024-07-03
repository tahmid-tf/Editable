import React, { useState } from "react";
import StyleCard from "./StyleCards/StyleCard";
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AiFillInfoCircle } from "react-icons/ai";
import PriceCard from "./StyleCards/PriceCard";
import NewOrderNav from "./NewOrderNav";
import Tooltip from "@mui/material/Tooltip";

// Validation Schema
const validationSchema = Yup.object({
  selectedStyle: Yup.string().required("A style is required"),
  imageQuantity: Yup.number().required("Number of images is required"),
  driveLink: Yup.string().required("Drive link is required"),
  // imageQuantity: Yup.string().when("additionalEdits.culling", {
  //   is: true,
  //   then: Yup.string().required("Culling Input 1 is required"),
  // }),
  // cullDownTotalImages: Yup.string().when("additionalEdits.culling", {
  //   is: true,
  //   then: Yup.string().required("Culling Input 2 is required"),
  // }),
});

const PickStyle = ({ onPickStyleSubmit, successAlert }) => {
  const [showCullingInputs, setShowCullingInputs] = useState(false);
  const [showSkinRetouchingInputs, setshowSkinRetouchingInputsInputs] =
    useState(false);

  const [isBasicColorSelected, setIsBasicColorSelected] = useState(false);

  const handleCullingChange = (e, setFieldValue) => {
    const isChecked = e.target.checked;
    setFieldValue("additionalEdits.culling", isChecked);
    setShowCullingInputs(isChecked);
  };
  const handleSkinRetouchingChange = (e, setFieldValue) => {
    const isChecked = e.target.checked;
    setFieldValue("additionalEdits.skinRetouching", isChecked);
    setshowSkinRetouchingInputsInputs(isChecked);
  };

  // culling skinretuching and additional info => Image Quantity showing

  const [firstSelected, setFirstSelected] = useState("");
  const [showInput, setShowInput] = useState({
    culling: false,
    skinRetouching: false,
    default: true, // Show input in default section initially
  });

  const handleCheckboxChange = (name, checked, setFieldValue, values) => {
    setFieldValue(`additionalEdits.${name}`, checked);

    if (checked && !firstSelected) {
      setFirstSelected(name);
      setShowInput({
        culling: name === "culling",
        skinRetouching: name === "skinRetouching",
        default: false,
      });
    } else if (!checked && firstSelected === name) {
      setFirstSelected("");
      if (name === "culling" && values.additionalEdits.skinRetouching) {
        setFirstSelected("skinRetouching");
        setShowInput({
          culling: false,
          skinRetouching: true,
          default: false,
        });
      } else if (name === "skinRetouching" && values.additionalEdits.culling) {
        setFirstSelected("culling");
        setShowInput({
          culling: true,
          skinRetouching: false,
          default: false,
        });
      } else {
        setShowInput({
          culling: false,
          skinRetouching: false,
          default: true,
        });
      }
    } else if (checked) {
      if (firstSelected === "culling" && name === "skinRetouching") {
        setShowInput({
          culling: true,
          skinRetouching: false,
          default: false,
        });
      } else if (firstSelected === "skinRetouching" && name === "culling") {
        setShowInput({
          culling: false,
          skinRetouching: true,
          default: false,
        });
      }
    }
  };

  // culling skinretuching and additional info => Image Quantity showing .end

  return (
    <div>
      <div className="py-[40px]">
        <NewOrderNav />
      </div>
      <div className="flex">
        <div className="">
          <Formik
            initialValues={{
              selectedStyle: "",
              additionalStyle: [],
              additionalEdits: {
                culling: false,
                skinRetouching: false,
                previewEdits: false,
              },
              imageQuantity: 5000,
              driveLink: "",
              cullDownTotalImages: "",
              imageSelectionMethodCulling: "",
              imageSelectionMethodSkinRetouching: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              onPickStyleSubmit();
              successAlert();
              console.log(values);
            }}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <div>
                  <p className="text-[32px] font-bold text-[#868686] pb-36">
                    Pick a style
                  </p>
                </div>
                <div className="pr-[100px]">
                  <Grid container spacing={5}>
                    <Grid item md={12} lg={6} xl={4}>
                      <Field
                        name="selectedStyle"
                        type="radio"
                        value="Classic Film Tones"
                        as={StyleCard}
                        title="Classic Film Tones"
                        li_1="Light & Airy Tone"
                        li_2="Slightly Faded Whites & Blacks"
                        li_3="Desaturated Grains"
                        selectedValue={
                          values.selectedStyle === "Classic Film Tones"
                        }
                        handleChange={(e) => {
                          setFieldValue("selectedStyle", e.target.value);
                          setIsBasicColorSelected(false);
                        }}
                      />
                    </Grid>
                    <Grid item md={12} lg={6} xl={4}>
                      <Field
                        name="selectedStyle"
                        type="radio"
                        value="Dark & Moody Vibes"
                        as={StyleCard}
                        title="Dark & Moody Vibes"
                        li_1="Light & Airy Tone"
                        li_2="Slightly Faded Whites & Blacks"
                        li_3="Desaturated Grains"
                        selectedValue={
                          values.selectedStyle === "Dark & Moody Vibes"
                        }
                        handleChange={(e) => {
                          setFieldValue("selectedStyle", e.target.value);
                          setIsBasicColorSelected(false);
                        }}
                      />
                    </Grid>
                    <Grid item md={12} lg={6} xl={4}>
                      <Field
                        name="selectedStyle"
                        type="radio"
                        value="Bright & Airy Freshness"
                        as={StyleCard}
                        title="Bright & Airy Freshness"
                        li_1="Light & Airy Tone"
                        li_2="Slightly Faded Whites & Blacks"
                        li_3="Desaturated Grains"
                        selectedValue={
                          values.selectedStyle === "Bright & Airy Freshness"
                        }
                        handleChange={(e) => {
                          setFieldValue("selectedStyle", e.target.value);
                          setIsBasicColorSelected(false);
                        }}
                      />
                    </Grid>
                    <Grid item md={12} lg={6} xl={4}>
                      <Field
                        name="selectedStyle"
                        type="radio"
                        value="Basic Color & Contrast Correction"
                        as={StyleCard}
                        title="Basic Color & Contrast Correction"
                        li_1="Light & Airy Tone"
                        li_2="Slightly Faded Whites & Blacks"
                        li_3="Desaturated Grains"
                        warning_text="Skin Retouching Not Available"
                        selectedValue={
                          values.selectedStyle ===
                          "Basic Color & Contrast Correction"
                        }
                        handleChange={(e) => {
                          setFieldValue("selectedStyle", e.target.value);
                          setIsBasicColorSelected(true);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <div className="mt-60">
                    <div>
                      <p className="text-[32px] font-bold text-[#868686] py-36">
                        Additional Color Styles
                      </p>
                    </div>
                    <div>
                      <Field
                        name="additionalStyle"
                        type="checkbox"
                        value="Monochrome Melodies"
                        as={StyleCard}
                        title="Monochrome Melodies"
                        li_1="Light & Airy Tone"
                        li_2="Slightly Faded Whites & Blacks"
                        li_3="Desaturated Grains"
                        selectedValue={values.additionalStyle.includes(
                          "Monochrome Melodies"
                        )}
                        handleChange={(e) => {
                          const set = new Set(values.additionalStyle);
                          if (set.has(e.target.value)) {
                            set.delete(e.target.value);
                          } else {
                            set.add(e.target.value);
                          }
                          setFieldValue("additionalStyle", Array.from(set));
                        }}
                      />
                    </div>
                  </div>
                  {/* ==================== Additional Edits ==================== */}
                  <div className="mt-60">
                    <div>
                      <p className="text-[32px] font-bold text-[#868686] py-36">
                        Additional Edits
                      </p>
                    </div>

                    {/* -------------------- Culling -------------------- */}
                    <div className="flex items-center">
                      <label
                        htmlFor="cullingCheckbox"
                        className="cursor-pointer flex items-center"
                      >
                        <Field
                          className="cursor-pointer"
                          style={{ width: "20px", height: "20px" }}
                          type="checkbox"
                          name="additionalEdits.culling"
                          id="cullingCheckbox"
                          checked={values.additionalEdits.culling}
                          // onChange={(e) => handleCullingChange(e, setFieldValue)}
                          onChange={(e) => {
                            handleCheckboxChange(
                              "culling",
                              e.target.checked,
                              setFieldValue,
                              values
                            );
                            handleCullingChange(e, setFieldValue);
                          }}
                        />
                        <span className="pl-5 text-[20px] font-bold">
                          Culling
                        </span>
                      </label>
                    </div>
                    {showInput.culling && (
                      <div className="mt-20">
                        <div className="">
                          <label
                            htmlFor="imageQuantity"
                            className="font-semibold"
                            style={{
                              lineHeight: "20px",
                              fontSize: "14px",
                            }}
                          >
                            How many images are you sending us?
                          </label>
                          <Field
                            type="number"
                            name="imageQuantity"
                            placeholder=""
                            className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="imageQuantity"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                      </div>
                    )}
                    {showCullingInputs && (
                      <div className="mt-20">
                        <div className="mt-16">
                          <label
                            htmlFor="cullDownTotalImages"
                            className="font-semibold"
                            style={{
                              lineHeight: "20px",
                              fontSize: "14px",
                            }}
                          >
                            How many images should we cull down to?
                          </label>
                          <Field
                            type="number"
                            name="cullDownTotalImages"
                            placeholder=""
                            className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
                          />
                          <ErrorMessage
                            name="cullDownTotalImages"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                        <div className="mt-16">
                          <label
                            htmlFor="imageSelectionMethodCulling"
                            className="font-semibold"
                            style={{
                              lineHeight: "20px",
                              fontSize: "14px",
                            }}
                          >
                            How would you like us to select your images?
                          </label>
                          <Field
                            as="select"
                            name="imageSelectionMethodCulling"
                            className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
                          >
                            <option value="" label="Select method" />
                            <option value="Star" label="Star" />
                            <option value="Color" label="Color" />
                            {/* Add more options as needed */}
                          </Field>
                          <ErrorMessage
                            name="imageSelectionMethodCulling"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                      </div>
                    )}

                    {/* --------------------  Skin Retouching -------------------- */}
                    {!isBasicColorSelected && (
                      <div className="flex items-center mt-[30px]">
                        <label
                          htmlFor="skinRetouchingCheckbox"
                          className="cursor-pointer flex items-center"
                        >
                          <Field
                            className="cursor-pointer"
                            style={{ width: "20px", height: "20px" }}
                            name="additionalEdits.skinRetouching"
                            type="checkbox"
                            id="skinRetouchingCheckbox"
                            checked={values.additionalEdits.skinRetouching}
                            // onChange={(e) =>
                            //   handleSkinRetouchingChange(e, setFieldValue)
                            // }
                            onChange={(e) => {
                              handleCheckboxChange(
                                "skinRetouching",
                                e.target.checked,
                                setFieldValue,
                                values
                              );
                              handleSkinRetouchingChange(e, setFieldValue);
                            }}
                          />
                          <span className="pl-5 text-[20px] font-bold">
                            Skin Retouching
                          </span>
                        </label>
                      </div>
                    )}
                    {/* showSkinRetouchingInputs */}
                    {showInput.skinRetouching && (
                      <div className="">
                        <label
                          htmlFor="imageQuantity"
                          className="font-semibold"
                          style={{
                            lineHeight: "20px",
                            fontSize: "14px",
                          }}
                        >
                          How many images are you sending us?
                        </label>
                        <Field
                          type="number"
                          name="imageQuantity"
                          placeholder=""
                          className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
                        />
                        <ErrorMessage
                          name="imageQuantity"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    )}
                    {showSkinRetouchingInputs && !isBasicColorSelected && (
                      <div className="mt-20">
                        <div className="mt-16">
                          <label
                            htmlFor="imageSelectionMethodSkinRetouching"
                            className="font-semibold"
                            style={{
                              lineHeight: "20px",
                              fontSize: "14px",
                            }}
                          >
                            How would you like us to select the images for skin
                            retouching?
                          </label>
                          <Field
                            as="select"
                            name="imageSelectionMethodSkinRetouching"
                            className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
                          >
                            <option value="" label="Select method" />
                            <option value="allImages" label="All Images" />
                            <option
                              value="portraitsOnly"
                              label="Portraits Only"
                            />
                            <option
                              value="tenPercent"
                              label="Best 10% of Culled Down/Final Editable Images"
                            />
                            {/* Add more options as needed */}
                          </Field>
                          <ErrorMessage
                            name="imageSelectionMethodSkinRetouching"
                            component="div"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                      </div>
                    )}

                    {/* -------------------- Preview Edits -------------------- */}
                    <div className="flex items-center mt-[30px]">
                      <label
                        htmlFor="previewEditsCheckbox"
                        className="cursor-pointer flex items-center"
                      >
                        <Field
                          className="cursor-pointer"
                          style={{ width: "20px", height: "20px" }}
                          name="additionalEdits.previewEdits"
                          type="checkbox"
                          id="previewEditsCheckbox"
                          checked={values.additionalEdits.previewEdits}
                          onChange={(e) =>
                            setFieldValue(
                              "additionalEdits.previewEdits",
                              e.target.checked
                            )
                          }
                        />
                        <span className="pl-5 text-[20px] font-bold">
                          Preview Edits
                        </span>
                      </label>
                      <Tooltip
                        color="red"
                        placement="right"
                        // title="The Preview Edit service provides a preview of approximately 10% of the culled or final editable images, for your consideration and approval."
                        title={
                          <span style={{ fontSize: "16px" }} className="">
                            The Preview Edit service provides a preview of
                            approximately 10% of the culled or final editable
                            images, for your consideration and approval.
                          </span>
                        }
                        componentsProps={{
                          tooltip: {
                            sx: {
                              fontSize: "16px",
                              backgroundColor: "white", // Customize the background color
                              color: "black", // Customize the text color
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                              padding: "20px",
                              borderRadius: "20px",
                            },
                          },
                        }}
                      >
                        <button
                          onClick={() => {
                            console.log("info icon clicked");
                          }}
                        >
                          <AiFillInfoCircle className="ml-8" />
                        </button>
                      </Tooltip>
                    </div>
                    {/* <div className="flex items-center mt-[30px]">
                      <label
                        htmlFor="previewEditsCheckbox"
                        className="cursor-pointer flex items-center"
                      >
                        <Field
                          className="cursor-pointer"
                          style={{ width: "20px", height: "20px" }}
                          name="additionalEdits.previewEdits"
                          type="checkbox"
                          id="previewEditsCheckbox"
                          checked={values.additionalEdits.previewEdits}
                          onChange={(e) =>
                            setFieldValue(
                              "additionalEdits.previewEdits",
                              e.target.checked
                            )
                          }
                        />
                        <span className="pl-5 text-[20px] font-bold">
                          Preview Edits
                        </span>
                      </label>
                      <button
                        onClick={() => {
                          console.log("info icon clicked");
                        }}
                      >
                        <AiFillInfoCircle className="ml-8" />
                      </button>
                    </div> */}
                  </div>
                  {/* ==================== Additional Info ==================== */}
                  <div className="my-60">
                    <div>
                      <p className="text-[32px] font-bold text-[#868686] pt-36">
                        Additional Info
                      </p>
                    </div>
                    {/* showCullingInputs */}
                    {/* {!showCullingInputs && !showSkinRetouchingInputs && ( */}
                    {showInput.default && (
                      <div className="pt-36">
                        <label
                          htmlFor="imageQuantity"
                          className="font-semibold"
                          style={{
                            lineHeight: "20px",
                            fontSize: "14px",
                          }}
                        >
                          How many images are you sending us?
                        </label>
                        <Field
                          type="number"
                          name="imageQuantity"
                          placeholder=""
                          className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
                        />
                        <ErrorMessage
                          name="imageQuantity"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    )}
                    <div className="mt-32">
                      <label
                        htmlFor="driveLink"
                        className="font-semibold"
                        style={{
                          lineHeight: "20px",
                          fontSize: "14px",
                        }}
                      >
                        Google Drive link with your images
                      </label>
                      <Field
                        type="text"
                        name="driveLink"
                        placeholder="Paste your URL here"
                        className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="driveLink"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>
                  <div className="w-[400px] text-[12px] font-medium">
                    <p>Please ensure that:</p>
                    <div className="pl-5">
                      <div className="flex">
                        <p>1.</p>
                        <p className="pl-8">
                          All the images have finished uploading in the drive
                          before placing the order.
                        </p>
                      </div>
                      <div className="flex">
                        <p>2.</p>
                        <p className="pl-5">
                          Your images are either RAW photos, JPG photos, or
                          Smart Preview Enabled Lightroom Catalogs.
                        </p>
                      </div>
                    </div>

                    <p>
                      Find out how to create your own Smart Preview Enabled
                      Lightroom Catalogs{" "}
                      <Link
                        to="#"
                        className=""
                        style={{ textDecoration: "none" }}
                      >
                        here
                      </Link>
                      .
                    </p>
                  </div>
                  <div className="pt-32 pb-24">
                    <button
                      type="submit"
                      className="w-[332px] h-[38px] py-2  px-4 text-white rounded-md bg-[#146ef5ef] hover:bg-[#0066ff] font-[20px]"
                    >
                      Place Order
                    </button>
                  </div>
                  {errors.selectedStyle && touched.selectedStyle ? (
                    <div style={{ color: "red" }}>{errors.selectedStyle}</div>
                  ) : null}
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div
          className=""
          style={{ position: "sticky", top: 78, alignSelf: "flex-start" }}
        >
          <PriceCard />
        </div>
      </div>
    </div>
  );
};

export default PickStyle;
