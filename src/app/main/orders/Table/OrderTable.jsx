import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, Pagination, Tooltip } from '@mui/material';
// table
import Typography from '@mui/material/Typography';
import { useState, useMemo, useEffect } from 'react';
import format from 'date-fns/format';
import clsx from 'clsx';
import FuseLoading from '@fuse/core/FuseLoading';
import { FiEdit } from 'react-icons/fi';
import { LuEye } from 'react-icons/lu';
import DataTable from 'app/shared-components/data-table/DataTable';
import { calculateDeliveryDays, calculateRemainingDays, formatDateAndId } from 'src/app/appUtils/appUtils';
import { useGetOrdersDataQuery, useUpdateOrderStatusMutation } from '../orderApi';
import OrderTableHeader from './OrderTableHeader';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';
import { AiFillInfoCircle } from 'react-icons/ai';
import dayjs from 'dayjs';
import OrderDetailsModal from './OrderDetailsModal';
import { useParams } from 'react-router';
import UserInfoCardContainer from './UserInfoCardContainer';
import { useGetUserDetailsQuery } from '../../admin/UsersPage/UsersPageApi';
import { useAssignEditorMutation, useGetAllEditorsQuery } from '../../admin/EditorsPage/EditorsApi';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import OrderStatusComponent from './OrderStatusComponent';
import OrderEditModal from './OrderEditModal';
import { selectUserRole } from 'src/app/auth/user/store/userSlice';

function OrderTable({ onOrderSubmit, setAllStyleData }) {
	const params = useParams();
	const [selectedId, setSelectedId] = useState('');
	const dispatch = useAppDispatch();
	const ref = useRef();

	const userType = useAppSelector(selectUserRole);

	const [columnWidth, setColumnWidth] = useState();

	const [selectedData, setSelectedData] = useState(null);
	// filtering state
	const [orderStatusValue, setOrderStatusValue] = useState('');
	const [paymentStatusValue, setPaymentStatusValue] = useState('');
	const [editorValue, setEditorValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [rowPerPage, setRowPerPage] = useState(10);

	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	const [showAllColumns, setShowAllColumns] = useState(false);

	const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);

	const [assignEditor] = useAssignEditorMutation();

	const { data: editorData, isLoading: editorLoading } = useGetAllEditorsQuery({ page: 1, rowPerPage: 10000 });
	// console.log(editorData.data.data);
	// fetch table data
	const { data, isLoading } = params?.email
		? useGetUserDetailsQuery(
				{
					orderStatusValue,
					paymentStatusValue,
					editorValue,
					email: params?.email,
					rowPerPage,
					page: currentPage,
					startDate,
					endDate,
					orderId: searchValue
				},
				{ skip: !params?.email }
			)
		: useGetOrdersDataQuery({
				orderStatusValue,
				paymentStatusValue,
				editorValue,
				searchValue,
				startDate,
				endDate,
				page: currentPage,
				rowPerPage
			});

	// order status values

	// Function to handle LuEye icon click
	const handleLuEyeClick = (id) => {
		setSelectedId(id);
		setOrderDetailsOpen(true);
	};

	// Function to handle FiEdit icon click
	const handleFiEditClick = (data) => {
		setSelectedData(data);
	};
	const closedEditModal = () => {
		setSelectedData(null);
	};

	const handleOrderDetailsClose = () => setOrderDetailsOpen(false);

	const handleEditorChange = async (editor_id, order_id) => {
		try {
			const res = await assignEditor({ editor_id: parseFloat(editor_id), order_id });
			if (res.data) {
				dispatch(openSnackbar({ type: SnackbarTypeEnum.SUCCESS, message: 'New Editor assigned' }));
			} else {
				dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: 'Editor assigned failed' }));
			}
		} catch (error) {
			dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: 'Editor assigned failed' }));
		}
	};

	// page navigation

	const handleChangePage = (event, newPage) => {
		setCurrentPage(newPage);
	};

	const initialColumns = [
		{
			id: 'order_date_formatted',
			accessorKey: 'order_date',
			header: 'Date',
			Cell: ({ row }) => format(new Date(row?.original?.created_at), 'MMM dd, y'),
			sortingFn: (rowA, rowB, columnId) => {
				const dateA = new Date(rowA.original.created_at).getTime();
				const dateB = new Date(rowB.original.created_at).getTime();

				if (dateA < dateB) {
					return -1;
				}
				if (dateA > dateB) {
					return 1;
				}
				return 0;
			}
		},
		{
			accessorKey: 'id',
			header: 'ID',
			Cell: ({ row }) => row.original.order_id,

			size: showAllColumns ? null : 90
		},
		{
			id: 'remaining_days',
			accessorKey: 'order_date',
			header: (
				<Tooltip
					title="Remaining Days"
					placement="top-start"
				>
					<span>Remaining Days</span>
				</Tooltip>
			),
			Cell: ({ row }) => <Box>{calculateRemainingDays(row?.original?.created_at)}/07 days</Box>
		},
		{
			accessorKey: 'previewstatus',
			header: 'Preview',
			// eslint-disable-next-line react/no-unstable-nested-components
			Cell: ({ row }) => {
				// console.log({ row });

				return (
					<div
						className={clsx(
							'inline-flex items-center px-[8px] py-[2px] rounded-full tracking-wide',
							row?.original?.previewstatus === 'Approved'
								? 'bg-[#039855] text-white'
								: row?.original?.previewstatus === 'Rejected'
									? 'bg-[#CB1717] text-white'
									: row?.original?.previewstatus === 'Pending'
										? 'bg-[#FFCC00] text-black'
										: 'bg-[#CBCBCB] text-black'
						)}
					>
						<div className="tracking-[0.2px] leading-[20px] text-[12px]">
							{row?.original?.previewstatus ? row?.original?.previewstatus : 'N/A'}
						</div>
					</div>
				);
			}
		},
		{
			accessorKey: 'editor',
			header: 'Editor',

			Cell: ({ row }) => {
				return (
					<Typography
						className={clsx(
							'inline-flex items-center px-[8px] py-[2px] rounded-full ',
							row?.original?.editor?.editor_name ? 'bg-[#CBCBCB] text-Black' : 'bg-[#F29339] text-black'
						)}
					>
						<select
							className={clsx(
								'inline-flex items-center w-full text-[12px]',
								row?.original?.editor?.editor_name
									? 'bg-[#CBCBCB] text-Black'
									: 'bg-[#F29339] text-black'
							)}
							defaultValue={row?.original?.editor?.id}
							onChange={(e) => handleEditorChange(e.target.value, row.original.id)}
						>
							{editorData?.data?.data?.map((editors, i) => (
								<option
									key={i}
									className="bg-white text-black"
									value={editors?.id}
								>
									{editors?.editor_name}
								</option>
							))}
						</select>
					</Typography>
				);
			}
			// accessorFn: (row) => `${row?.editor?.editor_name}`
		},
		{
			accessorKey: 'payment_status',
			header: 'Payment Status',
			Cell: ({ row }) => (
				<div
					className={clsx(
						'inline-flex items-center px-[8px] py-[2px] rounded-full tracking-wide',
						row?.original?.payment_status === 'successful' && 'bg-[#039855] text-white',
						row?.original?.payment_status === 'failed' && 'bg-[#CB1717] text-white',
						row?.original?.payment_status === 'pending' && 'bg-[#FFCC00] text-black'
					)}
				>
					<div className="tracking-[0.2px] leading-[20px] text-[12px] capitalize">
						{row?.original?.payment_status}
					</div>
				</div>
			),
			size: 170
		},
		{
			accessorKey: 'files',
			header: 'Files',
			Cell: () => (
				<Link
					to={'#'}
					className="!text-[#0066ff]"
				>
					Download
				</Link>
			),
			size: 90
		},
		{
			accessorKey: 'order_status',
			header: 'Status',
			Cell: ({ row }) => <OrderStatusComponent row={row} />
		}
	];
	const additionalColumns = [
		{
			index: 2,
			accessorKey: 'order_name',
			header: 'Order Name',
			Cell: ({ row }) => row?.original?.order_name
		},
		{
			index: 3,
			accessorKey: 'order_type',
			header: 'Order Type',
			Cell: ({ row }) => {
				// console.log({ row });

				return (
					<div
						className={
							'inline-flex items-center px-[10px] py-[2px] rounded-full tracking-wide bg-[#CBCBCB] text-black'
						}
					>
						<div className="tracking-[0.2px] leading-[20px] font-medium capitalize">
							{row?.original?.order_type}
						</div>
					</div>
				);
			}
		},
		{
			index: 4,
			accessorKey: 'users_name',
			header: 'User Name',
			Cell: ({ row }) => row?.original?.users_name
		},
		{
			index: 5,
			accessorKey: 'users_email',
			header: 'User Email',
			Cell: ({ row }) => row?.original?.users_email
		},
		{
			index: 6,
			accessorKey: 'users_phone',
			header: 'User Phone',
			Cell: ({ row }) => row?.original?.users_phone
		},
		{
			index: 7,
			accessorKey: 'delivery_date',
			header: 'Delivery Date',
			Cell: ({ row }) => `${calculateDeliveryDays(row?.original?.created_at, row?.original?.order_type)}`
		},
		{
			index: 8,
			accessorKey: 'amount',
			header: 'Price',
			Cell: ({ row }) => (
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Typography>$ {row?.original?.amount}</Typography>
					<Tooltip
						color="red"
						placement="right"
						title={
							<span
								style={{ fontSize: '16px' }}
								className=""
							>
								price tooltip
							</span>
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
								className="ml-8"
								size={14}
							/>
						</button>
					</Tooltip>
				</Box>
			)
		},
		{
			index: 14,
			accessorKey: 'download',
			header: 'Download Link',
			Cell: ({ row }) => (
				// <div
				// 	className={clsx('inline-flex items-center px-[10px] py-[2px] tracking-wide', 'bg-black text-white')}
				// >
				<Link
					to={'#'}
					className="!text-[#0066ff]"
					// type="button"
					// // href={row?.original?.files}
					// // target="_blank"
					// // download
					// className="tracking-[0.2px] leading-[20px] font-medium"
					// style={{
					// 	textDecoration: 'none',
					// 	color: 'white'
					// }}
					// disabled
				>
					Download
				</Link>
				// </div>
			)
		}
	];

	const [columns, setColumns] = useState(initialColumns);

	const memoizedColumns = useMemo(() => columns, [columns, data, isLoading, editorLoading, editorData]);
	const initialColumnOrder = [
		'order_date_formatted',
		'id',
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
		if (editorData?.data?.data && !showAllColumns) {
			setColumns(initialColumns);
		} else if (editorData?.data?.data && showAllColumns) {
			setColumns([...initialColumns, ...additionalColumns]);
		}
	}, [editorData?.data?.data, showAllColumns]);
	useEffect(() => {
		if (data?.data) {
			setCurrentPage(Number(data?.data?.current_page));
			setRowPerPage(Number(data?.data?.per_page));
		}
	}, [data]);
	useEffect(() => {
		// Function to calculate and set the column width
		const updateColumnWidth = () => {
			if (ref.current) {
				setColumnWidth((ref.current.clientWidth - 78) / 8);
			}
		};

		// Update column width when the component mounts
		updateColumnWidth();

		// Add event listener for window resize
		window.addEventListener('resize', updateColumnWidth);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener('resize', updateColumnWidth);
		};
	}, [ref?.current, editorData?.data?.data]);

	return (
		<div
			className=""
			ref={ref}
		>
			{isLoading || editorLoading ? (
				<FuseLoading />
			) : (
				<>
					<div>
						<p className="text-[20px] font-bold text-[#868686] py-36">
							{params?.email ? 'Users Details' : 'Orders'}
						</p>
					</div>
					{params?.email ? (
						<UserInfoCardContainer
							email={data?.users_email}
							name={data?.users_name}
							phone={data?.users_phone_no}
							totalOrders={data?.total_orders_count}
							totalSpend={data?.total_spend}
						/>
					) : (
						<></>
					)}
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
						onOrderSubmit={onOrderSubmit}
						setPage={setCurrentPage}
						setAllStyleData={setAllStyleData}
					/>
					{data?.data?.data?.length ? (
						<div>
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
								enableColumnResizing={true}
								layout={'grid'}
								defaultColumn={
									{
										size: showAllColumns ? 200 : columnWidth
									} //default size is usually 180
								}
								muiTableBodyProps={{
									sx: {
										//stripe the rows, make odd rows a darker color
										'& tr:hover > td:after': {
											backgroundColor: 'transparent !important'
										}
									}
								}}
								renderRowActions={({ row }) => (
									<div className="flex gap-5">
										<button
											type="button"
											onClick={() => handleLuEyeClick(row?.original?.id)}
										>
											<LuEye size={20} />
										</button>
										{userType === 'admin' ? (
											<button
												type="button"
												onClick={() => handleFiEditClick(row?.original)}
											>
												<FiEdit size={18} />
											</button>
										) : (
											<></>
										)}
									</div>
								)}
							/>
						</div>
					) : (
						<></>
					)}

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
					<OrderDetailsModal
						orderDetailsOpen={orderDetailsOpen}
						handleOrderDetailsClose={handleOrderDetailsClose}
						selectedId={selectedId}
					/>
					<OrderEditModal
						setSelectedData={setSelectedData}
						selectedData={selectedData}
						closedEditModal={closedEditModal}
					/>
				</>
			)}
		</div>
	);
}

export default OrderTable;
