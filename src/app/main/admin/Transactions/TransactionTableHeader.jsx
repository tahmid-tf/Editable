import { Typography, Box } from '@mui/material';
import TableFilterComponent from 'app/shared-components/data-table/TableFilterComponent';
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
	const handleExportCSV = async () => {
		try {
			const response = await fetch(
				`http://13.234.232.10/api/admin/transaction_export?${search ? `&&email=${search}` : ''}${orderStatus ? `&&order_status=${orderStatus}` : ''}${paymentStatus ? `&&payment_status=${paymentStatus}` : ''}${startDate ? `&&start_date=${startDate}` : ''}${endDate ? `&&end_date=${endDate}` : ''}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
						authorization: `Bearer ${token}`
					}
				}
			);

			if (response.ok) {
				const blob = await response.blob();
				const url = window.URL.createObjectURL(new Blob([blob]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', 'users_data.xlsx');
				document.body.appendChild(link);
				link.click();
				link.parentNode.removeChild(link);
			} else {
				console.error('Failed to download file:', response.statusText);
			}
		} catch (error) {
			console.error('Error while fetching the file:', error);
		}
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
				handleActionButtonClick={handleExportCSV}
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
			</div>
		</Box>
	);
};

export default TransactionTableHeader;
