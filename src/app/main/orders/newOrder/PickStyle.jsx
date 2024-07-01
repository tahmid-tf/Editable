import React, { useState } from "react";
import StyleCard from "./StyleCards/StyleCard";
import { Grid } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { AiFillInfoCircle } from "react-icons/ai";
import PriceCard from "./StyleCards/PriceCard";

// Validation Schema
const validationSchema = Yup.object({
  selectedStyle: Yup.string().required("A style is required"),
  infoTotalImages: Yup.number().required("Number of images is required"),
  driveLink: Yup.string().required("Drive link is required"),
  // cullingTotalImages: Yup.string().when("additionalEdits.culling", {
  //   is: true,
  //   then: Yup.string().required("Culling Input 1 is required"),
  // }),
  // cullDownTotalImages: Yup.string().when("additionalEdits.culling", {
  //   is: true,
  //   then: Yup.string().required("Culling Input 2 is required"),
  // }),
});

const PickStyle = () => {
  const [showCullingInputs, setShowCullingInputs] = useState(false);

  const handleCullingChange = (e, setFieldValue) => {
    const isChecked = e.target.checked;
    setFieldValue("additionalEdits.culling", isChecked);
    setShowCullingInputs(isChecked);
  };

  return (
    <div className="flex">
      <div>
        <Formik
          initialValues={{
            selectedStyle: "",
            additionalStyle: [],
            additionalEdits: {
              culling: false,
              skinRetouching: false,
              previewEdits: false,
            },
            infoTotalImages: "",
            driveLink: "",
            cullingTotalImages: "",
            cullDownTotalImages: "",
            imageSelectionMethod: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
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
              <div className="">
                <Grid container spacing={5}>
                  <Grid item md={12} xl={4}>
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
                      handleChange={(e) =>
                        setFieldValue("selectedStyle", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item md={12} xl={4}>
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
                      handleChange={(e) =>
                        setFieldValue("selectedStyle", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item md={12} xl={4}>
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
                      handleChange={(e) =>
                        setFieldValue("selectedStyle", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item md={12} xl={4}>
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
                      handleChange={(e) =>
                        setFieldValue("selectedStyle", e.target.value)
                      }
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
                <div className="mt-60">
                  <div>
                    <p className="text-[32px] font-bold text-[#868686] py-36">
                      Additional Edits
                    </p>
                  </div>

                  <div className="flex items-center">
                    <label
                      htmlFor="cullingCheckbox"
                      className="cursor-pointer flex items-center"
                    >
                      <Field
                        className="cursor-pointer"
                        style={{ width: "20px", height: "20px" }}
                        name="additionalEdits.culling"
                        type="checkbox"
                        id="cullingCheckbox"
                        checked={values.additionalEdits.culling}
                        onChange={(e) => handleCullingChange(e, setFieldValue)}
                      />
                      <span className="pl-5 text-[20px] font-bold">
                        Culling
                      </span>
                    </label>
                  </div>

                  {showCullingInputs && (
                    <div className="mt-10">
                      <div className="mt-10">
                        <label
                          htmlFor="cullingTotalImages"
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
                          name="cullingTotalImages"
                          placeholder=""
                          className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
                        />
                        <ErrorMessage
                          name="cullingTotalImages"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
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
                          htmlFor="imageSelectionMethod"
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
                          name="imageSelectionMethod"
                          className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
                        >
                          <option value="" label="Select method" />
                          <option value="Star" label="Star" />
                          <option value="Color" label="Color" />
                          {/* Add more options as needed */}
                        </Field>
                        <ErrorMessage
                          name="imageSelectionMethod"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      {/* <div className="mt-16">
                        <label
                          htmlFor="imageSelectionMethod"
                          className="font-semibold"
                          style={{
                            lineHeight: "20px",
                            fontSize: "14px",
                          }}
                        >
                          How would you like us to select your images?
                        </label>
                        <Field
                          type="number"
                          name="imageSelectionMethod"
                          placeholder=""
                          className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
                        />
                        <ErrorMessage
                          name="imageSelectionMethod"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div> */}
                    </div>
                  )}

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
                        onChange={(e) =>
                          setFieldValue(
                            "additionalEdits.skinRetouching",
                            e.target.checked
                          )
                        }
                      />
                      <span className="pl-5 text-[20px] font-bold">
                        Skin Retouching
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center">
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
                  </div>
                </div>
                <div className="my-60">
                  <div>
                    <p className="text-[32px] font-bold text-[#868686] pt-36">
                      Additional Info
                    </p>
                  </div>
                  {/* showCullingInputs */}
                  {!showCullingInputs && (
                    <div className="pt-36">
                      <label
                        htmlFor="infoTotalImages"
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
                        name="infoTotalImages"
                        placeholder=""
                        className="mt-10 p-10 block w-[332px] h-[38px] border border-gray-300 rounded-md"
                      />
                      <ErrorMessage
                        name="infoTotalImages"
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
                        Your images are either RAW photos, JPG photos, or Smart
                        Preview Enabled Lightroom Catalogs.
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
      <div>
        <PriceCard />
      </div>
    </div>
  );
};

export default PickStyle;
