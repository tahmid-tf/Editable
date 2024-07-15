import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoClose } from 'react-icons/io5';
import { Modal } from '@mui/material';
import { useGetAllCategoriesQuery } from '../../categories/CategoriesApi';
import { useCreateStyleMutation } from '../AdminStylePageApi';

const validationSchema = Yup.object().shape({
	style_name: Yup.string().required('Required'),
	description: Yup.string().required('Required'),
	upload_image: Yup.mixed().required('Required'),
	categories: Yup.array().of(Yup.string()).required('Required'),
	additional_style: Yup.string().required('Required')
});

const CreateStylesForm = ({ openModal, handleCloseModal, successAlert }) => {
	const [imagePreview, setImagePreview] = useState(null);
	const { data } = useGetAllCategoriesQuery({ page: 1, rowPerPage: 10000000 });
	const [createStyle] = useCreateStyleMutation();

	const handleImageChange = (event, setFieldValue) => {
		const file = event.target.files[0];
		if (file) {
			setImagePreview(URL.createObjectURL(file));
			setFieldValue('upload_image', file);
		}
	};

	const handleCategoriesChange = (setFieldValue, values) => (event) => {
		const { checked, value } = event.target;
		const numberValue = Number(value);

		if (checked) {
			setFieldValue('categories', [...values.categories, numberValue]);
		} else {
			setFieldValue(
				'categories',
				values.categories.filter((id) => id !== numberValue)
			);
		}
	};

	return (
		<Modal
			open={openModal}
			onClose={handleCloseModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="flex justify-center items-center"
		>
			<div className="bg-white flex justify-center items-center">
				<div className="p-24 bg-white shadow-md w-[390px] max-h-[80vh] overflow-y-auto">
					<Formik
						initialValues={{
							style_name: '',
							description: '',
							upload_image: null,
							categories: [],
							additional_style: '',
							culling: 'no',
							skin_retouch: 'no',
							preview_edits: 'no'
						}}
						validationSchema={validationSchema}
						onSubmit={async (values) => {
							console.log(values);
							const response = await createStyle(values);
							if (response.data) {
								successAlert();
								handleCloseModal();
							}
						}}
						className="rounded-xl"
					>
						{({ setFieldValue, isSubmitting, values }) => {
							return (
								<Form className="space-y-4">
									<div className="flex items-center justify-between">
										<p className="text-2xl font-bold text-[#868686]">Create Style</p>
										<button onClick={handleCloseModal}>
											<IoClose size={24} />
										</button>
									</div>
									<div className="form-group">
										<label
											htmlFor="style_name"
											className="block text-md text-black font-semibold mt-40"
										>
											Style Name
										</label>
										<Field
											type="text"
											name="style_name"
											placeholder="Style Name"
											className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
										/>
										<ErrorMessage
											name="style_name"
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
											htmlFor="upload_image"
											className="block text-md font-semibold text-black mt-16"
										>
											Upload Image
										</label>
										<div className="mt-10">
											<button
												type="button"
												className="w-full h-[38px] py-2 px-4 text-white rounded-md bg-[#E4E4E4] hover:bg-[#c5c5c5a2]"
												onClick={() => document.getElementById('fileInput').click()}
											>
												<span className="text-[#8B8B8B]">File Upload</span>
											</button>
											<input
												id="fileInput"
												type="file"
												name="upload_image"
												accept="image/*"
												onChange={(event) => handleImageChange(event, setFieldValue)}
												className="hidden"
											/>
										</div>
										<ErrorMessage
											name="upload_image"
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
											Select the Categories where you want this style available for user
										</label>
										<div className="grid grid-cols-2 gap-10 mt-10">
											{data?.data?.data?.map((categoryInfo, i) => (
												<label
													key={i}
													className="flex items-center space-x-2"
												>
													<Field
														type="checkbox"
														name="categories"
														value={categoryInfo?.id}
														onChange={handleCategoriesChange(setFieldValue, values)}
													/>
													<span className="pl-5">{categoryInfo?.category_name}</span>
												</label>
											))}
										</div>
										<ErrorMessage
											name="categories"
											component="div"
											className="text-red-500 text-xs mt-1"
										/>
									</div>

									<div className="form-group">
										<label
											htmlFor="additional_style"
											className="block text-md font-semibold text-black mt-16"
										>
											Is this an additional style?
										</label>
										<div className="grid grid-cols-2 gap-10 mt-10">
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="additional_style"
													value="yes"
												/>
												<span className="pl-5">Yes</span>
											</label>
											<label className="flex items-center space-x-2">
												<Field
													type="radio"
													name="additional_style"
													value="no"
												/>
												<span className="pl-5">No</span>
											</label>
										</div>
										<ErrorMessage
											name="additional_style"
											component="div"
											className="text-red-500 text-xs mt-1"
										/>
									</div>

									<div className="form-group">
										<label
											htmlFor="culling"
											className="block text-md font-semibold text-black mt-16"
										>
											Are these available for this style?
										</label>
										<div className="grid grid-cols-2 gap-10 mt-10">
											<label className="flex items-center space-x-2">
												<Field
													type="checkbox"
													name="culling"
													onChange={(e) => {
														setFieldValue(
															'culling',
															values?.culling === 'no' ? 'yes' : 'no'
														);
													}}
													checked={values?.culling === 'yes'}
												/>
												<span className="pl-5">Culling</span>
											</label>
											<label className="flex items-center space-x-2">
												<Field
													type="checkbox"
													name="skin_retouch"
													onChange={(e) => {
														setFieldValue(
															'skin_retouch',
															values?.skin_retouch === 'no' ? 'yes' : 'no'
														);
													}}
													checked={values?.skin_retouch === 'yes'}
												/>
												<span className="pl-5">Skin Retouch</span>
											</label>
											<label className="flex items-center space-x-2">
												<Field
													type="checkbox"
													name="preview_edits"
													onChange={(e) => {
														setFieldValue(
															'preview_edits',
															values?.preview_edits === 'no' ? 'yes' : 'no'
														);
													}}
													checked={values?.preview_edits === 'yes'}
												/>
												<span className="pl-5">Preview Edits</span>
											</label>
										</div>
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
							);
						}}
					</Formik>
				</div>
			</div>
		</Modal>
	);
};

export default CreateStylesForm;
