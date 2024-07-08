import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import {
	Box,
	DialogActions,
	Grid,
	Menu,
	Modal,
	Checkbox,
	Pagination,
	TextField,
	InputAdornment,
	IconButton
} from '@mui/material';
// table
import Typography from '@mui/material/Typography';
import { memo, useState, useMemo, useCallback, useEffect } from 'react';
import format from 'date-fns/format';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import FuseLoading from '@fuse/core/FuseLoading';
import { FiEdit } from 'react-icons/fi';
import { LuEye } from 'react-icons/lu';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import DataTable from 'app/shared-components/data-table/DataTable';
import { DateField, LocalizationProvider, usePickersTranslations } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import useId from '@mui/material/utils/useId';
import _ from 'lodash';
import {
	datePickerShortcutsItems,
	editorOptions,
	orderStatusOptions,
	paymentStatusOptions
} from 'src/app/appUtils/constant';
import GeneralinfoForm from '../newOrder/GeneralinfoForm';
import { allColumnsData, allRowsData } from './OrdersData';
import { useGetOrdersDataQuery } from '../orderApi';

function CustomActionBar(props) {
	const { onAccept, onClear, onCancel, onSetToday, actions, className } = props;
	const translations = usePickersTranslations();
	const [anchorEl, setAnchorEl] = useState();
	const open = Boolean(anchorEl);
	const id = useId();

	if (actions == null || actions.length === 0) {
		return null;
	}

	const menuItems = actions?.map((actionType) => {
		switch (actionType) {
			case 'clear':
				return (
					<MenuItem
						data-mui-test="clear-action-button"
						onClick={() => {
							onClear();
							setAnchorEl(null);
						}}
						key={actionType}
					>
						{translations.clearButtonLabel}
					</MenuItem>
				);
			case 'cancel':
				return (
					<MenuItem
						onClick={() => {
							setAnchorEl(null);
							onCancel();
						}}
						key={actionType}
					>
						{translations.cancelButtonLabel}
					</MenuItem>
				);
			case 'accept':
				return (
					<MenuItem
						onClick={() => {
							setAnchorEl(null);
							onAccept();
						}}
						key={actionType}
					>
						{translations.okButtonLabel}
					</MenuItem>
				);
			case 'today':
				return (
					<MenuItem
						data-mui-test="today-action-button"
						onClick={() => {
							setAnchorEl(null);
							onSetToday();
						}}
						key={actionType}
					>
						{translations.todayButtonLabel}
					</MenuItem>
				);
			default:
				return null;
		}
	});

	return (
		<DialogActions className={className}>
			<Button
			// id={`picker-actions-${id}`}
			// aria-controls={open ? 'basic-menu' : undefined}
			// aria-haspopup="true"
			// aria-expanded={open ? 'true' : undefined}
			// onClick={(event) => setAnchorEl(event.currentTarget)}
			>
				Actions
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={() => setAnchorEl(null)}
				MenuListProps={{
					'aria-labelledby': `picker-actions-${id}`
				}}
			>
				{menuItems}
			</Menu>
		</DialogActions>
	);
}

const AnotherCustomComp = (props) => {
	const { className, ownerState, setDateValue, dateValue, setOpenDate } = props;
	console.log({ props });
	return (
		<DialogActions
			className={className}
			sx={{ borderTop: '1px solid #e2e8f0', justifyContent: 'space-between', px: 5, pt: 2 }}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
				<DateField
					label="Start Date"
					defaultValue={dayjs(dateValue[0] || new Date())}
					format="LL"
					sx={{
						width: '10em',
						height: '3em'
					}}
					onChange={(value) => setDateValue([value, dateValue[1]])}
					value={dateValue[0]}
				/>
				<Box>-</Box>
				<DateField
					label="End Date"
					defaultValue={dayjs(dateValue[1] || new Date())}
					onChange={(value) => setDateValue([dateValue[0], value])}
					value={dateValue[1]}
					format="LL"
					sx={{
						width: '10em',
						height: '3em'
					}}
				/>
			</Box>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<Button
					variant="outlined"
					sx={{ borderRadius: '8px' }}
					onClick={() => setOpenDate(false)}
				>
					Cancel
				</Button>
				<Button
					variant="contained"
					color="primary"
					sx={{ borderRadius: '8px' }}
					onClick={() => setOpenDate(false)}
				>
					Apply
				</Button>
			</Box>
		</DialogActions>
	);
};

const OrderTableHeader = ({
	search,
	setSearch,
	orderStatus,
	setOrderStatus,
	paymentStatus,
	setPaymentStatus,
	editor,
	setEditor
}) => {
	const [newOrderOpen, setNewOrderOpen] = useState(false);
	const [openDate, setOpenDate] = useState(false);
	const [dateValue, setDateValue] = useState([dayjs(new Date()), dayjs(new Date())]);
	const [searchInputValue, setSearchInputValue] = useState(search);

	const handleNewOrderOpen = () => {
		setNewOrderOpen(true);
	};
	const handleNewOrderClose = () => {
		setNewOrderOpen(false);
	};

	const debouncedHandleSearchChange = useCallback(
		_.debounce((value) => {
			setSearch(value);
		}, 500),
		[]
	);

	const handleSearchChange = (e) => {
		setSearchInputValue(e.target.value);
		debouncedHandleSearchChange(e.target.value);
	};
	useEffect(() => {
		return () => {
			debouncedHandleSearchChange.cancel();
		};
	}, [debouncedHandleSearchChange]);
	return (
		<div className="">
			<Grid
				container
				spacing={2}
				className="py-10"
			>
				<Grid
					item
					xs={3}
				>
					<TextField
						label="Search"
						name="search"
						value={searchInputValue}
						onChange={handleSearchChange}
					/>
				</Grid>
				<Grid
					item
					xs={2}
				>
					<FormControl fullWidth>
						<InputLabel id="order-status-label">Order Status</InputLabel>
						<Select
							labelId="order-status-label"
							id="orderStatus"
							name="orderStatus"
							value={orderStatus}
							label="Order Status"
							onChange={(e) => setOrderStatus(e.target.value)}
							sx={{
								'& .MuiSelect-select': {
									backgroundColor: 'white',
									borderRadius: '4px'
								},
								width: '12em'
							}}
						>
							{orderStatusOptions.map((option, i) => (
								<MenuItem
									key={i}
									value={option.value}
								>
									{option.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid
					item
					xs={2}
				>
					<FormControl fullWidth>
						<InputLabel id="payment-status-label">Payment Status</InputLabel>
						<Select
							labelId="payment-status-label"
							id="paymentStatus"
							name="paymentStatus"
							value={paymentStatus}
							label="Payment Status"
							onChange={(e) => setPaymentStatus(e.target.value)}
							sx={{
								'& .MuiSelect-select': {
									backgroundColor: 'white',
									borderRadius: '4px'
								},
								width: '12em'
							}}
						>
							{paymentStatusOptions.map((option, i) => (
								<MenuItem
									key={i}
									value={option.value}
								>
									{option.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid
					item
					xs={2}
				>
					<FormControl fullWidth>
						<InputLabel id="editor-label">Editor</InputLabel>
						<Select
							labelId="editor-label"
							id="editor"
							name="editor"
							value={editor}
							label="Editor"
							sx={{
								'& .MuiSelect-select': {
									backgroundColor: 'white',
									borderRadius: '4px'
								},
								width: '12em'
							}}
							onChange={(e) => setEditor(e.target.value)}
						>
							{editorOptions.map((option, i) => (
								<MenuItem
									key={i}
									value={option.value}
								>
									{option.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid
					item
					xs={2}
				>
					<div>
						<TextField
							label="Select Date Range"
							placeholder="MM-DD-YYYY"
							variant="outlined"
							fullWidth
							sx={{
								pl: 0,
								'& > .MuiInputBase-root': {
									paddingRight: 1
								}
							}}
							// disabled
							onClick={() => setOpenDate(true)}
							// value={inputValue}
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										sx={{ p: 0 }}
									>
										<IconButton
											sx={{ p: 0 }}
											// onClick={handleOpen}
										>
											<CalendarTodayIcon />
										</IconButton>
									</InputAdornment>
								)
							}}
						/>
					</div>
				</Grid>
				<Grid
					item
					xs={1}
				>
					<Button
						variant="contained"
						size="small"
						sx={{
							width: '100%',
							height: '48px',
							borderRadius: '4px',
							backgroundColor: '#146ef5ef',
							color: 'white',
							':hover': {
								backgroundColor: '#0066ff',
								color: 'white'
							},
							whiteSpace: 'nowrap'
						}}
						onClick={handleNewOrderOpen}
					>
						New Orders
					</Button>
				</Grid>
			</Grid>
			<div className="flex justify-between py-20">
				<div className="flex">
					<div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0 text-lg font-400">
						<span>Total Orders:</span>
						<b> 100</b>
					</div>
					<Typography
						className="font-medium mx-20"
						color="text.secondary"
					>
						|
					</Typography>
					<div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0  text-lg font-400">
						<span>Completed Orders:</span>
						<b> 80</b>
					</div>

					<Typography
						className="font-medium mx-20"
						color="text.secondary"
					>
						|
					</Typography>
					<div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0  text-lg font-400">
						<span>Pending Orders:</span>
						<b> 10</b>
					</div>
				</div>
				<div
					className="flex items-center cursor-pointer"
					// onClick={handleClick}
					aria-hidden="true"
				>
					<Checkbox
						// checked={showAll}
						size="small"
					/>
					<Typography
						className="font-medium"
						color="text.secondary"
					>
						Show all columns
					</Typography>
				</div>
			</div>
			<Modal
				open={openDate}
				onClose={() => setOpenDate(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className="flex justify-center items-center "
			>
				<Box
					className="bg-white flex justify-center items-center"
					sx={{
						borderRadius: 4
					}}
				>
					{/* <h1>Modal</h1> */}
					{/* <GeneralinfoForm
						onClose={handleNewOrderClose}
						// successAlert={successAlert}
					/> */}
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<StaticDateRangePicker
							slotProps={{
								shortcuts: {
									items: datePickerShortcutsItems,
									sx: {
										borderRight: '1px solid #e2e8f0'
									}
								},
								toolbar: { hidden: true },
								actionBar: { dateValue, setDateValue, setOpenDate }
							}}
							slots={{
								actionBar: AnotherCustomComp
							}}
							calendars={2}
							// currentMonthCalendarPosition={2}
							// disableAutoMonthSwitching
							// disableHighlightToday
							onChange={(value) => setDateValue(value)}
							value={dateValue}
							sx={{
								borderRadius: 4,
								padding: 2
								// '& > .MuiPickersLayout-contentWrapper > .MuiDateRangeCalendar-root > div:first-of-type':
								// 	{
								// 		display: 'none'
								// 	}
							}}
						/>
					</LocalizationProvider>
				</Box>
			</Modal>
			<Modal
				open={newOrderOpen}
				onClose={handleNewOrderClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className="flex justify-center items-center"
			>
				<div className="bg-white flex justify-center items-center">
					{/* <h1>Modal</h1> */}
					<GeneralinfoForm
						onClose={handleNewOrderClose}
						// successAlert={successAlert}
					/>
				</div>
			</Modal>
		</div>
	);
};

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

	const [showAll, setShowAll] = useState(false);

	console.log({
		orderStatusValue,
		paymentStatusValue,
		editorValue,
		searchValue
	});
	// fetch table data
	const { data, isLoading } = useGetOrdersDataQuery({
		orderStatusValue,
		paymentStatusValue,
		editorValue,
		searchValue,
		page: currentPage,
		rowPerPage
	});
	console.log(data?.data);

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

	const columns = useMemo(
		() => [
			{
				accessorKey: 'order_date',
				header: 'Order Date',
				size: 64,
				accessorFn: (row) => `${format(new Date(row.order_date), 'MMM dd, y')}`,
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
				accessorKey: 'id',
				header: 'Remaining Days',
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
								row?.original?.previewstatus === 'Pending' && 'bg-[#FFCC00] text-black'
							)}
						>
							<div className="tracking-[0.2px] leading-[20px] font-medium">
								{row?.original?.previewstatus}
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
						className={clsx(
							'inline-flex items-center px-[10px] py-[2px] tracking-wide',
							'bg-black text-white'
						)}
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
							(orderStatusValues[row.id] || row?.original?.order_status) === 'preview Edit' &&
								'bg-[#CBCBCB] text-Black'
						)}
					>
						<select
							value={orderStatusValues[row.id] || row?.original?.order_status}
							onChange={(event) => handleOrderStatusChanges(row.id, event)}
							className={clsx(
								'inline-flex items-center tracking-wide ',
								(orderStatusValues[row.id] || row?.original?.order_status) === 'pending' &&
									'bg-[#FFCC00] text-black',
								(orderStatusValues[row.id] || row?.original?.order_status) === 'completed' &&
									'bg-[#039855] text-white ',
								(orderStatusValues[row.id] || row?.original?.order_status) === 'cancelled' &&
									'bg-[#CB1717] text-white',
								(orderStatusValues[row.id] || row?.original?.order_status) === 'preview Edit' &&
									'bg-[#CBCBCB] text-Black'
							)}
						>
							<option
								className="bg-white text-black"
								value="Pending"
							>
								Pending
							</option>
							<option
								className="bg-white text-black"
								value="Completed"
							>
								Completed
							</option>
							<option
								className="bg-white text-black"
								value="Cancelled"
							>
								Cancelled
							</option>
							<option
								className="bg-white text-black"
								value="Preview Edit"
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
		],
		[data, isLoading]
	);

	useEffect(() => {
		setCurrentPage(Number(data?.data?.current_page));
		setRowPerPage(Number(data?.data?.per_page));
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
			/>
			<DataTable
				isLoading={isLoading}
				data={data?.data?.data}
				columns={columns}
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
