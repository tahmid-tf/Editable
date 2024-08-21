import { Box, Card, CardContent, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import CopyToClipboard from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useEffect, useState } from 'react';
import { getOrdinal } from 'src/app/appUtils/appUtils';

const PreviewEditReviewMessageCard = ({ messageInfo, index }) => {
	const [openCopyTooltip, setOpenCopyTooltip] = useState(false);

	const copiedContent = `${messageInfo.message}`;

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
	return (
		<Card
			sx={{
				width: '80%',
				backgroundColor: '#F2F2F7',
				height: '100%',
				alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end'
			}}
		>
			<CardContent sx={{ pb: '16px !important' }}>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center'
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
						<Typography
							sx={{
								fontSize: '14px',
								lineHeight: '18px',
								color: '#2C2C2E'
							}}
						>
							{messageInfo.name}
						</Typography>
						<Typography
							sx={{
								fontSize: '12px',
								lineHeight: '15px',
								color: '#666668'
							}}
						>
							{getOrdinal(index + 1)} Review
						</Typography>
					</Box>
					<Box>
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
				<Box
					width={'80%'}
					mt={1}
				>
					<Typography
						sx={{
							fontSize: '16px',
							fontWeight: 400,
							lineHeight: '150%',
							color: '#2C2C2E'
						}}
					>
						{messageInfo.message}
					</Typography>
				</Box>
				<Box
					sx={{
						width: '100%',
						textAlign: 'end'
					}}
				>
					<Typography
						sx={{
							fontSize: '12px',
							lineHeight: '15px',
							color: '#666668'
						}}
					>
						{dayjs(messageInfo.date).format('DD MMM YYYY')}
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default PreviewEditReviewMessageCard;
