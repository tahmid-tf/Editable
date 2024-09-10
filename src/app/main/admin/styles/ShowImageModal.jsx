import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import { IoClose } from 'react-icons/io5';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	bgcolor: 'background.paper',
	boxShadow: 24,
	px: 4,
	pt: 2,
	pb: 4,
	borderRadius: 2
};
const ShowImageModal = ({ openModal, handleClose, imageUrl }) => {
	return (
		<Modal
			open={openModal}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<div className="w-full flex justify-end mb-10">
					<button onClick={handleClose}>
						<IoClose size={24} />
					</button>
				</div>
				<img
					src={imageUrl}
					alt="image"
				/>
			</Box>
		</Modal>
	);
};

export default ShowImageModal;
