import React, { useMemo, useState } from 'react';
import DataTable from 'app/shared-components/data-table/DataTable';
import CustomTableHeader from 'app/shared-components/data-table/CustomTableHeader';
import CustomRowAction from 'app/shared-components/data-table/CustomRowAction';
import CustomPagination from 'app/shared-components/data-table/CustomPagination';
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from './CategoriesApi';
import FuseLoading from '@fuse/core/FuseLoading';
import { Modal } from '@mui/material';
import CreateCategoriesForm from './Table/CreateCategoriesForm';
import ConfirmationModal from 'app/shared-components/ConfirmationModal';
import { useAppDispatch } from 'app/store/hooks';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';

const Categories = () => {
	// delete
	const [isDelete, setIsDelete] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
	const [clickedRowData, setClickedRowData] = useState(null);
	const dispatch = useAppDispatch();

	const [page, setPage] = useState(1);
	const [rowPerPage, setRowPerPage] = useState(10);
	const [search, setSearch] = useState('');
	const { data, isLoading } = useGetAllCategoriesQuery({ search, page, rowPerPage });
	const [deleteCategory, { isLoading: deleteLoading }] = useDeleteCategoryMutation();
	const handleClose = () => {
		setOpenModal(false);
		setClickedRowData(null);
	};
	const closeDelete = () => {
		setIsDelete(false);
	};

	const handleDeleteClick = async ({ original }) => {
		setClickedRowData(original);
		setOpenConfirmationModal(true);
	};
	const handleConfirmDeleteClick = async () => {
		const response = await deleteCategory(clickedRowData?.id);
		if (response.data) {
			dispatch(openSnackbar({ type: SnackbarTypeEnum.SUCCESS, message: response?.data?.message }));
			setOpenConfirmationModal(false);
			setClickedRowData(null);
		} else {
			dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: response?.error?.data?.data }));
		}
	};
	const handleEditClick = ({ original }) => {
		setClickedRowData(original);
		setOpenModal(true);
	};
	const handleOpenModal = () => setOpenModal(true);
	const handleConfirmationModalClose = () => {
		setOpenConfirmationModal(false);
		setClickedRowData(null);
	};

	const column = useMemo(
		() => [
			{
				id: 'category_name',
				accessorKey: 'category_name',
				header: 'Name',
				Cell: ({ row }) => `${row?.original?.category_name}`,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				}
			},
			{
				id: 'style_price',
				accessorKey: 'style_price',
				header: 'Style Price',
				Cell: ({ row }) => `${row?.original?.style_price}`,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				}
			},
			{
				id: 'style_threshold',
				accessorKey: 'style_threshold',
				header: 'Style Threshold',
				Cell: ({ row }) => `${row?.original?.style_threshold}`,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				}
			},
			{
				id: 'culling_price',
				accessorKey: 'culling_price',
				header: 'Culling Price',
				Cell: ({ row }) => `${row?.original?.culling_price}`,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				}
			},
			{
				id: 'culling_threshold',
				accessorKey: 'culling_threshold',
				header: 'Culling Threshold',
				Cell: ({ row }) => `${row?.original?.culling_threshold}`,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				}
			},
			{
				id: 'skin_retouch_price',
				accessorKey: 'skin_retouch_price',
				header: 'Retouch Price',
				Cell: ({ row }) => `${row?.original?.skin_retouch_price}`,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				}
			},
			{
				id: 'skin_retouch_threshold',
				accessorKey: 'skin_retouch_threshold',
				header: 'Retouch Threshold',
				Cell: ({ row }) => `${row?.original?.skin_retouch_threshold}`,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				}
			},
			{
				id: 'preview_edit_price',
				accessorKey: 'preview_edit_price',
				header: 'Preview Price',
				Cell: ({ row }) => `${row?.original?.preview_edit_price}`,
				muiTableHeadCellProps: {
					align: 'center'
				},
				muiTableBodyCellProps: {
					align: 'center'
				}
			},
			{
				id: 'preview_edit_threshold',
				accessorKey: 'preview_edit_threshold',
				header: 'Preview Threshold',
				Cell: ({ row }) => `${row?.original?.preview_edit_threshold}`,
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
	if (isLoading) {
		return <FuseLoading />;
	}
	return (
		<div>
			<div className="px-36">
				<div>
					<p className="text-[20px] font-bold text-[#868686] py-36">Categories</p>
				</div>
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
							buttonText={'Create Category'}
						>
							<div className="mb-16">
								Total Categories: <span className="font-bold">{data?.data?.total}</span>
							</div>
						</CustomTableHeader>
					)}
					renderRowActions={({ row }) => (
						<CustomRowAction
							row={row}
							handleDeleteClick={handleDeleteClick}
							handleEditClick={handleEditClick}
						></CustomRowAction>
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
			<CreateCategoriesForm
				openModal={openModal}
				handleClose={handleClose}
				editedRowData={clickedRowData}
			/>
			<ConfirmationModal
				openModal={openConfirmationModal}
				handleClose={handleConfirmationModalClose}
				bodyText={'Are you sure you want to permanently delete this category?'}
				cancelBtnText={'Cancel'}
				confirmBtnText={'Delete'}
				topIcon={''}
				handleCancelClick={handleConfirmationModalClose}
				handleConfirmClick={handleConfirmDeleteClick}
				isLoading={deleteLoading}
			/>
		</div>
	);
};

export default Categories;
