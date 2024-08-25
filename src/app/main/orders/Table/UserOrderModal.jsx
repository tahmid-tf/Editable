import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import UserOrderCard from './UserOrderCard';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90%',
	height: '90%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

const UserOrderModal = ({ newUserOrderOpen, handleNewOrderClose }) => {
	return (
		<Modal
			open={newUserOrderOpen}
			onClose={handleNewOrderClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="flex justify-center items-center"
		>
			<Box style={style} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={5}>
				<UserOrderCard></UserOrderCard>
				<UserOrderCard></UserOrderCard>
				<UserOrderCard></UserOrderCard>
			</Box>
		</Modal>
	);
};

export default UserOrderModal;
