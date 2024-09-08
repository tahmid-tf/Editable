import { Box, Modal } from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 560,
};
const YourTubeVideoModal = ({ openYouTubeVideo, handleClose }) => {
	return (
		<Modal
			open={openYouTubeVideo}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
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
			</Box>
		</Modal>
	);
};

export default YourTubeVideoModal;
