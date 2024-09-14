import { Box, CircularProgress, Modal, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { usePlaceOrderForUserMutation } from '../orderApi';
import { useAppDispatch } from 'app/store/hooks';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import { monthArray, SnackbarTypeEnum } from 'src/app/appUtils/constant';
import GlobalSnackbar from 'app/shared-components/GlobalSnackbar/GlobalSnackbar';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',

	boxShadow: 24
};
const validationSchema = Yup.object({
	number: Yup.number().required('required'),
	exp_month: Yup.string().required('required'),
	exp_year: Yup.string().required('required'),
	cvc: Yup.string().required('required')
});
const initialValues = {
	number: '',
	exp_month: '',
	exp_year: '',
	cvc: ''
};
const PaymentModal = ({
	paymentModalInfo,
	setPaymentModalInfo,
	openPaymentModal,
	handlePaymentModalClose,
	setOpenPaymentSuccessModal
}) => {
	const [placeOrderForUser, { isLoading }] = usePlaceOrderForUserMutation();
	const dispatch = useAppDispatch();
	return (
		<Modal
			open={openPaymentModal}
			onClose={handlePaymentModalClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<>
				<Box
					style={style}
					px={4}
					py={4}
					borderRadius={4}
					bgcolor={'white'}
				>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={async (values) => {
							const orderInfo = { ...paymentModalInfo, ...values };
							delete orderInfo.editors_id;
							const response = await placeOrderForUser(orderInfo);
							if (response.data) {
								dispatch(
									openSnackbar({ type: SnackbarTypeEnum.SUCCESS, message: response.data.message })
								);
								setPaymentModalInfo((prev) => ({ ...prev, order_id: response?.data?.data?.order_id }));
								setOpenPaymentSuccessModal(true);
								handlePaymentModalClose();
							} else {
								dispatch(
									openSnackbar({
										type: SnackbarTypeEnum.ERROR,
										message: response.error.data?.message
									})
								);
							}
						}}
					>
						<Form>
							<Box
								display={'flex'}
								justifyContent={'center'}
								alignItems={'center'}
							>
								<Box sx={{ pl: 2, maxWidth: 350 }}>
									<Typography
										variant="p"
										sx={{ fontSize: '14px', lineHeight: '20px', fontWeight: 600 }}
									>
										Pay Amount
									</Typography>
									<Typography
										variant="h1"
										sx={{ fontSize: '26px', fontWeight: 600, mb: 2 }}
									>
										$ {parseFloat(paymentModalInfo?.amount)?.toFixed(2)}
									</Typography>
									<Box
										display={'flex'}
										alignItems={'center'}
										justifyContent={'center'}
										gap={2}
									>
										<Box sx={{ flex: 3 }}>
											<label
												htmlFor="number"
												className="font-semibold"
												style={{
													lineHeight: '20px',
													fontSize: '14px'
												}}
											>
												Card Number
											</label>
											<Field
												type="number"
												name="number"
												placeholder="4624*****"
												className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
												min="0"
											/>
											<ErrorMessage
												name="number"
												component="div"
												className="text-red-500 text-xs mt-1"
											/>
										</Box>
										<Box sx={{ flex: 1 }}>
											<label
												htmlFor="cvc"
												className="font-semibold"
												style={{
													lineHeight: '20px',
													fontSize: '14px'
												}}
											>
												CVC
											</label>
											<Field
												type="number"
												name="cvc"
												placeholder="1234"
												className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
												min="0"
											/>
											<ErrorMessage
												name="cvc"
												component="div"
												className="text-red-500 text-xs mt-1"
											/>
										</Box>
									</Box>
									<Box
										display={'flex'}
										gap={2}
										mt={2}
									>
										<div className='w-full'>
											<label
												htmlFor="exp_month"
												className="font-semibold"
												style={{
													lineHeight: '20px',
													fontSize: '14px'
												}}
											>
												Exp Month
											</label>
											<Field
												as="select"
												name="exp_month"
												className="mt-10 px-10 block w-full h-[38px] border border-gray-300 rounded-md flex-1"
											>
												{monthArray?.map((month, i) => (
													<option value={month.value}>{month.name}</option>
												))}
											</Field>
											<ErrorMessage
												name="exp_month"
												component="div"
												className="text-red-500 text-xs mt-1"
											/>
										</div>
										<div className='w-full'>
											<label
												htmlFor="exp_year"
												className="font-semibold"
												style={{
													lineHeight: '20px',
													fontSize: '14px'
												}}
											>
												Exp year
											</label>
											<Field
												type="number"
												name="exp_year"
												placeholder="2054"
												className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md "
												min="0"
											/>
											<ErrorMessage
												name="exp_year"
												component="div"
												className="text-red-500 text-xs mt-1"
											/>
										</div>
									</Box>

									<Box className="pt-32 w-full flex items-center justify-center">
										<button
											type="submit"
											className="w-[332px] h-[38px] py-2  px-4 text-white rounded-md bg-[#146ef5ef] hover:bg-[#0066ff] font-[20px] flex justify-center items-center gap-5"
										>
											Payment
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
									</Box>
								</Box>
							</Box>
						</Form>
					</Formik>
				</Box>
				<GlobalSnackbar />
			</>
		</Modal>
	);
};

export default PaymentModal;
