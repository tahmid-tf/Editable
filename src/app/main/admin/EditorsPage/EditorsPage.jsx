import { Box, MenuItem, Pagination, Select, Typography } from '@mui/material';
import DataTable from 'app/shared-components/data-table/DataTable';
import { useDeleteEditorMutation, useGetAllEditorsQuery } from './EditorsApi';
import { useEffect, useMemo, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import CreateEditorModal from './CreateEditorModal';
import CustomTableHeader from 'app/shared-components/data-table/CustomTableHeader';
import CustomPagination from 'app/shared-components/data-table/CustomPagination';
import CustomRowAction from 'app/shared-components/data-table/CustomRowAction';

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
		console.log({ response });
	};
	const handleEditClick = ({ original }) => {
		setEditorInfo(original);
		setOpenModal(true);
	};
	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

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
				<Typography sx={{ color: '#868686', fontSize: 20, fontWeight: 700, lineHeight: '20px', marginBottom:3 }}>
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
						<CustomTableHeader
							search={search}
							setPage={setPage}
							setSearch={setSearch}
							handleButtonClick={handleOpenModal}
							buttonText={'Create Editor'}
						/>
					)}
					renderRowActions={({ row }) => (
						<CustomRowAction
							row={row}
							handleDeleteClick={handleDeleteClick}
							handleEditClick={handleEditClick}
						/>
					)}
				/>
				<CustomPagination
					totalPage={data?.data?.last_page}
					page={page}
					setPage={setPage}
					rowPerPage={rowPerPage}
					setRowPerPage={setRowPerPage}
				/>
			</div>
			<CreateEditorModal
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				editorInfo={editorInfo}
				setEditorInfo={setEditorInfo}
			/>
		</div>
	);
};

export default EditorsPage;
