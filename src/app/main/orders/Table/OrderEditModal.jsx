import { Box, CircularProgress, Modal, Typography } from '@mui/material';
import GlobalSnackbar from 'app/shared-components/GlobalSnackbar/GlobalSnackbar';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { orderStatusOptions } from 'src/app/appUtils/constant';
import * as Yup from 'yup';
import { useGetAllEditorsQuery } from '../../admin/EditorsPage/EditorsApi';
import { IoClose } from 'react-icons/io5';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	maxHeight: '90%',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: '40px',
	borderRadius: 2,
	overflow: 'scroll'
};

const isLoading = false;

const validationSchema = Yup.object().shape({
	editor: Yup.string().required('Required'),
	order_status: Yup.string().required('Required'),
	payment_status: Yup.string().required('Required'),
	preview_link: Yup.string().required('Required')
});

const OrderEditModal = ({ selectedData, closedEditModal }) => {
	const { data: editorData, isLoading: editorLoading } = useGetAllEditorsQuery(
		{ page: 1, rowPerPage: 10000 },
		{ skip: selectedData === null }
	);
	return (
		<Modal
			open={selectedData !== null}
			onClose={closedEditModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<div
				// className="p-24 bg-white shadow-md w-[390px] max-h-[80vh] overflow-y-auto rounded-[4px]"
				>
					<Formik
						initialValues={{
							editor: 'john.doe@gmail.com',
							order_status: '+44 7848 107162',
							payment_status: '',
							preview_edit: ''
						}}
						validationSchema={validationSchema}
						onSubmit={async (values) => {
							// successAlert();
							// onClose();

							const formValue = { ...values };
							console.log(formValue);

							// dispatch(addOrderGeneralInfo({ ...formValue, category_name: values?.category_name }));
							// const response = await getStyles(formValue);
							// if (response.data) {
							// 	setAllStyleData(response?.data?.data?.style_data);

							// 	onOrderSubmit();
							// } else {
							// 	console.log(response.error);
							// 	dispatch(
							// 		openSnackbar({ type: SnackbarTypeEnum.ERROR, message: response?.error?.data?.data })
							// 	);
							// }
						}}
						className="rounded-xl"
					>
						{({ isSubmitting, setFieldValue }) => (
							<Form className="space-y-4 ">
								<div className="flex items-center justify-between">
									<p className="text-2xl font-bold text-[#868686]">Order ID : {selectedData?.order_id}</p>
									<button onClick={closedEditModal}>
										<IoClose size={24} />
									</button>
								</div>
								<div className="form-group">
									<label
										htmlFor="editor"
										className="block text-md font-semibold text-black mt-16"
									>
										Editor
									</label>
									<Field
										as="select" // Change Field to select for dropdown
										name="editor"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									>
										<option value="">Order Status</option>
										{editorData?.data?.data?.map((editors, i) => (
											<option
												key={i}
												className="bg-white text-black"
												value={editors?.id}
											>
												{editors?.editor_name}
											</option>
										))}
									</Field>
									<ErrorMessage
										name="editor"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>
								<div className="form-group">
									<label
										htmlFor="order_status"
										className="block text-md font-semibold text-black mt-16"
									>
										Order Status
									</label>
									<Field
										as="select" // Change Field to select for dropdown
										name="order_status"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									>
										{orderStatusOptions?.map((orderData, i) => (
											<option
												className="bg-white text-black"
												value={orderData.value}
												key={i}
											>
												{orderData.name}
											</option>
										))}
									</Field>
									<ErrorMessage
										name="order_status"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>

								<div className="form-group">
									<label
										htmlFor="payment_status"
										className="block text-md font-semibold text-black mt-16"
									>
										Payment Status
									</label>
									<Field
										as="select" // Change Field to select for dropdown
										name="payment_status"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									>
										<option value="">Select Payment Status</option>
										<option value="pending">Pending</option>
										<option value="successful">Successful</option>
									</Field>
									<ErrorMessage
										name="payment_status"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>

								<div className="form-group">
									<label
										htmlFor="preview_edit"
										className="block text-md font-semibold text-black mt-16"
									>
										Preview Edit Link
									</label>
									<Field
										type="email"
										name="preview_edit"
										placeholder="Enter Email Address"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									/>
									<ErrorMessage
										name="preview_edit"
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
			</Box>
		</Modal>
	);
};

export default OrderEditModal;
