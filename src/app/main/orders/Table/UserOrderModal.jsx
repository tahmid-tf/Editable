import { Button, CircularProgress, Grid, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import UserOrderCard from './UserOrderCard';
import { orderTypeInfo, SnackbarTypeEnum } from 'src/app/appUtils/constant';
import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useGetAllCategoriesForUserQuery } from '../../admin/categories/CategoriesApi';
import { addOrderGeneralInfo } from '../orderSlice';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { useGetStylesForUserMutation } from '../orderApi';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import GlobalSnackbar from 'app/shared-components/GlobalSnackbar/GlobalSnackbar';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',

	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4
};
const validationSchema = Yup.object().shape({
	orderName: Yup.string().required('Required'),
	category_id: Yup.number().required('Required')
});
const UserOrderModal = ({ newUserOrderOpen, handleNewOrderClose, setAllStyleData, onOrderSubmit }) => {
	const [orderType, setOrderType] = useState('');
	const { data } = useGetAllCategoriesForUserQuery({ page: 1, rowPerPage: 100000000 }, { skip: !orderType });
	const dispatch = useAppDispatch();
	const [getStyles, { isLoading }] = useGetStylesForUserMutation();
	const user = useAppSelector(selectUser);

	useEffect(() => {
		setOrderType('');
	}, [newUserOrderOpen]);
	return (
		<Modal
			open={newUserOrderOpen}
			onClose={handleNewOrderClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="flex justify-center items-center"
		>
			<>
				<Box
					style={style}
					width={orderType?.length ? 'fit' : '90em'}
				>
					{orderType?.length && orderType !== 'custom' ? (
						<Box className="w-full flex items-center justify-center">
							<Formik
								initialValues={{
									orderName: '',
									category_id: '',
									category_name: ''
								}}
								validationSchema={validationSchema}
								onSubmit={async (values) => {
									const formValue = {
										email: user?.email,
										phone: user?.phone,
										order_type: orderType,
										order_name: values?.orderName,
										category: parseFloat(values?.category_id),
										payment_status: 'successful'
									};
									dispatch(
										addOrderGeneralInfo({ ...formValue, category_name: values?.category_name })
									);
									const response = await getStyles(formValue);
									if (response.data) {
										setAllStyleData(response?.data?.data?.style_data);

										onOrderSubmit();
									} else {
										dispatch(
											openSnackbar({
												type: SnackbarTypeEnum.ERROR,
												message: response?.error?.data?.message
											})
										);
									}
								}}
							>
								{({ setFieldValue }) => (
									<Form className="space-y-4 w-[30em] bg-white p-[25px] rounded-[10px] ">
										<Typography className="font-semibold text-[#868686] text-[20px] leading-[20px] capitalize">
											{orderType} Delivery
										</Typography>
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
												placeholder="Enter order name"
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
												className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
												onChange={(event) => {
													const selectedIndex = event.target.options.selectedIndex;
													const selectedCategoryId = event.target.value;
													const selectedCategoryName =
														event.target.options[selectedIndex].text;
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
										<div>
											<Button
												className="mt-20 w-full bg-[#146ef5ef] flex justify-center items-center gap-5 "
												color="primary"
												variant="contained"
												sx={{
													borderRadius: '5px',
													':hover': {
														backgroundColor: '#0066ff'
													}
												}}
												aria-label="Register"
												size="large"
												type="submit"
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
											</Button>
										</div>
									</Form>
								)}
							</Formik>
						</Box>
					) : orderType?.length && orderType === 'custom' ? (
						<iframe
							width="560"
							height="315"
							src="https://www.youtube.com/embed/q9QFDhE3z_c?si=mhwPTsa61yEQc6Oh"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerpolicy="strict-origin-when-cross-origin"
							allowfullscreen
						></iframe>
					) : (
						<Grid
							spacing={1}
							container
						>
							{orderTypeInfo?.map((data, i) => (
								<Grid
									key={i}
									item
									xs={4}
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
								>
									<UserOrderCard
										setOrderType={setOrderType}
										data={data}
									/>
								</Grid>
							))}
						</Grid>
					)}
				</Box>
				<GlobalSnackbar />
			</>
		</Modal>
	);
};

export default UserOrderModal;
