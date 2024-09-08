import { Box, Modal, Typography } from '@mui/material';
import { useAppSelector } from 'app/store/hooks';
import { FaCheckCircle } from 'react-icons/fa';
import { selectOrderState } from '../orderSlice';
import GlobalSnackbar from 'app/shared-components/GlobalSnackbar/GlobalSnackbar';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	boxShadow: 24
};
const PaymentSuccessModal = ({ openPaymentSuccessModal, handlePaymentSuccessModalClose, paymentModalInfo }) => {
	const orderState = useAppSelector(selectOrderState);

	return (
		<Modal
			open={openPaymentSuccessModal}
			onClose={handlePaymentSuccessModalClose}
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
					<Box className="flex items-center justify-center w-full">
						<Box className="w-[75px] h-[75px] flex items-center justify-center bg-[#7D7D7D1F] rounded-full">
							<FaCheckCircle size={30} />
						</Box>
					</Box>
					<Typography
						variant="h3"
						className="text-[20px] text-center leading-[24px] mt-[1em]"
					>
						Payment Successful!
					</Typography>
					<Typography
						variant="h3"
						className="text-[24px] text-center font-bold leading-[40px]"
					>
						USD {paymentModalInfo?.amount}
					</Typography>
					<Typography className="text-[12px] text-center leading-[12px">
						Order ID: {paymentModalInfo?.order_id}
					</Typography>
					<div
						style={{
							borderBottom: '2px solid #EDEDED',
							paddingBottom: '8px',
							marginTop: '10px'
						}}
					>
						<p className="text-[20px] text-[#474747]">Basic Charge ({paymentModalInfo?.categoryName})</p>
					</div>
					<div
						style={{ borderBottom: '2px dashed #EDEDED' }}
						className="pt-[26px] pb-10"
					>
						{paymentModalInfo?.selectedStyle ? (
							<div className="py-10  flex items-center justify-between ">
								<p className="text-[16px] text-[#707070]">
									{paymentModalInfo?.selectedStyle} ({paymentModalInfo?.number_of_images_provided}{' '}
									items)
								</p>
								<p className="text-[16px] text-[#121212] font-semibold">
									${orderState?.mainStylePrice}
								</p>
							</div>
						) : (
							<></>
						)}
						{paymentModalInfo?.culling !== 'no' ? (
							<div className="py-10  flex items-center justify-between">
								<p className="text-[16px] text-[#707070]">
									Culling ({paymentModalInfo?.number_of_images_provided} items)
								</p>
								<p className="text-[16px] text-[#121212] font-semibold">${orderState?.cullingPrice}</p>
							</div>
						) : (
							<></>
						)}
						{paymentModalInfo?.skin_retouching !== 'no' ? (
							<div className="py-10  flex items-center justify-between">
								<p className="text-[16px] text-[#707070]">
									Skin Retouching ({paymentModalInfo?.number_of_images_provided} items)
								</p>
								<p className="text-[16px] text-[#121212] font-semibold">
									${orderState?.retouchingPrice}
								</p>
							</div>
						) : (
							<></>
						)}
						{paymentModalInfo?.preview_edits !== 'no' ? (
							<div className="py-10  flex items-center justify-between">
								<p className="text-[16px] text-[#707070]">
									Preview Edit ({paymentModalInfo?.number_of_images_provided} items)
								</p>
								<p className="text-[16px] text-[#121212] font-semibold">
									${orderState?.previewEditPrice}
								</p>
							</div>
						) : (
							<></>
						)}
					</div>
					<div className="pt-10 w-full">
						<div className="py-10  flex items-center justify-between w-full">
							<p className="text-[18px] text-[#707070] ">Amount</p>
							<p className="text-[18px] font-semibold">USD {orderState?.subtotal}</p>
						</div>
						{paymentModalInfo?.order_type === 'express' ? (
							<div className="py-10  flex items-center justify-between w-full">
								<p className="text-[18px] text-[#707070]">Express Delivery</p>

								<p className="text-[18px] font-semibold">USD {orderState?.expressAmount}</p>
							</div>
						) : (
							<></>
						)}
					</div>
				</Box>
				<GlobalSnackbar />
			</>
		</Modal>
	);
};

export default PaymentSuccessModal;
