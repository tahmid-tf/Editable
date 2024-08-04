import { Typography, Box } from '@mui/material';
import TableFilterComponent from 'app/shared-components/data-table/TableFilterComponent';

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
	setPage,
	page,
	rowPerPage,
	triggerExportCSV
}) => {
	const handleExportCSV = async () => {
		try {
			const response = await triggerExportCSV({
				searchValue: search,
				paymentStatusValue: paymentStatus,
				orderStatusValue: orderStatus,
				startDate,
				endDate
			});

			// Check if the call was successful
			if (response.data) {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', `${Date.now()}.xlsx`);
				document.body.appendChild(link);
				link.click();
				link.remove();
				window.URL.revokeObjectURL(url);
			} else {
				console.error('Error downloading file:', response.error);
			}
		} catch (e) {
			console.error('An unexpected error occurred:', e);
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
