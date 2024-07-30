import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoClose } from 'react-icons/io5';
import { Box, CircularProgress, Modal } from '@mui/material';
import { useCreateCategoryMutation, useUpdateCategoryMutation } from '../CategoriesApi';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';
import { useAppDispatch } from 'app/store/hooks';
import GlobalSnackbar from 'app/shared-components/GlobalSnackbar/GlobalSnackbar';

const validationSchema = Yup.object().shape({
	category_name: Yup.string().required('Required'),
	style_price: Yup.string().required('Required'),
	style_threshold: Yup.number().required('Required'),
	culling_price: Yup.string().required('Required'),
	culling_threshold: Yup.number().required('Required'),
	skin_retouch_price: Yup.string().required('Required'),
	skin_retouch_threshold: Yup.number().required('Required'),
	preview_edit_price: Yup.string().required('Required'),
	preview_edit_threshold: Yup.number().required('Required')
});

const CreateCategoriesForm = ({ openModal, handleClose, editedRowData }) => {
	const [createCategory, { isLoading: createLoading }] = useCreateCategoryMutation();
	const [updateCategory, { isLoading: updateLoading }] = useUpdateCategoryMutation();
	const dispatch = useAppDispatch();
	return (
		<Modal
			open={openModal}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="flex justify-center items-center"
		>
			<div className="bg-white flex justify-center items-center rounded-[5px]">
				<div className="p-24 bg-white shadow-md w-[390px] max-h-[80vh] overflow-y-auto rounded-[5px]">
					<Formik
						initialValues={{
							category_name: editedRowData?.category_name || '',
							style_price: editedRowData?.style_price || '',
							style_threshold: editedRowData?.style_threshold || '',
							culling_price: editedRowData?.culling_price || '',
							culling_threshold: editedRowData?.culling_threshold || '',
							skin_retouch_price: editedRowData?.skin_retouch_price || '',
							skin_retouch_threshold: editedRowData?.skin_retouch_threshold || '',
							preview_edit_price: editedRowData?.preview_edit_price || '',
							preview_edit_threshold: editedRowData?.preview_edit_threshold || ''
						}}
						validationSchema={validationSchema}
						onSubmit={async (values) => {
							console.log(values);
							const response =
								editedRowData !== null
									? await updateCategory({ body: values, id: editedRowData?.id })
									: await createCategory(values);
							if (response.data) {
								dispatch(
									openSnackbar({ type: SnackbarTypeEnum.SUCCESS, message: response?.data?.message })
								);
								handleClose();
							} else {
								dispatch(
									openSnackbar({ type: SnackbarTypeEnum.ERROR, message: response?.error?.data?.data })
								);
							}
						}}
						className="rounded-xl"
					>
						{({ isSubmitting }) => (
							<Form className="space-y-4 ">
								<div className="flex items-center justify-between">
									<p className="text-2xl font-bold text-[#868686]">Create Category</p>
									<button onClick={handleClose}>
										<IoClose size={24} />
									</button>
								</div>
								<div className="form-group">
									<label
										htmlFor="category_name"
										className="block text-md font-medium text-gray-700 mt-16"
									>
										Category Name
									</label>
									<Field
										type="text"
										name="category_name"
										placeholder="Category Name"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									/>
									<ErrorMessage
										name="category_name"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>

								<div className="form-group">
									<label
										htmlFor="style_price"
										className="block text-md font-medium text-gray-700 mt-16"
									>
										Style Price ($)
									</label>
									<Field
										type="text"
										name="style_price"
										placeholder="Price in USD"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									/>
									<ErrorMessage
										name="style_price"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>

								<div className="form-group">
									<label
										htmlFor="style_threshold"
										className="block text-md font-medium text-gray-700 mt-16"
									>
										Style Threshold
									</label>
									<Field
										type="number"
										name="style_threshold"
										placeholder="Enter the minimum required for this service"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									/>
									<ErrorMessage
										name="style_threshold"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>

								<div className="form-group">
									<label
										htmlFor="culling_price"
										className="block text-md font-medium text-gray-700 mt-16"
									>
										Culling Price ($)
									</label>
									<Field
										type="text"
										name="culling_price"
										placeholder="Price in USD"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									/>
									<ErrorMessage
										name="culling_price"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>

								<div className="form-group">
									<label
										htmlFor="culling_threshold"
										className="block text-md font-medium text-gray-700 mt-16"
									>
										Culling Threshold
									</label>
									<Field
										type="number"
										name="culling_threshold"
										placeholder="Enter the minimum required for this service"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									/>
									<ErrorMessage
										name="culling_threshold"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>

								<div className="form-group">
									<label
										htmlFor="skin_retouch_price"
										className="block text-md font-medium text-gray-700 mt-16"
									>
										Skin Retouch Price ($)
									</label>
									<Field
										type="number"
										name="skin_retouch_price"
										placeholder="Price in USD"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									/>
									<ErrorMessage
										name="skin_retouch_price"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>

								<div className="form-group">
									<label
										htmlFor="skin_retouch_threshold"
										className="block text-md font-medium text-gray-700 mt-16"
									>
										Skin Retouch Threshold
									</label>
									<Field
										type="number"
										name="skin_retouch_threshold"
										placeholder="Enter the minimum required for this service"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									/>
									<ErrorMessage
										name="skin_retouch_threshold"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>

								<div className="form-group">
									<label
										htmlFor="preview_edit_price"
										className="block text-md font-medium text-gray-700 mt-16"
									>
										Preview Edit Price ($)
									</label>
									<Field
										type="text"
										name="preview_edit_price"
										placeholder="Price in USD"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									/>
									<ErrorMessage
										name="preview_edit_price"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>

								<div className="form-group">
									<label
										htmlFor="preview_edit_threshold"
										className="block text-md font-medium text-gray-700 mt-16"
									>
										Preview Edit Threshold
									</label>
									<Field
										type="number"
										name="preview_edit_threshold"
										placeholder="Enter the minimum required for this service"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									/>
									<ErrorMessage
										name="preview_edit_threshold"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>
								<div className="pt-32 pb-24">
									<button
										type="submit"
										disabled={createLoading || updateLoading}
										// onClick={onClose}
										className="w-full h-[38px] py-2  px-4 text-white rounded-md bg-[#146ef5ef] hover:bg-[#0066ff] flex justify-center items-center gap-5"
									>
										{editedRowData !== null ? 'Update Category' : 'Create Category'}
										{createLoading || updateLoading ? (
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center'
												}}
											>
												<CircularProgress
													sx={{ color: 'white' }}
													size={20}
												/>
											</Box>
										) : (
											''
										)}
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<GlobalSnackbar />
			</div>
		</Modal>
	);
};

export default CreateCategoriesForm;
