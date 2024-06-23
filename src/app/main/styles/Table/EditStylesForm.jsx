import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";

const validationSchema = Yup.object().shape({
  styleName: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  image: Yup.mixed().required("Required"),
  categories: Yup.array().of(Yup.string()).required("Required"),
  additionalStyle: Yup.string().required("Required"),
  availableFor: Yup.array().of(Yup.string()).required("Required"),
});

const EditStylesForm = ({ onClose, successAlert }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setFieldValue("image", file);
    }
  };

  return (
    <div className="p-24 bg-white shadow-md w-[390px] max-h-[80vh] overflow-y-auto">
      <Formik
        initialValues={{
          styleName: "Automobiles",
          description:
            "Amazing for cars, buses, trucks, ships and even aeroplanes!",
          image: null,
          categories: [],
          additionalStyle: "",
          availableFor: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          successAlert();
          onClose();
          console.log(values);
        }}
        className="rounded-xl"
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-[#868686]">Edit Style</p>
              <button onClick={onClose}>
                <IoClose size={24} />
              </button>
            </div>
            <div className="form-group">
              <label
                htmlFor="styleName"
                className="block text-md text-black font-semibold mt-40"
              >
                Style Name
              </label>
              <Field
                type="text"
                name="styleName"
                placeholder="Style Name"
                className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="styleName"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="description"
                className="block text-md font-semibold text-black mt-16"
              >
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                rows="4"
                className="mt-10 p-10 block w-full border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="image"
                className="block text-md font-semibold text-black mt-16"
              >
                Upload Image
              </label>
              <div className="mt-10">
                <button
                  type="button"
                  className="w-full h-[38px] py-2 px-4 text-white rounded-md bg-[#E4E4E4] hover:bg-[#c5c5c5a2]"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <span className="text-[#8B8B8B]">File Upload</span>
                </button>
                <input
                  id="fileInput"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(event) => handleImageChange(event, setFieldValue)}
                  className="hidden"
                />
              </div>
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {imagePreview && (
              <div className="mt-10">
                <img
                  src={imagePreview}
                  alt="Selected"
                  className="w-[140px] object-cover rounded-md"
                />
              </div>
            )}

            <div className="form-group">
              <label
                htmlFor="categories"
                className="block text-md font-semibold text-black mt-16"
              >
                Select the Categories where you want this style available for
                user
              </label>
              <div className="grid grid-cols-2 gap-10 mt-10">
                <label className="flex items-center space-x-2">
                  <Field type="checkbox" name="categories" value="wedding" />
                  <span className="pl-5">Wedding</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Field
                    type="checkbox"
                    name="categories"
                    value="headshotPortraits"
                  />
                  <span className="pl-5">Headshot Portraits</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Field
                    type="checkbox"
                    name="categories"
                    value="travelPhotos"
                  />
                  <span className="pl-5">Travel Photos</span>
                </label>
              </div>
              <ErrorMessage
                name="categories"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="additionalStyle"
                className="block text-md font-semibold text-black mt-16"
              >
                Is this an additional style?
              </label>
              <div className="grid grid-cols-2 gap-10 mt-10">
                <label className="flex items-center space-x-2">
                  <Field type="radio" name="additionalStyle" value="yes" />
                  <span className="pl-5">Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Field type="radio" name="additionalStyle" value="no" />
                  <span className="pl-5">No</span>
                </label>
              </div>
              <ErrorMessage
                name="additionalStyle"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="availableFor"
                className="block text-md font-semibold text-black mt-16"
              >
                Are these available for this style?
              </label>
              <div className="grid grid-cols-2 gap-10 mt-10">
                <label className="flex items-center space-x-2">
                  <Field type="checkbox" name="availableFor" value="culling" />
                  <span className="pl-5">Culling</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Field
                    type="checkbox"
                    name="availableFor"
                    value="skinRetouch"
                  />
                  <span className="pl-5">Skin Retouch</span>
                </label>
                <label className="flex items-center space-x-2">
                  <Field
                    type="checkbox"
                    name="availableFor"
                    value="previewEdits"
                  />
                  <span className="pl-5">Preview Edits</span>
                </label>
              </div>
              <ErrorMessage
                name="availableFor"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="pt-32 pb-24">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-[38px] py-2 px-4 text-white rounded-md bg-[#146ef5ef] hover:bg-[#0066ff]"
              >
                Create Style
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditStylesForm;
