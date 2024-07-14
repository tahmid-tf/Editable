import { Box, MenuItem, Pagination, Select, Typography } from '@mui/material';
import DataTable from 'app/shared-components/data-table/DataTable';
import { useDeleteEditorMutation, useGetAllEditorsQuery } from './EditorsApi';
import { useEffect, useMemo, useState } from 'react';
import { LuEye } from 'react-icons/lu';
import { FiEdit } from 'react-icons/fi';
import FuseLoading from '@fuse/core/FuseLoading';
import EditorsPageHeader from './EditorsPageHeader';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const EditorsPage = () => {
	const [openModal, setOpenModal] = useState(false);
	const [editorInfo, setEditorInfo] = useState(null);

	const [page, setPage] = useState(1);
	const [rowPerPage, setRowPerPage] = useState(10);
	const [search, setSearch] = useState('');

	const { data, isLoading } = useGetAllEditorsQuery({ page, rowPerPage, search });
	const [deleteEditor] = useDeleteEditorMutation();
	console.log(data?.data);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleDeleteClick = async ({ original }) => {
		const response = await deleteEditor(original?.id);
        console.log({response});
	};
	const handleEditClick = ({ original }) => {
		setEditorInfo(original);
		setOpenModal(true);
	};
	const column = useMemo(
		() => [
			{
				id: 'editor_name',
				accessorKey: 'editor_name',
				header: 'Name',
				Cell: ({ row }) => `${row?.original?.editor_name}`,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				}
			},
			{
				id: 'completed_orders_count',
				accessorKey: 'completed_orders_count',
				header: 'Orders Completed',
				Cell: ({ row }) => `${row?.original?.completed_orders_count}`,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				}
			},
			{
				id: 'pending_orders_count',
				accessorKey: 'pending_orders_count',
				header: 'Orders Pending',
				Cell: ({ row }) => `${row?.original?.pending_orders_count}`,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				}
			}
		],
		[data]
	);
	useEffect(() => {
		if (data?.data) {
			setPage(Number(data?.data?.current_page));
			setRowPerPage(Number(data?.data?.per_page));
		}
	}, [data]);
	if (isLoading) {
		return <FuseLoading />;
	}
	return (
		<div>
			<div className="bg-white px-[26px] py-[36px]">
				<Typography sx={{ color: '#868686', fontSize: 20, fontWeight: 700, lineHeight: '20px' }}>
					Editors
				</Typography>

				<DataTable
					isLoading={isLoading}
					data={data?.data?.data}
					columns={column}
					enableColumnActions={false}
					enableGrouping={false}
					enableColumnDragging={false}
					enableRowSelection={false}
					// enableTopToolbar={false}
					enablePagination={false}
					enableBottomToolbar={false}
					muiTableBodyProps={{
						sx: {
							//stripe the rows, make odd rows a darker color
							'& tr:hover > td:after': {
								backgroundColor: 'transparent !important'
							}
						}
					}}
					renderTopToolbar={() => (
						<EditorsPageHeader
							search={search}
							setPage={setPage}
							page={page}
							setSearch={setSearch}
							openModal={openModal}
							setOpenModal={setOpenModal}
							editorInfo={editorInfo}
							setEditorInfo={setEditorInfo}
						/>
					)}
					renderRowActions={({ row }) => (
						<div className="flex gap-5">
							<button
								type="button"
								onClick={() => handleDeleteClick(row)}
							>
								<FuseSvgIcon
									className="text-48"
									size={24}
									color="action"
								>
									material-outline:delete_forever
								</FuseSvgIcon>
							</button>
							<button
								type="button"
								onClick={() => handleEditClick(row)}
							>
								<FuseSvgIcon
									className="text-48"
									size={24}
									color="action"
								>
									heroicons-outline:pencil-alt
								</FuseSvgIcon>
							</button>
						</div>
					)}
				/>
				<div className="flex justify-center items-center py-36">
					<Pagination
						count={data?.data?.last_page}
						page={page}
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
	);
};

export default EditorsPage;
