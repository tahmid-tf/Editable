import { Box, Grid, Modal, Tooltip, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useGetOrderDetailsQuery } from '../orderApi';
import { calculateDeliveryDays, getStyleAndAdditionalStyleName } from 'src/app/appUtils/appUtils';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: '40px',
	borderRadius: 2
};

const OrderDetailsModal = ({ selectedId, orderDetailsOpen, handleOrderDetailsClose }) => {
	const [openCopyTooltip, setOpenCopyTooltip] = useState(false);

	const { data } = useGetOrderDetailsQuery(selectedId, { skip: !selectedId });
	console.log(getStyleAndAdditionalStyleName(data?.data?.styles_data));
	console.log(data?.data);

	const handleTooltipClose = () => {
		setOpenCopyTooltip(false);
	};

	const handleCopyIconClick = () => {
		setOpenCopyTooltip(true);
	};

	useEffect(() => {
		if (openCopyTooltip) {
			const tooltipTimeout = setTimeout(handleTooltipClose, 1000);

			return () => {
				clearTimeout(tooltipTimeout);
			};
		}
	}, [openCopyTooltip]);

	const copiedContent = `Order Type: ${data?.data?.order_type},\nDelivery Date: ${calculateDeliveryDays(data?.data?.created_at, data?.data?.order_type)}\nCategory: ${data?.data?.category_name}\nTotal Image: ${data?.data?.number_of_images_provided}\nStyle: ${getStyleAndAdditionalStyleName(data?.data?.styles_data)?.mainStyle}\nAdditional Style: ${getStyleAndAdditionalStyleName(data?.data?.styles_data)?.additionalStyle}\nCulling: ${data?.data?.culling}\nCulled To: ${data?.data?.images_culled_down_to || 0}\nCulling Mark: ${data?.data?.select_image_culling_type}\nSkin Retouch: ${data?.data?.skin_retouching}\nSkin Retouch Mark: ${data?.data?.skin_retouching_type}\nPreview Edits: ${data?.data?.preview_edits}`;

    
	return (
		<Modal
			open={orderDetailsOpen}
			onClose={handleOrderDetailsClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ borderBottom: '1px solid #EDEDED', pb: '10px' }}>
					<Typography
						sx={{
							color: '#474747',
							fontSize: '18px',
							lineHeight: '18px',
							textAlign: 'center'
						}}
					>
						Order ID: {data?.data?.id}
					</Typography>
					<Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
						<Tooltip
							arrow
							onClose={handleTooltipClose}
							open={openCopyTooltip}
							disableHoverListener
							placement="top"
							title="Copied!"
						>
							<div>
								<CopyToClipboard
									text={copiedContent}
									onCopy={handleCopyIconClick}
								>
									<ContentCopyIcon
										fontSize="small"
										className="cursor-pointer"
									/>
								</CopyToClipboard>
							</div>
						</Tooltip>
					</Box>
				</Box>
				<Grid
					container
					sx={{ fontSize: '20px', mt: '20px' }}
					rowGap={2}
				>
					<Grid
						item
						xs={6}
						sx={{
							color: '#707070'
						}}
					>
						Order Type
					</Grid>
					<Grid
						item
						xs={6}
						fontWeight={500}
						textAlign={'end'}
						textTransform={'capitalize'}
					>
						{data?.data?.order_type}
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							color: '#707070'
						}}
					>
						Delivery Date
					</Grid>
					<Grid
						item
						xs={6}
						fontWeight={500}
						textAlign={'end'}
					>
						{calculateDeliveryDays(data?.data?.created_at, data?.data?.order_type)}
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							color: '#707070'
						}}
					>
						Category
					</Grid>
					<Grid
						item
						xs={6}
						fontWeight={500}
						textAlign={'end'}
					>
						{data?.data?.category_name}
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							color: '#707070'
						}}
					>
						Total Image
					</Grid>
					<Grid
						item
						xs={6}
						fontWeight={500}
						textAlign={'end'}
					>
						{data?.data?.number_of_images_provided}
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							color: '#707070'
						}}
					>
						Style
					</Grid>
					<Grid
						item
						xs={6}
						fontWeight={500}
						textAlign={'end'}
					>
						{getStyleAndAdditionalStyleName(data?.data?.styles_data)?.mainStyle}
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							color: '#707070'
						}}
					>
						Additional Style
					</Grid>
					<Grid
						item
						xs={6}
						fontWeight={500}
						textAlign={'end'}
					>
						{getStyleAndAdditionalStyleName(data?.data?.styles_data)?.additionalStyle}
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							color: '#707070'
						}}
					>
						Culling
					</Grid>
					<Grid
						item
						xs={6}
						fontWeight={500}
						textAlign={'end'}
					>
						{data?.data?.culling}
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							color: '#707070'
						}}
					>
						Culled To
					</Grid>
					<Grid
						item
						xs={6}
						fontWeight={500}
						textAlign={'end'}
					>
						{data?.data?.images_culled_down_to || 0}
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							color: '#707070'
						}}
					>
						Culling Mark
					</Grid>
					<Grid
						item
						xs={6}
						fontWeight={500}
						textAlign={'end'}
					>
						{data?.data?.select_image_culling_type}
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							color: '#707070'
						}}
					>
						Skin Retouch
					</Grid>
					<Grid
						item
						xs={6}
						fontWeight={500}
						textAlign={'end'}
					>
						{data?.data?.skin_retouching}
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							color: '#707070'
						}}
					>
						Skin Retouch Mark
					</Grid>
					<Grid
						item
						xs={6}
						fontWeight={500}
						textAlign={'end'}
					>
						{data?.data?.skin_retouching_type}
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							color: '#707070'
						}}
					>
						Preview Edits
					</Grid>
					<Grid
						item
						xs={6}
						fontWeight={500}
						textAlign={'end'}
					>
						{data?.data?.preview_edits}
					</Grid>
				</Grid>
			</Box>
		</Modal>
	);
};

export default OrderDetailsModal;
