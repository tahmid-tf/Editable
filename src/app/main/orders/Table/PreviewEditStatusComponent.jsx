import clsx from 'clsx';
import { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import EditPreviewStatusReviewModal from './EditPreviewStatusReviewModal';
import { Tooltip } from '@mui/material';
import { AiFillInfoCircle } from 'react-icons/ai';

const PreviewEditStatusComponent = ({ row, userType, setSelectedId, setOrderDetailsOpen }) => {
	const [openPreviewEditReviewModal, setOpenPreviewEditReviewModal] = useState(false);

	const handleClick = () => {
		if (row?.original?.preview_edit_status === 'user_review_pending' && !userType?.includes('admin')) {
			setOpenPreviewEditReviewModal(true);
		}
	};
	const handleModalClose = () => {
		setOpenPreviewEditReviewModal(false);
	};
	const handleTooltipClick = () => {
		setSelectedId(row?.original?.id);
		setOrderDetailsOpen(true);
	};
	return (
		<>
			<div
				className={clsx(
					'inline-flex items-center px-[8px] py-[2px] rounded-full tracking-wide',
					row?.original?.preview_edits === 'no'
						? 'text-black'
						: row?.original?.preview_edit_status === 'accepted'
							? 'bg-[#27A96E] text-white'
							: row?.original?.preview_edit_status === 'rejected'
								? 'bg-[#D54848] text-white'
								: row?.original?.preview_edit_status === 'pending'
									? 'bg-[#F8DA61] text-black'
									: 'bg-[#CBCBCB] text-black',
					row?.original?.preview_edit_status === 'user_review_pending' && !userType?.includes('admin')
						? 'cursor-pointer'
						: ''
				)}
				onClick={handleClick}
			>
				<div className="tracking-[0.2px] leading-[20px] text-[12px] capitalize !whitespace-nowrap">
					{row?.original?.preview_edits === 'no' ? (
						'N/A'
					) : row?.original?.preview_edit_status === 'user_review_pending' ? (
						<span className="flex items-center justify-center">
							User Review Pending {userType?.includes('admin') ? '' : <MdArrowDropDown size={20} />}
						</span>
					) : (
						row?.original?.preview_edit_status
					)}
				</div>
			</div>
			{row?.original?.preview_edit_status === 'rejected' ? (
				<Tooltip
					color="red"
					placement="right"
					title={
						<>
							<span className="text-[16px]">
								Shoot! It looks like the user didn't like what we created. Click
							</span>
							<span
								className="font-semibold underline cursor-pointer ml-[3px]"
								onClick={handleTooltipClick}
							>
								HERE
							</span>
							<span> to find out why.</span>
						</>
					}
					componentsProps={{
						tooltip: {
							sx: {
								fontSize: '16px',
								backgroundColor: 'white', // Customize the background color
								color: 'black', // Customize the text color
								boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
								padding: '10px',
								borderRadius: '10px'
							}
						}
					}}
				>
					<button
						onClick={() => {
							console.log('info icon clicked');
						}}
						type="button"
					>
						<AiFillInfoCircle
							className="ml-4 text-[#F29339]"
							size={14}
						/>
					</button>
				</Tooltip>
			) : (
				<></>
			)}
			<EditPreviewStatusReviewModal
				handleModalClose={handleModalClose}
				openPreviewEditReviewModal={openPreviewEditReviewModal}
				row={row}
			/>
		</>
	);
};

export default PreviewEditStatusComponent;
