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
import { useGetOrdersDataQuery } from '../orderApi';
import OrderTableHeader from './OrderTableHeader';
import { AiFillInfoCircle } from 'react-icons/ai';
import OrderDetailsModal from './OrderDetailsModal';
import { useParams } from 'react-router';
import UserInfoCardContainer from './UserInfoCardContainer';
import { useGetUserDetailsQuery } from '../../admin/UsersPage/UsersPageApi';
import { useGetAllEditorsQuery } from '../../admin/EditorsPage/EditorsApi';
import { useAppSelector } from 'app/store/hooks';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import OrderStatusComponent from './OrderStatusComponent';
import OrderEditModal from './OrderEditModal';
import { selectUserRole } from 'src/app/auth/user/store/userSlice';
import AssignEditorComponent from './AssignEditorComponent';
import CustomPagination from 'app/shared-components/data-table/CustomPagination';
import PreviewEditStatusComponent from './PreviewEditStatusComponent';

function OrderTable({ onOrderSubmit, setAllStyleData }) {
	const params = useParams();
	const [selectedId, setSelectedId] = useState('');
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

	const { data: editorData, isLoading: editorLoading } = useGetAllEditorsQuery(
		{ page: 1, rowPerPage: 10000 },
		{ skip: !userType?.includes('admin') }
	);
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
				rowPerPage,
				userRole: userType
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

	// page navigation

	const handleChangePage = (event, newPage) => {
		setCurrentPage(newPage);
	};
	const adminColumn = [
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
			Cell: ({ row }) => {
				return row?.original?.order_delivery_date !== null ? (
					<Box>{calculateRemainingDays(row?.original?.order_delivery_date)}/07 days</Box>
				) : (
					''
				);
			}
		},
		{
			accessorKey: 'editor',
			header: 'Editor',

			Cell: ({ row }) => (
				<AssignEditorComponent
					row={row}
					editorData={editorData}
				/>
			)
			// accessorFn: (row) => `${row?.editor?.editor_name}`
		},
		{
			accessorKey: 'payment_status',
			header: 'Payment Status',
			Cell: ({ row }) => (
				<div
					className={clsx(
						'inline-flex items-center px-[8px] py-[2px] rounded-full tracking-wide',
						row?.original?.payment_status === 'successful' && 'bg-[#27A96E] text-white',
						row?.original?.payment_status === 'failed' && 'bg-[#D54848] text-white',
						row?.original?.payment_status === 'pending' && 'bg-[#F8DA61] text-black'
					)}
				>
					<div className="tracking-[0.2px] leading-[20px] text-[12px] capitalize">
						{row?.original?.payment_status}
					</div>
				</div>
			),
			size: 170
		}
	];
	const userColumns = [
		{
			index: 14,
			accessorKey: 'download',
			header: 'Download Link',
			Cell: ({ row }) =>
				row?.original?.order_delivery_date !== null &&
				calculateRemainingDays(row?.original?.order_delivery_date) < 1 ? (
					<Typography sx={{ color: 'red' }}>Link Expired</Typography>
				) : (
					<div className="flex">
						<div
							className={clsx(
								'inline-flex px-8 py-4 items-center tracking-wide rounded-[12px] text-white',
								!row?.original?.file_uploaded_by_admin_after_edit?.length ? 'bg-[#CBCBCB]' : 'bg-black'
							)}
						>
							<Link
								to={row?.original?.file_uploaded_by_admin_after_edit}
								type="button"
								target="_blank"
								className={clsx(
									'tracking-[0.2px] leading-[20px] font-medium !text-white !no-underline text-[14px] !bg-transparent !border-none',
									!row?.original?.file_uploaded_by_admin_after_edit?.length && 'cursor-not-allowed'
								)}
								onClick={(e) => {
									if (!row?.original?.file_uploaded_by_admin_after_edit?.length) {
										e.preventDefault();
									}
								}}
							>
								Download
							</Link>
						</div>
						<Tooltip
							color="red"
							placement="right"
							title={
								<span className="text-[16px]">
									{`Please download the images within 7 days of order completion. We delete everything after 7 days. Remaining Days: 0${calculateRemainingDays(row?.original?.order_delivery_date)}/07`}
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
									className="ml-4 text-[#F29339]"
									size={14}
								/>
							</button>
						</Tooltip>
					</div>
				)
		},
		{
			index: 2,
			accessorKey: 'order_name',
			header: 'Order Name',
			Cell: ({ row }) => row?.original?.order_name
		},
		{
			index: 7,
			accessorKey: 'delivery_date',
			header: 'Expected Delivery',
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
								Click to see the Details
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
								setSelectedId(row?.original?.id);
								setOrderDetailsOpen(true);
							}}
							type="button"
						>
							<AiFillInfoCircle
								className="ml-2"
								size={10}
							/>
						</button>
					</Tooltip>
				</Box>
			),
			size: 100
		}
	];
	const commonColumn = [
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
			accessorKey: 'previewstatus',
			header: 'Preview',
			// eslint-disable-next-line react/no-unstable-nested-components
			Cell: ({ row }) => (
				<PreviewEditStatusComponent
					row={row}
					userType={userType}
					setSelectedId={setSelectedId}
					setOrderDetailsOpen={setOrderDetailsOpen}
				/>
			),
			size: 165
		},

		{
			accessorKey: 'file_uploaded_by_user',
			header: (
				<Tooltip
					title={`${userType?.includes('admin') ? 'Files' : 'My Drive Link'}`}
					placement="top-start"
				>
					<span>{userType?.includes('admin') ? 'Files' : 'My Drive Link'}</span>
				</Tooltip>
			),
			Cell: ({ row }) =>
				userType?.includes('admin') ? (
					<div className="inline-flex px-8 py-4 items-center tracking-wide rounded-[12px] bg-black text-white">
						<Link
							to={row?.original?.file_uploaded_by_user}
							type="button"
							target="_blank"
							className="tracking-[0.2px] leading-[20px] font-medium !text-white !no-underline text-[14px] !bg-transparent !border-none"
						>
							Download
						</Link>
					</div>
				) : (
					<Link
						to={row?.original?.file_uploaded_by_user}
						className="!text-[#0066ff] !border-[#0066ff] !bg-transparent"
						target="_blank"
					>
						My Drive
					</Link>
				)
			// size: 90
		},
		{
			accessorKey: 'order_status',
			header: 'Status',
			Cell: ({ row }) => (
				<OrderStatusComponent
					userType={userType}
					row={row}
				/>
			)
			// size: 100
		}
	];
	const commonAdditionalColumns = [
		{
			index: 3,
			accessorKey: 'order_type',
			header: 'Order Type',
			Cell: ({ row }) => {
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
		}
	];
	const [columns, setColumns] = useState([]);

	const memoizedColumns = useMemo(() => columns, [columns, data, isLoading, editorLoading, editorData]);

	const initialAdminColumnOrder = [
		'order_date_formatted',
		'id',
		'remaining_days',
		'previewstatus',
		'editor',
		'payment_status',
		'file_uploaded_by_user',
		'order_status',
		'mrt-row-select'
	];
	const initialUserColumnOrder = [
		'order_date_formatted',
		'order_name',
		'id',
		'delivery_date',
		'file_uploaded_by_user',
		'previewstatus',
		'order_status',
		'amount',
		'download',
		'mrt-row-select'
	];

	const [columnOrder, setColumnOrder] = useState([]);
	const handleAllColumns = (showAllColumns) => {
		// if (showAllColumns) {
		// 	const updatedColumns = [...initialColumns, ...additionalColumns];
		// 	const updatedColumnOrder = [...initialColumnOrder];
		// 	setColumns(updatedColumns);
		// 	additionalColumns.forEach((addColl) => {
		// 		updatedColumnOrder.splice(addColl.index, 0, addColl.accessorKey);
		// 	});
		// 	setColumnOrder(updatedColumnOrder);
		// } else {
		// 	setColumns(initialColumns);
		// }
	};

	useEffect(() => {
		if (userType?.includes('admin') && editorData?.data?.data && !showAllColumns) {
			setColumns([...commonColumn, ...adminColumn]);
			setColumnOrder(initialAdminColumnOrder);
		} else if (userType?.includes('admin') && editorData?.data?.data && showAllColumns) {
			setColumns([...commonColumn, ...adminColumn, ...commonAdditionalColumns, ...userColumns]);
		} else if (!userType?.includes('admin') && !showAllColumns) {
			setColumns([...commonColumn, ...userColumns]);
			setColumnOrder(initialUserColumnOrder);
		} else if (!userType?.includes('admin') && showAllColumns) {
			setColumns([...commonColumn, ...userColumns, ...commonAdditionalColumns]);
		}
	}, [editorData?.data?.data, showAllColumns, userType]);
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
				setColumnWidth((ref.current.clientWidth - 78) / 9);
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
						editorData={editorData?.data?.data}
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
										{userType?.includes('admin') ? (
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
					<CustomPagination
						totalPage={data?.data?.last_page}
						page={currentPage}
						setPage={setCurrentPage}
						rowPerPage={rowPerPage}
						setRowPerPage={setRowPerPage}
					/>
					<OrderDetailsModal
						orderDetailsOpen={orderDetailsOpen}
						handleOrderDetailsClose={handleOrderDetailsClose}
						selectedId={selectedId}
						userType={userType}
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
