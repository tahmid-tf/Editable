import {
	Box,
	Button,
	Checkbox,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import {
	datePickerShortcutsItems,
	editorOptions,
	orderStatusOptions,
	paymentStatusOptions
} from 'src/app/appUtils/constant';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import _ from 'lodash';
import CustomActionComponent from './CustomActoinComponents';
import GeneralinfoForm from '../newOrder/GeneralinfoForm';

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
	setAllStyleData
}) => {
	const [newOrderOpen, setNewOrderOpen] = useState(false);
	const [openDate, setOpenDate] = useState(false);
	const [dateValue, setDateValue] = useState([]);

	const [searchInputValue, setSearchInputValue] = useState(search);

	const handleNewOrderOpen = () => {
		setNewOrderOpen(true);
	};
	const handleNewOrderClose = () => {
		setNewOrderOpen(false);
	};

	const handleClick = () => {
		setShowAllColumns((prev) => {
			handleAllColumns(!prev);
			return !prev;
		});
	};

	const debouncedHandleSearchChange = useCallback(
		_.debounce((value) => {
			setSearch(value);
			setPage(1);
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
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
				<TextField
					label="Search"
					name="search"
					value={searchInputValue}
					onChange={handleSearchChange}
				/>
				<Box
					display={'flex'}
					gap={2}
					alignItems={'center'}
				>
					<FormControl fullWidth>
						<InputLabel id="order-status-label">Order Status</InputLabel>
						<Select
							labelId="order-status-label"
							id="orderStatus"
							name="orderStatus"
							value={orderStatus}
							label="Order Status"
							onChange={(e) => {
								setOrderStatus(e.target.value);
								setPage(1);
							}}
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
					<FormControl fullWidth>
						<InputLabel id="payment-status-label">Payment Status</InputLabel>
						<Select
							labelId="payment-status-label"
							id="paymentStatus"
							name="paymentStatus"
							value={paymentStatus}
							label="Payment Status"
							onChange={(e) => {
								setPaymentStatus(e.target.value);
								setPage(1);
							}}
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
							onChange={(e) => {
								setEditor(e.target.value);
								setPage(1);
							}}
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
					<Box
						onClick={() => setOpenDate(true)}
						width={'100%'}
					>
						<TextField
							label="Order Date"
							placeholder="MM-DD-YYYY"
							variant="outlined"
							fullWidth
							sx={{
								pl: 0,
								'& > .MuiInputBase-root': {
									paddingRight: 1
								},
								'& > .MuiInputBase-root > .MuiInputBase-input': {
									paddingLeft: 1
								}
							}}
							focused={false}
							value={`${dateValue[0] ? `${dayjs(dateValue[0]).format('DD/MM/YY')} - ` : ''}${dateValue[1] ? `${dayjs(dateValue[1]).format('DD/MM/YY')}` : ''}`}
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
					</Box>
					<Box>
						<Button
							variant="contained"
							size="large"
							sx={{
								width: '6em',
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
							New Order
						</Button>
					</Box>
				</Box>
			</Box>

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
								actionBar: { dateValue, setDateValue, setOpenDate, setStartDate, setEndDate, setPage }
							}}
							slots={{
								actionBar: CustomActionComponent
							}}
							calendars={2}
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
		</div>
	);
};

export default OrderTableHeader;
