import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGetPreviewLinkMutation, useUserPreviewEditDecisionMutation } from '../orderApi';
import { useAppDispatch } from 'app/store/hooks';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';
import GlobalSnackbar from 'app/shared-components/GlobalSnackbar/GlobalSnackbar';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: 4
};
const validationSchema = Yup.object({
	users_decision: Yup.string().required('Please Select an option'),
	comment: Yup.string().when(['users_decision'], ([users_decision], schema) => {
		if (users_decision === 'rejected') return schema.required('Comment is required when the decision is rejected');
		else return schema;
	})
});
const EditPreviewStatusReviewModal = ({ openPreviewEditReviewModal, handleModalClose, row }) => {
	const [userPreviewEditDecision, { isLoading }] = useUserPreviewEditDecisionMutation();
	const [getPreviewLink, { isLoading: previewLinkLoading }] = useGetPreviewLinkMutation();
	const dispatch = useAppDispatch();
	const formik = useFormik({
		initialValues: {
			users_decision: '',
			comment: ''
		},
		validationSchema,
		onSubmit: async (values) => {
			try {
				const res = await userPreviewEditDecision({ ...values, order_id: row?.original?.id });

				if (res.data) {
					dispatch(openSnackbar({ type: SnackbarTypeEnum.SUCCESS, message: res.data.data }));
					formik.resetForm();
					handleModalClose();
				} else {
					dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: res.error.data.data }));
				}
			} catch (error) {
				dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: error.data.data }));
			}
		}
	});

	const handleDownloadImageClick = async () => {
		try {
			const res = await getPreviewLink({ order_id: row?.original?.id });
			console.log(res);

			if (res?.data) {
				window.open(res.data?.data, '_blank');
			} else {
				dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: res.error.data.data }));
			}
		} catch (error) {
			dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: error.data.data }));
		}
	};
	return (
		<Modal
			open={openPreviewEditReviewModal}
			onClose={handleModalClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<>
				<Box sx={style}>
					<Typography
						variant="h3"
						sx={{
							fontSize: '20px',
							fontWeight: 700,
							lineHeight: '20px',
							textAlign: 'left',
							color: '#868686',
							textAlign: 'center'
						}}
					>
						Preview Edits
					</Typography>
					<Box
						sx={{
							fontSize: '14px',
							fontWeight: 500,
							lineHeight: '20px',
							letterSpacing: '0.2px',
							textAlign: 'left',
							mt: '30px'
						}}
					>
						<ol className="list-decimal">
							<li>Download and Review the Preview Edits from the Download Button below.</li>
							<li>
								Ensure that you are certain before accepting or rejecting the edits (for rest of the
								edits)
							</li>
						</ol>
					</Box>
					<Typography
						sx={{
							fontSize: '14px',
							fontWeight: 500,
							lineHeight: '20px',
							letterSpacing: '0.2px',
							textAlign: 'left',
							mt: '20px',
							color: 'red'
						}}
					>
						Once you chose a status, you cannot change it again
					</Typography>
					<Button
						sx={{
							width: '100%',
							backgroundColor: '#146ef5ef',
							color: 'white',
							borderRadius: 2,
							mt: '20px',
							':hover': {
								backgroundColor: '#0066ff',
								color: 'white'
							}
						}}
						onClick={handleDownloadImageClick}
					>
						Download Images
						{previewLinkLoading ? (
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
					<form onSubmit={formik.handleSubmit}>
						<Typography
							sx={{
								fontSize: '14px',
								fontWeight: 500,
								lineHeight: '20px',
								letterSpacing: '0.2px',
								textAlign: 'left',
								mt: '20px',
								mb: '10px',
								color: 'black'
							}}
						>
							Preview Edit Status
						</Typography>
						<FormControl fullWidth>
							<InputLabel id="users_decision">Select Status</InputLabel>
							<Select
								labelId="users_decision"
								name="users_decision"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.users_decision}
								label="Select Status"
								sx={{
									width: '100%'
								}}
							>
								<MenuItem value={'accepted'}>Accept</MenuItem>
								<MenuItem value={'rejected'}>Reject</MenuItem>
							</Select>
						</FormControl>

						{formik.touched.users_decision && formik.errors.users_decision ? (
							<Typography
								sx={{
									fontSize: '12px',
									lineHeight: '20px',
									letterSpacing: '0.2px',
									textAlign: 'left',
									mt: '5px',
									color: 'red'
								}}
							>
								{formik.errors.users_decision}
							</Typography>
						) : null}

						{formik.values.users_decision === 'rejected' ? (
							<>
								<TextField
									name="comment"
									multiline
									rows={6}
									sx={{
										width: '100%',
										mt: 2
									}}
									placeholder="Type your instruction"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									value={formik.values.comment}
								/>
								{formik.touched.comment && formik.errors.comment ? (
									<Typography
										sx={{
											fontSize: '12px',
											lineHeight: '20px',
											letterSpacing: '0.2px',
											textAlign: 'left',
											mt: '5px',
											color: 'red'
										}}
									>
										{formik.errors.comment}
									</Typography>
								) : null}
							</>
						) : (
							<></>
						)}
						<Button
							sx={{
								width: '100%',
								backgroundColor: '#146ef5ef',
								color: 'white',
								borderRadius: 2,
								mt: '20px',
								':hover': {
									backgroundColor: '#0066ff',
									color: 'white'
								}
							}}
							type="submit"
						>
							Save
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
					</form>
				</Box>
				<GlobalSnackbar />
			</>
		</Modal>
	);
};

export default EditPreviewStatusReviewModal;
