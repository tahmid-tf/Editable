import { Checkbox, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import GeneralinfoForm from '../newOrder/GeneralinfoForm';
import TableFilterComponent from 'app/shared-components/data-table/TableFilterComponent';
import { useSelector } from 'react-redux';
import { selectUserRole } from 'src/app/auth/user/store/userSlice';
import UserOrderModal from './UserOrderModal';

const OrderTableHeader = ({
	search,
	setSearch,
	orderStatus,
	setOrderStatus,
	paymentStatus,
	setPaymentStatus,
	editor,
	setEditor,
	setStartDate,
	setEndDate,
	totalOrder,
	pendingOrder,
	completeOrder,
	handleAllColumns,
	showAllColumns,
	setShowAllColumns,
	onOrderSubmit,
	setPage,
	setAllStyleData,
	editorData
}) => {
	const userRole = useSelector(selectUserRole);
	const [newOrderOpen, setNewOrderOpen] = useState(false);
	const [newUserOrderOpen, setNewUserOrderOpen] = useState(false);
	const [dateValue, setDateValue] = useState([]);

	const handleNewOrderOpen = () => {
		userRole.includes('admin') ? setNewOrderOpen(true) : setNewUserOrderOpen(true);
	};
	const handleNewOrderClose = () => {
		userRole.includes('admin') ? setNewOrderOpen(false) : setNewUserOrderOpen(false);
	};

	const handleClick = () => {
		setShowAllColumns((prev) => {
			handleAllColumns(!prev);
			return !prev;
		});
	};
	const handleResetFilter = () => {
		setSearch('');
		setOrderStatus('');
		setPaymentStatus('');
		setEditor('');
		setStartDate('');
		setEndDate('');
		setPage(1);
		setDateValue([]);
	};
	return (
		<div className="">
			<TableFilterComponent
				editorData={editorData}
				search={search}
				setSearch={setSearch}
				orderStatus={orderStatus}
				setOrderStatus={setOrderStatus}
				paymentStatus={paymentStatus}
				setPaymentStatus={setPaymentStatus}
				editor={userRole?.includes('admin') ? editor : undefined}
				setEditor={setEditor}
				setStartDate={setStartDate}
				setEndDate={setEndDate}
				setPage={setPage}
				handleActionButtonClick={handleNewOrderOpen}
				actionBtnText={'New Order'}
				dateValue={dateValue}
				setDateValue={setDateValue}
			/>

			<div className="flex justify-between py-20">
				<div className="flex">
					<div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0 text-lg font-400">
						<span>Total Orders:</span>
						<b> {totalOrder}</b>
					</div>
					<Typography
						className="font-medium mx-20"
						color="text.secondary"
					>
						|
					</Typography>
					<div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0  text-lg font-400">
						<span>Completed Orders:</span>
						<b> {completeOrder}</b>
					</div>

					<Typography
						className="font-medium mx-20"
						color="text.secondary"
					>
						|
					</Typography>
					<div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0  text-lg font-400">
						<span>Pending Orders:</span>
						<b> {pendingOrder}</b>
					</div>
				</div>
				<div className="flex items-center">
					<div
						className="flex items-center cursor-pointer"
						onClick={handleClick}
						aria-hidden="true"
					>
						<Checkbox
							checked={showAllColumns}
							size="small"
						/>
						<Typography
							className="font-medium"
							color="text.secondary"
						>
							Show all columns
						</Typography>
					</div>
					<Typography
						className="font-medium mx-20"
						color="text.secondary"
					>
						|
					</Typography>
					<span
						className="cursor-pointer underline text-[#0066ff]"
						onClick={handleResetFilter}
					>
						Reset Filter
					</span>
				</div>
			</div>
			{userRole.includes('admin') ? (
				<Modal
					open={newOrderOpen}
					onClose={handleNewOrderClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
					className="flex justify-center items-center"
				>
					<div className="bg-white flex justify-center items-center rounded-[4px]">
						{/* <h1>Modal</h1> */}
						<GeneralinfoForm
							onClose={handleNewOrderClose}
							onOrderSubmit={onOrderSubmit}
							setAllStyleData={setAllStyleData}
							// successAlert={successAlert}
						/>
					</div>
				</Modal>
			) : (
				<UserOrderModal
					handleNewOrderClose={handleNewOrderClose}
					newUserOrderOpen={newUserOrderOpen}
					setAllStyleData={setAllStyleData}
					onOrderSubmit={onOrderSubmit}
				/>
			)}
		</div>
	);
};

export default OrderTableHeader;
