import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material';
import deleteIcon from 'src/assets/icons/deleteIcon.svg';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	backgroundColor: '#FFFFFF',
	boxShadow: 24,
	p: 4,
	borderRadius: 4,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column'
};
const ConfirmationModal = ({
	openModal,
	handleClose,
	topIcon,
	bodyText,
	cancelBtnText,
	confirmBtnText,
	handleCancelClick,
	handleConfirmClick,
	isLoading
}) => {
	return (
		<Modal
			open={openModal}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box
					sx={{
						borderRadius: '100px',
						height: '5em',
						width: '5em',
						bgcolor: '#7D7D7D1F',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<img
						src={topIcon ? topIcon : deleteIcon}
						className="w-[30px] h-[30px]"
						alt="icon"
					/>
				</Box>
				<Box sx={{ my: 4, fontWeight: 400, fontSize: '24px', lineHeight: '30px' }}>
					<Typography sx={{ textAlign: 'center' }}>{bodyText}</Typography>
				</Box>
				<Box sx={{ display: 'flex', gap: 4 }}>
					<Button
						variant="outlined"
						sx={{
							borderRadius: 1,
							width: '7em',
							color: '#C9C9C9',
							'&:hover': {
								color: 'black'
							}
						}}
						onClick={handleCancelClick}
					>
						{cancelBtnText}
					</Button>
					<Button
						variant="contained"
						color="error"
						sx={{
							borderRadius: 1,
							width: '7em',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 1
						}}
						onClick={handleConfirmClick}
					>
						{confirmBtnText}
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
				</Box>
			</Box>
		</Modal>
	);
};

export default ConfirmationModal;
