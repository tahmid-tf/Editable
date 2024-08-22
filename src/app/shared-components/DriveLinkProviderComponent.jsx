import { Box, Button, CircularProgress, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { MdCloudDownload } from 'react-icons/md';
import GlobalSnackbar from './GlobalSnackbar/GlobalSnackbar';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	boxShadow: 24,
	p: 4,
	borderRadius: 2
};
const DriveLinkProviderComponent = ({ openModal, handleCloseModal, isLoading, setDriveLink, error, handleSubmit }) => {
	return (
		<Modal
			open={openModal}
			onClose={handleCloseModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<>
				<Box
					sx={style}
					bgcolor={'white'}
					display={'flex'}
					flexDirection={'column'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<Box className="w-[75px] h-[75px] bg-[#7D7D7D1F] rounded-full flex items-center justify-center">
						<MdCloudDownload size={50} />
					</Box>
					<Box
						color={'#474747'}
						textAlign={'center'}
						mt={4}
					>
						<Typography className="text-[24px] font-normal leading-[24px]">
							Paste the link to the edited images for this order
						</Typography>
						<Typography className="text-[12px] font-normal leading-[12px] mt-5">
							Order Id: 123131
						</Typography>
					</Box>
					<Box
						mt={4}
						textAlign={'start'}
						width={'100%'}
						display={'flex'}
						flexDirection={'column'}
						gap={'15px'}
					>
						<Typography
							textAlign={'start'}
							className="text-[14px] font-[500] leading-[20px] text-black"
						>
							Google Drive link with your images
						</Typography>
						<Box width={'100%'}>
							<TextField
								id="outlined-basic"
								placeholder="Please enter your url here"
								variant="outlined"
								className="w-full"
								onChange={(e) => setDriveLink(e.target.value)}
							/>
							{error?.length ? (
								<Typography
									textAlign={'start'}
									className="text-[12px] leading-[16px] text-red"
								>
									{error}
								</Typography>
							) : (
								<></>
							)}
						</Box>
						<ol className="text-[12px] leading-[16px] text-black list-decimal">
							<Typography textAlign={'start'}>Please ensure that:</Typography>
							<div className="ml-[1.5em] mt-16">
								<li>All the images have finished uploading in the drive before proceeding.</li>
								<li>This is the correct link for this order. </li>
							</div>
						</ol>
						<Button
							className="mt-10 w-full bg-[#146ef5ef] flex justify-center items-center gap-5 "
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
							onClick={handleSubmit}
						>
							Save Changes
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
				<GlobalSnackbar />
			</>
		</Modal>
	);
};

export default DriveLinkProviderComponent;
