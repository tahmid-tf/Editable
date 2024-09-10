import React, { useMemo, useState } from 'react';
import CustomPagination from 'app/shared-components/data-table/CustomPagination';
import CustomRowAction from 'app/shared-components/data-table/CustomRowAction';
import CustomTableHeader from 'app/shared-components/data-table/CustomTableHeader';
import DataTable from 'app/shared-components/data-table/DataTable';
import { useDeleteStyleMutation, useGetAllStylesQuery } from './AdminStylePageApi';
import FuseLoading from '@fuse/core/FuseLoading';
import CreateStylesForm from './Table/CreateStylesForm';
import ConfirmationModal from 'app/shared-components/ConfirmationModal';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';
import { useAppDispatch } from 'app/store/hooks';
import { imageUrlCompleter } from 'src/app/appUtils/appUtils';
import ShowImageModal from './ShowImageModal';

const Styles = () => {
	const [openModal, setOpenModal] = useState(false);
	const [openImageModal, setOpenImageModal] = useState(false);

	const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
	const [clickedRowData, setClickedRowData] = useState(null);
	const [imageUrl, setImageUrl] = useState('');

	const dispatch = useAppDispatch();

	const [page, setPage] = useState(1);
	const [rowPerPage, setRowPerPage] = useState(10);
	const [search, setSearch] = useState('');

	const { data, isLoading } = useGetAllStylesQuery({ page, rowPerPage, search });
	const [deleteStyle, { isLoading: deleteLoading }] = useDeleteStyleMutation();

	const handleDeleteClick = async ({ original }) => {
		setClickedRowData(original);
		setOpenConfirmationModal(true);
	};

	const handleConfirmDeleteClick = async () => {
		const response = await deleteStyle(clickedRowData?.id);
		if (response.data) {
			dispatch(openSnackbar({ type: SnackbarTypeEnum.DELETE, message: response?.data?.message }));
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

	const handleCloseModal = () => {
		setOpenModal(false);
		setClickedRowData(null);
	};

	const handleConfirmationModalClose = () => {
		setOpenConfirmationModal(false);
		setClickedRowData(null);
	};

	const handleClose = () => {
		setImageUrl('');
		setOpenImageModal(false);
	};
	const column = useMemo(
		() => [
			{
				id: 'style_name',
				accessorKey: 'style_name',
				header: 'Name',
				Cell: ({ row }) => `${row?.original?.style_name}`
			},
			{
				id: 'additional_style',
				accessorKey: 'additional_style',
				header: 'Additional Style',
				Cell: ({ row }) => `${row?.original?.additional_style}`
			},
			{
				id: 'category_details',
				accessorKey: 'category_details',
				header: 'Categories',
				Cell: ({ row }) => {
					const allCategory = row?.original?.category_details
						?.map((category) => category?.category_name)
						.join(', ');
					return `${allCategory}`;
				}
			},
			{
				id: 'additional_edits',
				accessorKey: 'category_details',
				header: 'Additional Edits',
				Cell: ({ row }) => {
					const additionalEdits = [
						row?.original?.culling === 'yes' ? 'Culling' : '',
						row?.original?.skin_retouch === 'yes' ? 'Skin Retouch' : '',
						row?.original?.preview_edits === 'yes' ? 'Preview Edits' : ''
					]
						.filter((value) => value?.length)
						.join(', ');
					return additionalEdits;
				}
			},
			{
				id: 'upload_image',
				accessorKey: 'upload_image',
				header: 'Image',
				Cell: ({ row }) => (
					<p
						className="text-[#0066ff] underline cursor-pointer w-fit"
						onClick={() => {
							setImageUrl(imageUrlCompleter(row?.original?.upload_image));
							setOpenImageModal(true);
						}}
					>
						View
					</p>
				)
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
					<p className="text-[20px] font-bold text-[#868686] py-32">Styles</p>
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
							buttonText={'Create Style'}
						>
							<div className="mb-[2em] mt-[1em] flex gap-[3em] text-[16px] leading-5">
								<p>
									Total Styles: <span className="font-bold">{data?.total_style_count}</span>
								</p>
								<p>|</p>
								<p>
									Base: <span className="font-bold">{data?.base_style_count}</span>
								</p>
								<p>|</p>
								<p>
									Additional Styles: <span className="font-bold">{data?.additional_style_count}</span>
								</p>
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
			<CreateStylesForm
				openModal={openModal}
				handleCloseModal={handleCloseModal}
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
			<ShowImageModal
				handleClose={handleClose}
				imageUrl={imageUrl}
				openModal={openImageModal}
			/>
		</div>
	);
};

export default Styles;
