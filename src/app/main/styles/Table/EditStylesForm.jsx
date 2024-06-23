import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required("Required"),
  stylePrice: Yup.string().required("Required"),
  styleThreshold: Yup.string().required("Required"),
  cullingPrice: Yup.string().required("Required"),
  cullingThreshold: Yup.string().required("Required"),
  skinRetouchPrice: Yup.string().required("Required"),
  skinRetouchThreshold: Yup.string().required("Required"),
  previewEditPrice: Yup.string().required("Required"),
  previewEditThreshold: Yup.string().required("Required"),
});

const EditStylesForm = ({ onClose }) => {
  return (
    <div className="p-24 bg-white shadow-md w-[390px] max-h-[80vh] overflow-y-auto">
      <Formik
        initialValues={{
          categoryName: "",
          stylePrice: "",
          styleThreshold: "",
          cullingPrice: "",
          cullingThreshold: "",
          skinRetouchPrice: "",
          skinRetouchThreshold: "",
          previewEditPrice: "",
          previewEditThreshold: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
        className="rounded-xl"
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 ">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-[#868686]">Edit Category</p>
              <button onClick={onClose}>
                <IoClose size={24} />
              </button>
            </div>
            <div className="form-group">
              <label
                htmlFor="categoryName"
                className="block text-md font-medium text-gray-700 mt-16"
              >
                Category Name
              </label>
              <Field
                type="text"
                name="categoryName"
                placeholder="Category Name"
                className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="categoryName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="stylePrice"
                className="block text-md font-medium text-gray-700 mt-16"
              >
                Style Price ($)
              </label>
              <Field
                type="text"
                name="stylePrice"
                placeholder="Price in USD"
                className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="stylePrice"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="styleThreshold"
                className="block text-md font-medium text-gray-700 mt-16"
              >
                Style Threshold
              </label>
              <Field
                type="text"
                name="styleThreshold"
                placeholder="Enter the minimum required for this service"
                className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="styleThreshold"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="cullingPrice"
                className="block text-md font-medium text-gray-700 mt-16"
              >
                Culling Price ($)
              </label>
              <Field
                type="text"
                name="cullingPrice"
                placeholder="Price in USD"
                className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="cullingPrice"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="cullingThreshold"
                className="block text-md font-medium text-gray-700 mt-16"
              >
                Culling Threshold
              </label>
              <Field
                type="text"
                name="cullingThreshold"
                placeholder="Enter the minimum required for this service"
                className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="cullingThreshold"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="skinRetouchPrice"
                className="block text-md font-medium text-gray-700 mt-16"
              >
                Skin Retouch Price ($)
              </label>
              <Field
                type="text"
                name="skinRetouchPrice"
                placeholder="Price in USD"
                className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="skinRetouchPrice"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="skinRetouchThreshold"
                className="block text-md font-medium text-gray-700 mt-16"
              >
                Skin Retouch Threshold
              </label>
              <Field
                type="text"
                name="skinRetouchThreshold"
                placeholder="Enter the minimum required for this service"
                className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="skinRetouchThreshold"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="previewEditPrice"
                className="block text-md font-medium text-gray-700 mt-16"
              >
                Preview Edit Price ($)
              </label>
              <Field
                type="text"
                name="previewEditPrice"
                placeholder="Price in USD"
                className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="previewEditPrice"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="previewEditThreshold"
                className="block text-md font-medium text-gray-700 mt-16"
              >
                Preview Edit Threshold
              </label>
              <Field
                type="text"
                name="previewEditThreshold"
                placeholder="Enter the minimum required for this service"
                className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="previewEditThreshold"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="pt-32 pb-24">
              <button
                type="submit"
                disabled={isSubmitting}
                // onClick={onClose}
                className="w-full h-[38px] py-2  px-4 bg-[#146ef5ef] hover:bg-[#0066ff] text-white rounded-md "
              >
                Save Changes
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditStylesForm;
