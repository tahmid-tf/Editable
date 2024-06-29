import React from "react";
import StyleCard from "./StyleCards/StyleCard";
import { Grid } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Validation Schema
const validationSchema = Yup.object({
  selectedStyle: Yup.string().required("A style is required"),
});

const PickStyle = () => {
  return (
    <Formik
      initialValues={{
        selectedStyle: "",
        additionalStyle: [],
        additionalEdits: {
          culling: false,
          skinRetouching: false,
          previewEdits: false,
        },
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form>
          <div>
            <p className="text-[32px] font-bold text-[#868686] py-36">
              Pick a style
            </p>
          </div>
          <div className="">
            <Grid container spacing={5}>
              <Grid
                item
                xs={12}
                md={6}
                xl={4}
                className="flex items-center justify-center"
              >
                <Field
                  name="selectedStyle"
                  type="radio"
                  value="Classic Film Tones"
                  as={StyleCard}
                  title="Classic Film Tones"
                  li_1="Light & Airy Tone"
                  li_2="Slightly Faded Whites & Blacks"
                  li_3="Desaturated Grains"
                  selectedValue={values.selectedStyle === "Classic Film Tones"}
                  handleChange={(e) =>
                    setFieldValue("selectedStyle", e.target.value)
                  }
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                xl={4}
                className="flex items-center justify-center"
              >
                <Field
                  name="selectedStyle"
                  type="radio"
                  value="Dark & Moody Vibes"
                  as={StyleCard}
                  title="Dark & Moody Vibes"
                  li_1="Light & Airy Tone"
                  li_2="Slightly Faded Whites & Blacks"
                  li_3="Desaturated Grains"
                  selectedValue={values.selectedStyle === "Dark & Moody Vibes"}
                  handleChange={(e) =>
                    setFieldValue("selectedStyle", e.target.value)
                  }
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                xl={4}
                className="flex items-center justify-center"
              >
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
              <Grid
                item
                xs={12}
                md={6}
                xl={4}
                className="flex items-center justify-center"
              >
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
                    values.selectedStyle === "Basic Color & Contrast Correction"
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
              <label htmlFor="cullingCheckbox">
                <div
                  style={{ cursor: "pointer" }}
                  className="flex items-center"
                >
                  <Field
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                    name="additionalEdits.culling"
                    type="checkbox"
                    id="cullingCheckbox" // Added unique ID
                    checked={values.additionalEdits.culling}
                    onChange={(e) =>
                      setFieldValue("additionalEdits.culling", e.target.checked)
                    }
                  />
                  <p className="pl-10 text-[20px] font-bold">Culling</p>
                </div>
              </label>
              <label htmlFor="skinRetouchingCheckbox">
                <div
                  style={{ cursor: "pointer" }}
                  className="flex items-center"
                >
                  <Field
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                    name="additionalEdits.skinRetouching"
                    type="checkbox"
                    id="skinRetouchingCheckbox" // Added unique ID
                    checked={values.additionalEdits.skinRetouching}
                    onChange={(e) =>
                      setFieldValue(
                        "additionalEdits.skinRetouching",
                        e.target.checked
                      )
                    }
                  />
                  <p className="pl-10 text-[20px] font-bold">Skin Retouching</p>
                </div>
              </label>
              <label htmlFor="previewEditsCheckbox">
                <div
                  style={{ cursor: "pointer" }}
                  className="flex items-center"
                >
                  <Field
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                    name="additionalEdits.previewEdits"
                    type="checkbox"
                    id="previewEditsCheckbox" // Added unique ID
                    checked={values.additionalEdits.previewEdits}
                    onChange={(e) =>
                      setFieldValue(
                        "additionalEdits.previewEdits",
                        e.target.checked
                      )
                    }
                  />
                  <p className="pl-10 text-[20px] font-bold">Preview Edits</p>
                </div>
              </label>
            </div>
            {errors.selectedStyle && touched.selectedStyle ? (
              <div style={{ color: "red" }}>{errors.selectedStyle}</div>
            ) : null}
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default PickStyle;
