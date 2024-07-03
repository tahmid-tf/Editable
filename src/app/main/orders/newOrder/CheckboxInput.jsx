import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const CheckboxInput = () => {
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

  return (
    <Formik
      initialValues={{
        additionalEdits: {
          culling: false,
          skinRetouching: false,
        },
        imageQuantity: "",
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
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
                onChange={(e) =>
                  handleCheckboxChange(
                    "culling",
                    e.target.checked,
                    setFieldValue,
                    values
                  )
                }
              />
              <span className="pl-5 text-[20px] font-bold">Culling</span>
            </label>
            {showInput.culling && (
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
          </div>
          <div className="flex items-center">
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
                  handleCheckboxChange(
                    "skinRetouching",
                    e.target.checked,
                    setFieldValue,
                    values
                  )
                }
              />
              <span className="pl-5 text-[20px] font-bold">
                Skin Retouching
              </span>
            </label>
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
          </div>
          <div>
            <label>Default Section</label>
            {showInput.default && (
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
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default CheckboxInput;
