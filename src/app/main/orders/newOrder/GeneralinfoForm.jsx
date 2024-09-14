import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoClose } from 'react-icons/io5';
import { useAppDispatch } from 'app/store/hooks';
import { addOrderGeneralInfo } from '../orderSlice';
import { useGetAllCategoriesQuery } from '../../admin/categories/CategoriesApi';
import { useGetStylesMutation } from '../orderApi';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';
import { Box, CircularProgress } from '@mui/material';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import GlobalSnackbar from 'app/shared-components/GlobalSnackbar/GlobalSnackbar';

const validationSchema = Yup.object().shape({
	userEmail: Yup.string().email('Invalid email format').required('Required'),
	userPhone: Yup.string().required('Required'),
	orderType: Yup.string().required('Required'),
	orderName: Yup.string().required('Required'),
	category_id: Yup.number().required('Required'),
	paymentStatus: Yup.string().required('Required')
});

const GeneralinfoForm = ({ onClose, successAlert, onOrderSubmit, setAllStyleData }) => {
	const dispatch = useAppDispatch();
	const { data } = useGetAllCategoriesQuery({ page: 1, rowPerPage: 100000000 });
	const [getStyles, { isLoading }] = useGetStylesMutation();
	return (
		<div className="p-24 bg-white shadow-md w-[390px] max-h-[80vh] overflow-y-auto rounded-[4px]">
			<Formik
				initialValues={{
					userEmail: '',
					userPhone: '',
					orderType: '',
					orderName: '',
					category_id: '',
					category_name: '',
					paymentStatus: ''
				}}
				validationSchema={validationSchema}
				onSubmit={async (values) => {
					// successAlert();
					// onClose();
					const formValue = {
						email: values?.userEmail,
						phone: values?.userPhone,
						order_type: values?.orderType,
						order_name: values?.orderName,
						category: parseFloat(values?.category_id),
						payment_status: values?.paymentStatus
					};
					dispatch(addOrderGeneralInfo({ ...formValue, category_name: values?.category_name }));
					const response = await getStyles(formValue);
					if (response.data) {
						setAllStyleData(response?.data?.data?.style_data);

						onOrderSubmit();
					} else {
						dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: response?.error?.data?.data }));
					}
				}}
				className="rounded-xl"
			>
				{({ isSubmitting, setFieldValue }) => (
					<Form className="space-y-4 ">
						<div className="flex items-center justify-between">
							<p className="text-2xl font-bold text-[#868686]">General Info</p>
							<button onClick={onClose}>
								<IoClose size={24} />
							</button>
						</div>
						<div className="form-group">
							<label
								htmlFor="userEmail"
								className="block text-md font-semibold text-black mt-16"
							>
								User Email
							</label>
							<Field
								type="email"
								name="userEmail"
								placeholder="Enter Email Address"
								className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
							/>
							<ErrorMessage
								name="userEmail"
								component="div"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						<div className="form-group">
							<label
								htmlFor="userPhone"
								className="block text-md font-semibold text-black mt-16"
							>
								User Phone
							</label>
							<Field
								type="text"
								name="userPhone"
								placeholder="Enter Phone Number"
								className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
							/>
							<ErrorMessage
								name="userPhone"
								component="div"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						<div className="form-group">
							<label
								htmlFor="orderType"
								className="block text-md font-semibold text-black mt-16"
							>
								Select Order Type
							</label>
							<Field
								as="select" // Change Field to select for dropdown
								name="orderType"
								className="mt-10 px-10 block w-full h-[38px] border border-gray-300 rounded-md"
							>
								<option value="">Select Order Type</option>
								<option value="standard">Standard</option>
								<option value="express">Express</option>
							</Field>
							<ErrorMessage
								name="orderType"
								component="div"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						<div className="form-group">
							<label
								htmlFor="orderName"
								className="block text-md font-semibold text-black mt-16"
							>
								Order Name
							</label>
							<Field
								type="text"
								name="orderName"
								placeholder="Enter Order Name"
								className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
							/>
							<ErrorMessage
								name="orderName"
								component="div"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						<div className="form-group">
							<label
								htmlFor="category_id"
								className="block text-md font-semibold text-black mt-16"
							>
								Select a Category
							</label>
							<Field
								as="select" // Change Field to select for dropdown
								name="category_id"
								className="mt-10 px-10 block w-full h-[38px] border border-gray-300 rounded-md"
								onChange={(event) => {
									const selectedIndex = event.target.options.selectedIndex;
									const selectedCategoryId = event.target.value;
									const selectedCategoryName = event.target.options[selectedIndex].text;
									setFieldValue('category_id', selectedCategoryId);
									setFieldValue('category_name', selectedCategoryName);
								}}
							>
								<option value="">Select Category Type</option>
								{data?.data?.data?.map((category, i) => (
									<option
										key={i}
										value={category?.id}
									>
										{category?.category_name}
									</option>
								))}
							</Field>
							<ErrorMessage
								name="category_id"
								component="div"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						<div className="form-group">
							<label
								htmlFor="paymentStatus"
								className="block text-md font-semibold text-black mt-16"
							>
								Payment Status
							</label>
							<Field
								as="select" // Change Field to select for dropdown
								name="paymentStatus"
								className="mt-10 px-10 block w-full h-[38px] border border-gray-300 rounded-md"
							>
								<option value="">Select Payment Status</option>
								<option value="pending">Pending</option>
								<option value="successful">Successful</option>
								<option value="successful">Failed</option>
							</Field>
							<ErrorMessage
								name="paymentStatus"
								component="div"
								className="text-red-500 text-xs mt-1"
							/>
						</div>

						<div className="pt-32 pb-24">
							<button
								type="submit"
								disabled={isLoading}
								// onClick={onClose}
								className="w-full h-[38px] py-2 px-4 text-white rounded-md bg-[#146ef5ef] hover:bg-[#0066ff] flex justify-center items-center gap-5"
							>
								Proceed
								{isLoading ? (
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
			<GlobalSnackbar />
		</div>
	);
};

export default GeneralinfoForm;
