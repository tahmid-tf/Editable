import { Grid, Modal } from '@mui/material';
import { Box } from '@mui/system';
import UserOrderCard from './UserOrderCard';
import { orderTypeInfo } from 'src/app/appUtils/constant';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90em',
	// height: '90%',
	bgcolor: 'background.paper',
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
			<Box style={style}>
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
							<UserOrderCard data={data} />
						</Grid>
					))}
				</Grid>
			</Box>
		</Modal>
	);
};

export default UserOrderModal;
