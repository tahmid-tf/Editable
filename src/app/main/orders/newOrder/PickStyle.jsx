import React from "react";
import StyleCard from "./StyleCards/StyleCard";
import { Grid, FormControl, RadioGroup } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Validation Schema
const validationSchema = Yup.object({
  selectedStyle: Yup.string().required("A style is required"),
});

const PickStyle = () => {
  return (
    <Formik
      initialValues={{ selectedStyle: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, errors, touched, handleChange, setFieldValue }) => (
        <Form>
          <div>
            <p className="text-[32px] font-bold text-[#868686] py-36">
              Pick a style
            </p>
          </div>
          <div className="">
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="style"
                name="selectedStyle"
                value={values.selectedStyle}
                onChange={handleChange}
              >
                <Grid container spacing={5}>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className="flex items-center justify-center"
                  >
                    <StyleCard
                      title="Classic Film Tones"
                      li_1="Light & Airy Tone"
                      li_2="Slightly Faded Whites & Blacks"
                      li_3="Desaturated Grains"
                      selectedValue={values.selectedStyle}
                      handleChange={(e) =>
                        setFieldValue("selectedStyle", e.target.value)
                      }
                      value="Classic Film Tones"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className="flex items-center justify-center"
                  >
                    <StyleCard
                      title="Dark & Moody Vibes"
                      li_1="Light & Airy Tone"
                      li_2="Slightly Faded Whites & Blacks"
                      li_3="Desaturated Grains"
                      selectedValue={values.selectedStyle}
                      handleChange={(e) =>
                        setFieldValue("selectedStyle", e.target.value)
                      }
                      value="Dark & Moody Vibes"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className="flex items-center justify-center"
                  >
                    <StyleCard
                      title="Bright & Airy Freshness"
                      li_1="Light & Airy Tone"
                      li_2="Slightly Faded Whites & Blacks"
                      li_3="Desaturated Grains"
                      selectedValue={values.selectedStyle}
                      handleChange={(e) =>
                        setFieldValue("selectedStyle", e.target.value)
                      }
                      value="Bright & Airy Freshness"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    className="flex items-center justify-center"
                  >
                    <StyleCard
                      title="Basic Color & Contrast Correction"
                      li_1="Light & Airy Tone"
                      li_2="Slightly Faded Whites & Blacks"
                      li_3="Desaturated Grains"
                      warning_text="Skin Retouching Not Available"
                      selectedValue={values.selectedStyle}
                      handleChange={(e) =>
                        setFieldValue("selectedStyle", e.target.value)
                      }
                      value="Basic Color & Contrast Correction"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
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
