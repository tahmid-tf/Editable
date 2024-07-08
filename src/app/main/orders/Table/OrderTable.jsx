import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, Pagination } from '@mui/material';
// table
import Typography from '@mui/material/Typography';
import { useState, useMemo, useEffect } from 'react';
import format from 'date-fns/format';
import clsx from 'clsx';
import FuseLoading from '@fuse/core/FuseLoading';
import { FiEdit } from 'react-icons/fi';
import { LuEye } from 'react-icons/lu';
import DataTable from 'app/shared-components/data-table/DataTable';
import { calculateRemainingDays } from 'src/app/appUtils/appUtils';
import { allColumnsData, allRowsData } from './OrdersData';
import { useGetOrdersDataQuery } from '../orderApi';
import OrderTableHeader from './OrderTableHeader';

function OrderTable() {
	const [inputValue, setInputValue] = useState('');

	// filtering state
	const [orderStatusValue, setOrderStatusValue] = useState('');
	const [paymentStatusValue, setPaymentStatusValue] = useState('');
	const [editorValue, setEditorValue] = useState('');
	const [selectedDate, setSelectedDate] = useState(null);
	const [searchValue, setSearchValue] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [rowPerPage, setRowPerPage] = useState(10);

	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const [showAll, setShowAll] = useState(false);
	const [showAllColumns, setShowAllColumns] = useState(false);
	// fetch table data
	const { data, isLoading } = useGetOrdersDataQuery({
		orderStatusValue,
		paymentStatusValue,
		editorValue,
		searchValue,
		startDate,
		endDate,
		page: currentPage,
		rowPerPage
	});
	console.log(data);

	// ================================== Table data ================================
	const requiredColumns = new Set([
		'Order Date',
		'Order ID',
		'Remaining Days',
		'Preview Edit Status',
		'Editor',
		'Payment Status',
		'Files',
		'Order Status',
		''
	]);

	const selectedColumns = allColumnsData.filter((column) => requiredColumns.has(column));

	const selectedRowsData = allRowsData.map((row) => ({
		date: row.date,
		id: row.id,
		remaining: row.remaining,
		previewstatus: row.previewstatus,
		editorName: row.editorName,
		paymentStatus: row.paymentStatus,
		files: row.files,
		orderStatus: row.orderStatus,
		icon: row.icon
	}));
	const filterRows = (rows) => {
		return rows.filter((row) => {
			const matchesSearchValue = row.id.toLowerCase().includes(searchValue.toLowerCase());
			const matchesOrderStatus =
				orderStatusValue === '' || orderStatusValue === 'Order Status' || row.orderStatus === orderStatusValue;
			const matchesPaymentStatus =
				paymentStatusValue === '' ||
				paymentStatusValue === 'Payment Status' ||
				row.paymentStatus === paymentStatusValue;
			const matchesEditor = editorValue === '' || editorValue === 'Editor' || row.editorName === editorValue;
			// Date range filter logic
			const isEmptyDateRange = !inputValue || inputValue.trim() === '';
			const isDateInRange =
				isEmptyDateRange ||
				(function () {
					const [startDateString, endDateString] = inputValue.split(' - ');
					const startDate = new Date(startDateString);
					const endDate = new Date(endDateString);
					endDate.setDate(endDate.getDate() + 1); // to make this logic workable increase one day
					// console.log("endDate", endDate);
					const rowDate = new Date(row.date);

					// Check for single day or date range (inclusive)
					return startDate.getTime() === endDate.getTime()
						? startDate.getTime() <= rowDate.getTime() // Include both start and end dates for single day selection
						: startDate.getTime() <= rowDate.getTime() && rowDate.getTime() <= endDate.getTime(); // Existing range check (inclusive)
				})();
			// Date range filter logic - end

			return matchesSearchValue && matchesOrderStatus && matchesPaymentStatus && matchesEditor && isDateInRange;
		});
	};
	const visibleColumns = showAll ? allColumnsData : selectedColumns;
	// const visibleRows = showAll ? allRowsData : selectedRowsData;
	const visibleRows = filterRows(showAll ? allRowsData : selectedRowsData);

	// Toggle checkbox state on click
	const handleClick = () => {
		setShowAll(!showAll);
	};
	// Toggle checkbox end

	// Editors
	// Extract unique editor names
	const uniqueEditors = [...new Set(selectedRowsData.map((row) => row.editorName))];
	const [editorSelectedValues, setEditorSelectedValues] = useState('Assign Editor');

	const handleEditorChange = (rowId, event) => {
		setEditorSelectedValues((prevValues) => ({
			...prevValues,
			[rowId]: event.target.value
		}));
	};

	// order status values
	const [orderStatusValues, setOrderStatusValues] = useState({});
	// console.log("osv", orderStatusValues);

	const handleOrderStatusChanges = (rowId, event) => {
		setOrderStatusValues((prevValues) => ({
			...prevValues,
			[rowId]: event.target.value
		}));
	};
	// order type
	const uniqueOrders = [...new Set(allRowsData.map((row) => row.orderType))];
	const [orderTypeValues, setOrderTypeValues] = useState({});

	const handleOrderTypeChange = (rowId, event) => {
		setOrderTypeValues((prevValues) => ({
			...prevValues,
			[rowId]: event.target.value
		}));
	};

	// Function to handle LuEye icon click
	const handleLuEyeClick = () => {
		console.log('LuEye clicked');
	};

	// Function to handle FiEdit icon click
	const handleFiEditClick = () => {
		console.log('FiEdit clicked');
	};

	//
	//

	// page navigation

	const handleChangePage = (event, newPage) => {
		setCurrentPage(newPage);
	};
	const initialColumns = [
		{
			id: 'order_date_formatted',
			accessorKey: 'order_date',
			header: 'Order Date',
			Cell: ({ row }) => format(new Date(row?.original?.order_date), 'MMM dd, y'),
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		},
		{
			accessorKey: 'order_id',
			header: 'Order ID',
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		},
		{
			id: 'remaining_days',
			accessorKey: 'order_date',
			header: 'Remaining Days',
			Cell: ({ row }) => <Box>{calculateRemainingDays(row?.original?.order_date)}/07 days</Box>,
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		},
		{
			accessorKey: 'previewstatus',
			header: 'Preview Edit Status',
			// eslint-disable-next-line react/no-unstable-nested-components
			Cell: ({ row }) => {
				// console.log({ row });

				return (
					<div
						className={clsx(
							'inline-flex items-center px-[10px] py-[2px] rounded-full tracking-wide',
							row?.original?.previewstatus === 'Approved' && 'bg-[#039855] text-white',
							row?.original?.previewstatus === 'N/A' && 'bg-[#CBCBCB] text-black',
							row?.original?.previewstatus === 'Rejected' && 'bg-[#CB1717] text-white',
							row?.original?.previewstatus === 'User Review Pending' && 'bg-[#CBCBCB] text-black',
							row?.original?.previewstatus === 'Pending' && 'bg-[#FFCC00] text-black',
							'bg-[#CBCBCB] text-black'
						)}
					>
						<div className="tracking-[0.2px] leading-[20px] font-medium">
							{/* {row?.original?.previewstatus} */}
							N/A
						</div>
					</div>
				);
			},
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		},
		{
			accessorKey: 'editor',
			header: 'Editor',
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			},
			accessorFn: (row) => `${row?.editor?.editor_name}`
		},
		{
			accessorKey: 'payment_status',
			header: 'Payment Status',
			Cell: ({ row }) => (
				<div
					className={clsx(
						'inline-flex items-center px-[10px] py-[2px] rounded-full tracking-wide',
						row?.original?.payment_status === 'successful' && 'bg-[#039855] text-white',
						row?.original?.payment_status === 'failed' && 'bg-[#CB1717] text-white',
						row?.original?.payment_status === 'pending' && 'bg-[#FFCC00] text-black'
					)}
				>
					<div className="tracking-[0.2px] leading-[20px] font-medium capitalize">
						{row?.original?.payment_status}
					</div>
				</div>
			),
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		},
		{
			accessorKey: 'files',
			header: 'Files',
			Cell: () => (
				<div
					className={clsx('inline-flex items-center px-[10px] py-[2px] tracking-wide', 'bg-black text-white')}
				>
					<button
						type="button"
						// href={row?.original?.files}
						// target="_blank"
						// download
						className="tracking-[0.2px] leading-[20px] font-medium"
						style={{
							textDecoration: 'none',
							color: 'white'
						}}
						disabled
					>
						Download
					</button>
				</div>
			),
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		},
		{
			accessorKey: 'order_status',
			header: 'Order Status',
			Cell: ({ row }) => (
				<Typography
					className={clsx(
						'inline-flex items-center px-10 py-2 rounded-full tracking-wide ',
						(orderStatusValues[row.id] || row?.original?.order_status) === 'pending' &&
							'bg-[#FFCC00] text-black',
						(orderStatusValues[row.id] || row?.original?.order_status) === 'completed' &&
							'bg-[#039855] text-white ',
						(orderStatusValues[row.id] || row?.original?.order_status) === 'cancelled' &&
							'bg-[#CB1717] text-white',
						(orderStatusValues[row.id] || row?.original?.order_status) === 'preview' &&
							'bg-[#CBCBCB] text-Black'
					)}
				>
					<select
						value={row?.original?.order_status}
						onChange={(event) => handleOrderStatusChanges(row.id, event)}
						className={clsx(
							'inline-flex items-center tracking-wide ',
							(orderStatusValues[row.id] || row?.original?.order_status) === 'pending' &&
								'bg-[#FFCC00] text-black',
							(orderStatusValues[row.id] || row?.original?.order_status) === 'completed' &&
								'bg-[#039855] text-white ',
							(orderStatusValues[row.id] || row?.original?.order_status) === 'cancelled' &&
								'bg-[#CB1717] text-white',
							(orderStatusValues[row.id] || row?.original?.order_status) === 'preview' &&
								'bg-[#CBCBCB] text-Black'
						)}
						defaultChecked={row?.original?.order_status}
					>
						<option
							className="bg-white text-black"
							value="pending"
						>
							Pending
						</option>
						<option
							className="bg-white text-black"
							value="completed"
						>
							Completed
						</option>
						<option
							className="bg-white text-black"
							value="cancelled"
						>
							Cancelled
						</option>
						<option
							className="bg-white text-black"
							value="preview"
						>
							Preview Edit
						</option>
					</select>
				</Typography>
			),
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		}
	];
	const additionalColumns = [
		{
			index: 2,
			accessorKey: 'order_name',
			header: 'Order Name',
			Cell: ({ row }) => row?.original?.order_name,
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		},
		{
			index: 3,
			accessorKey: 'order_type',
			header: 'Order Type',
			Cell: ({ row }) => row?.original?.order_type,
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		},
		{
			index: 4,
			accessorKey: 'users_name',
			header: 'Order Name',
			Cell: ({ row }) => row?.original?.users_name,
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		},
		{
			index: 5,
			accessorKey: 'users_email',
			header: 'Order Email',
			Cell: ({ row }) => row?.original?.users_email,
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		},
		{
			index: 6,
			accessorKey: 'users_phone',
			header: 'Order Email',
			Cell: ({ row }) => row?.original?.users_phone,
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		},
		{
			index: 7,
			accessorKey: 'delivery_date',
			header: 'Delivery Date',
			Cell: ({ row }) => row?.original?.delivery_date,
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		},
		{
			index: 8,
			accessorKey: 'amount',
			header: 'Price',
			Cell: ({ row }) => row?.original?.amount,
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		},
		{
			index: 14,
			accessorKey: 'download',
			header: 'Download Link',
			Cell: ({ row }) => (
				<div
					className={clsx('inline-flex items-center px-[10px] py-[2px] tracking-wide', 'bg-black text-white')}
				>
					<button
						type="button"
						// href={row?.original?.files}
						// target="_blank"
						// download
						className="tracking-[0.2px] leading-[20px] font-medium"
						style={{
							textDecoration: 'none',
							color: 'white'
						}}
						disabled
					>
						Download
					</button>
				</div>
			),
			muiTableHeadCellProps: {
				align: 'center'
			},
			muiTableBodyCellProps: {
				align: 'center'
			}
		}
	];

	const [columns, setColumns] = useState(initialColumns);

	const memoizedColumns = useMemo(() => columns, [columns, data, isLoading]);
	const initialColumnOrder = [
		'order_date_formatted',
		'order_id',
		'remaining_days',
		'previewstatus',
		'editor',
		'order_status',
		'payment_status',
		'files',
		'mrt-row-select'
	];

	const [columnOrder, setColumnOrder] = useState(initialColumnOrder);
	const handleAllColumns = (showAllColumns) => {
		if (showAllColumns) {
			const updatedColumns = [...initialColumns, ...additionalColumns];
			const updatedColumnOrder = [...initialColumnOrder];
			setColumns(updatedColumns);

			additionalColumns.forEach((addColl) => {
				updatedColumnOrder.splice(addColl.index, 0, addColl.accessorKey);
			});
			setColumnOrder(updatedColumnOrder);
		} else {
			setColumns(initialColumns);
		}
	};
	useEffect(() => {
		if (data?.data) {
			setCurrentPage(Number(data?.data?.current_page));
			setRowPerPage(Number(data?.data?.per_page));
		}
	}, [data]);

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<div className="">
			<div>
				<p className="text-[20px] font-bold text-[#868686] py-36">Orders</p>
			</div>

			<OrderTableHeader
				orderStatus={orderStatusValue}
				paymentStatus={paymentStatusValue}
				search={searchValue}
				editor={editorValue}
				setOrderStatus={setOrderStatusValue}
				setPaymentStatus={setPaymentStatusValue}
				setEditor={setEditorValue}
				setSearch={setSearchValue}
				setStartDate={setStartDate}
				setEndDate={setEndDate}
				totalOrder={data?.total_orders_count}
				completeOrder={data?.completed_orders_count}
				pendingOrder={data?.pending_orders_count}
				handleAllColumns={handleAllColumns}
				setShowAllColumns={setShowAllColumns}
				showAllColumns={showAllColumns}
			/>
			<DataTable
				isLoading={isLoading}
				data={data?.data?.data}
				state={{
					columnOrder
				}}
				columns={memoizedColumns}
				enableColumnActions={false}
				enableGrouping={false}
				enableColumnDragging={false}
				enableRowSelection={false}
				enableTopToolbar={false}
				enablePagination={false}
				enableBottomToolbar={false}
				renderRowActions={() => (
					<div className="flex gap-5">
						<button
							type="button"
							onClick={handleLuEyeClick}
						>
							<LuEye size={20} />
						</button>
						<button
							type="button"
							onClick={handleFiEditClick}
						>
							<FiEdit size={18} />
						</button>
					</div>
				)}
			/>

			<div className="py-36">
				<div className="flex justify-center items-center">
					<Pagination
						count={data?.data?.last_page}
						color="primary"
						page={currentPage}
						onChange={handleChangePage}
						variant="text"
						shape="rounded"
					/>
					<Select
						sx={{
							width: 70,
							height: 5,
							pt: '5px'
						}}
						variant="outlined"
						value={rowPerPage}
						onChange={(e) => setRowPerPage(e.target.value)}
					>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={20}>20</MenuItem>
						<MenuItem value={30}>30</MenuItem>
					</Select>
				</div>
			</div>
		</div>
	);
}

export default OrderTable;
