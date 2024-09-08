import { Box, CircularProgress, Modal, Typography } from '@mui/material';
import GlobalSnackbar from 'app/shared-components/GlobalSnackbar/GlobalSnackbar';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { orderStatusOptions, SnackbarTypeEnum } from 'src/app/appUtils/constant';
import * as Yup from 'yup';
import { useGetAllEditorsQuery } from '../../admin/EditorsPage/EditorsApi';
import { IoClose } from 'react-icons/io5';
import { useEditOrderMutation } from '../orderApi';
import { useAppDispatch } from 'app/store/hooks';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import clsx from 'clsx';

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

const validationSchema = Yup.object().shape({
	editor_id: Yup.string().required('Required'),
	order_status: Yup.string().required('Required'),
	payment_status: Yup.string().required('Required'),
	preview_edit_link: Yup.string(),
	file_uploaded_by_admin_after_edit: Yup.string()
});

const OrderEditModal = ({ selectedData, closedEditModal, setSelectedData }) => {
	const { data: editorData, isLoading: editorLoading } = useGetAllEditorsQuery(
		{ page: 1, rowPerPage: 10000 },
		{ skip: selectedData === null }
	);
	const [editOrder, { isLoading }] = useEditOrderMutation();
	const dispatch = useAppDispatch();

	console.log(selectedData);

	return (
		<Modal
			open={selectedData !== null}
			onClose={closedEditModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<div>
					<Formik
						initialValues={{
							editor_id: selectedData?.editor?.id,
							order_status: selectedData?.order_status,
							payment_status: selectedData?.payment_status,
							preview_edit_link: selectedData?.preview_edit_link,
							file_uploaded_by_admin_after_edit:
								selectedData?.file_uploaded_by_admin_after_edit !== null
									? selectedData?.file_uploaded_by_admin_after_edit
									: ''
						}}
						validationSchema={validationSchema}
						onSubmit={async (values) => {
							const formValue = { ...values, order_id: selectedData.id };
							const response = await editOrder(formValue);
							console.log(response);

							if (response.data) {
								dispatch(
									openSnackbar({
										type: SnackbarTypeEnum.SUCCESS,
										message: response?.data?.message,
										duration: 4000
									})
								);
								setSelectedData(null);
							} else {
								dispatch(
									openSnackbar({
										type: SnackbarTypeEnum.ERROR,
										message: response?.error?.data?.data,
										duration: 4000
									})
								);
							}
						}}
						className="rounded-xl"
					>
						{() => (
							<Form className="space-y-4 ">
								<div className="flex items-center justify-between">
									<p className="text-2xl font-bold text-[#868686]">
										Order ID : {selectedData?.order_id}
									</p>
									<button onClick={closedEditModal}>
										<IoClose size={24} />
									</button>
								</div>

								<div className="form-group">
									<label
										htmlFor="editor_id"
										className="block text-md font-semibold text-black mt-16"
									>
										Editor
									</label>
									<Field
										as="select" // Change Field to select for dropdown
										name="editor_id"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
									>
										<option value="">Assign Editor</option>
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
										name="editor_id"
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
										<option value="failed">Failed</option>
									</Field>
									<ErrorMessage
										name="payment_status"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>

								<div className="form-group">
									<label
										htmlFor="preview_edit_link"
										className={clsx(
											'block text-md font-semibold mt-16',
											selectedData?.preview_edits === 'no'
												? 'text-[#868686] opacity-50'
												: 'text-black'
										)}
									>
										Preview Edit Link
									</label>
									<Field
										type="text"
										name="preview_edit_link"
										placeholder="Enter Email Address"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
										disabled={selectedData?.preview_edits === 'no'}
									/>
									<ErrorMessage
										name="preview_edit_link"
										component="div"
										className="text-red-500 text-xs mt-1"
									/>
								</div>

								<div className="form-group">
									<label
										htmlFor="file_uploaded_by_admin_after_edit"
										className={clsx(
											'block text-md font-semibold mt-16',
											selectedData?.file_uploaded_by_admin_after_edit === null
												? 'text-[#868686] opacity-50'
												: 'text-black'
										)}
									>
										Edited Images Google Drive Link
									</label>
									<Field
										type="text"
										name="file_uploaded_by_admin_after_edit"
										placeholder="Enter Email Address"
										className="mt-10 p-10 block w-full h-[38px] border border-gray-300 rounded-md"
										disabled={selectedData?.file_uploaded_by_admin_after_edit === null}
									/>
									<ErrorMessage
										name="file_uploaded_by_admin_after_edit"
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
