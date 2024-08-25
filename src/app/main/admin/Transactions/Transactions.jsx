import { useMemo, useState } from 'react';
import { useGetAllTransactionsQuery } from './TransactionsApi';
import FuseLoading from '@fuse/core/FuseLoading';
import { MenuItem, Pagination, Select } from '@mui/material';
import DataTable from 'app/shared-components/data-table/DataTable';
import { format } from 'date-fns';
import TransactionTableHeader from './TransactionTableHeader';
import { formatDateAndId } from 'src/app/appUtils/appUtils';

const Transactions = () => {
	// filtering state
	const [orderStatusValue, setOrderStatusValue] = useState('');
	const [paymentStatusValue, setPaymentStatusValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [rowPerPage, setRowPerPage] = useState(10);

	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const { data, isLoading } = useGetAllTransactionsQuery({
		searchValue,
		paymentStatusValue,
		orderStatusValue,
		page: currentPage,
		rowPerPage,
		startDate,
		endDate
	});
	const columns = [
		{
			id: 'date_formatted',
			accessorKey: 'created_at',
			header: 'Date',
			Cell: ({ row }) => format(new Date(row?.original?.created_at), 'MMM dd, y')
		},
		{
			id: 'transaction_id',
			accessorKey: 'transaction_id',
			header: 'Transaction ID',
			Cell: ({ row }) => `${row?.original?.transaction_id}`
		},
		{
			id: 'order_id',
			accessorKey: 'order_id',
			header: 'Order ID',
			Cell: ({ row }) => `${formatDateAndId(row?.original?.created_at, row?.original?.order_id)}`
		},
		{
			id: 'users_email',
			accessorKey: 'users_email',
			header: 'Customer Email',
			Cell: ({ row }) => `${row?.original?.users_email}`
		},
		{
			id: 'order_status',
			accessorKey: 'order_status',
			header: 'Order Status',
			Cell: ({ row }) => (
				<div className="inline-flex items-center px-[10px] py-[2px] rounded-full tracking-wide bg-[#CBCBCB] text-black capitalize">
					<div className="tracking-[0.2px] leading-[20px] font-medium">{row?.original?.order_status}</div>
				</div>
			)
		},
		{
			id: 'payment_status',
			accessorKey: 'payment_status',
			header: 'Payment Status',
			Cell: ({ row }) => (
				<div className="inline-flex items-center px-[10px] py-[2px] rounded-full tracking-wide bg-[#CBCBCB] text-black capitalize">
					<div className="tracking-[0.2px] leading-[20px] font-medium">{row?.original?.payment_status}</div>
				</div>
			)
		},
		{
			id: 'amount',
			accessorKey: 'amount',
			header: 'Amount',
			Cell: ({ row }) => `${row?.original?.amount}`
		}
	];

	const memoizedColumns = useMemo(() => columns, [columns, data, isLoading]);

	const handleChangePage = (event, newPage) => {
		setCurrentPage(newPage);
	};
	if (isLoading) {
		return <FuseLoading />;
	}
	return (
		<div>
			<div className="bg-white px-[26px]">
				<div>
					<p className="text-[20px] font-bold text-[#868686] py-36">Orders</p>
				</div>

				<DataTable
					isLoading={isLoading}
					data={data?.data?.data}
					columns={memoizedColumns}
					enableColumnActions={false}
					enableGrouping={false}
					enableColumnDragging={false}
					enableRowSelection={false}
					enableTopToolbar={true}
					enablePagination={false}
					enableBottomToolbar={false}
					enableColumnResizing={false}
					enableRowActions={false}
					muiTableBodyProps={{
						sx: {
							//stripe the rows, make odd rows a darker color
							'& tr:hover > td:after': {
								backgroundColor: 'transparent !important'
							}
						}
					}}
					renderTopToolbar={() => (
						<TransactionTableHeader
							search={searchValue}
							setSearch={setSearchValue}
							orderStatus={orderStatusValue}
							setOrderStatus={setOrderStatusValue}
							paymentStatus={paymentStatusValue}
							setPaymentStatus={setPaymentStatusValue}
							startDate={startDate}
							setStartDate={setStartDate}
							endDate={endDate}
							setEndDate={setEndDate}
							totalTransactions={data?.total_transactions}
							successfulTransactions={data?.successful_transactions}
							totalAmount={data?.total_successful_transaction_amount}
							page={currentPage}
							setPage={setCurrentPage}
							rowPerPage={rowPerPage}
						/>
					)}
				/>

				<div className="py-36">
					<div className="flex justify-center items-center">
						<Pagination
							count={data?.data?.last_page}
							page={currentPage}
							onChange={handleChangePage}
							variant="text"
							shape="rounded"
							sx={{
								'& .MuiPaginationItem-root': {
									// color: '#0066ff',
									'&.Mui-selected': {
										backgroundColor: '#0066ff',
										color: 'white'
									},
									'&.Mui-selected:hover': {
										bgcolor: '#0066ff'
									},
									'& button:hover': {
										backgroundColor: 'rgba(0, 102, 255, 0.1)'
									}
								}
							}}
						/>
						<Select
							sx={{
								width: 70,
								height: 5,
								pt: '5px'
							}}
							variant="outlined"
							value={rowPerPage}
							onChange={(e) => {
								setRowPerPage(e.target.value);
								setPage(1);
							}}
						>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={30}>30</MenuItem>
						</Select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Transactions;
