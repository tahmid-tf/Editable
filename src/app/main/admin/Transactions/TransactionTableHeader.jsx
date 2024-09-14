import { Typography, Box } from '@mui/material';
import TableFilterComponent from 'app/shared-components/data-table/TableFilterComponent';
import { useState } from 'react';
import { exportCSV } from 'src/app/appUtils/apiUtils';
import jwtAuthConfig from 'src/app/auth/services/jwt/jwtAuthConfig';

const TransactionTableHeader = ({
	search,
	setSearch,
	orderStatus,
	setOrderStatus,
	paymentStatus,
	setPaymentStatus,
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	totalTransactions,
	successfulTransactions,
	totalAmount,
	setPage
}) => {
	const token = localStorage.getItem(jwtAuthConfig.tokenStorageKey);
	const [dateValue, setDateValue] = useState([]);
	const handleResetFilter = () => {
		setSearch('');
		setOrderStatus('');
		setPaymentStatus('');
		setStartDate('');
		setEndDate('');
		setPage(1);
		setDateValue([]);
	};
	return (
		<Box py={2}>
			<TableFilterComponent
				search={search}
				setSearch={setSearch}
				orderStatus={orderStatus}
				setOrderStatus={setOrderStatus}
				paymentStatus={paymentStatus}
				setPaymentStatus={setPaymentStatus}
				setStartDate={setStartDate}
				setEndDate={setEndDate}
				setPage={setPage}
				dateValue={dateValue}
				setDateValue={setDateValue}
				handleActionButtonClick={() =>
					exportCSV(
						'admin/transaction_export',
						{
							email: search,
							order_status: orderStatus,
							payment_status: paymentStatus,
							start_date: startDate,
							end_date: endDate
						},
						'transaction_data'
					)
				}
				actionBtnText={'Export CSV'}
			/>

			<div className="flex justify-between py-20">
				<div className="flex">
					<div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0 text-lg font-400">
						<span>Total Transactions:</span>
						<b> {totalTransactions}</b>
					</div>
					<Typography
						className="font-medium mx-20"
						color="text.secondary"
					>
						|
					</Typography>
					<div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0  text-lg font-400">
						<span>Successful Transactions:</span>
						<b> {successfulTransactions}</b>
					</div>

					<Typography
						className="font-medium mx-20"
						color="text.secondary"
					>
						|
					</Typography>
					<div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0  text-lg font-400">
						<span>Total Amount:</span>
						<b> ${totalAmount}</b>
					</div>
				</div>
				<span
					className="cursor-pointer underline text-[#0066ff]"
					onClick={handleResetFilter}
				>
					Reset Filter
				</span>
			</div>
		</Box>
	);
};

export default TransactionTableHeader;
