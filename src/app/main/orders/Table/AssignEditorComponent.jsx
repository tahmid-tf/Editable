import { Typography } from '@mui/material';
import clsx from 'clsx';
import { useAssignEditorMutation, useGetAllEditorsQuery } from '../../admin/EditorsPage/EditorsApi';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';
import { useAppDispatch } from 'app/store/hooks';
import { useEffect, useState } from 'react';
import changeIcon from 'src/assets/icons/changeIcon.png';
import ConfirmationModal from 'app/shared-components/ConfirmationModal';

const AssignEditorComponent = ({ row, editorData }) => {
	const [selectedEditor, setSelectedEditor] = useState(parseFloat(row?.original?.editors_id));
	const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

	const [assignEditor, { isLoading }] = useAssignEditorMutation();
	const dispatch = useAppDispatch();
	const handleEditorChange = async (editor_id, order_id) => {
		if (editor_id !== null && editor_id !== undefined && editor_id !== '') {
			setSelectedEditor(editor_id);
			setOpenConfirmationModal(true);
		}
	};

	const handleConfirmationModalClose = () => {
		setOpenConfirmationModal(false);
		setSelectedEditor(parseFloat(row?.original?.editors_id));
	};
	const handleConfirmClick = async () => {
		try {
			const res = await assignEditor({ editor_id: parseFloat(selectedEditor), order_id: row.original.id });

			if (res.data) {
				dispatch(openSnackbar({ type: SnackbarTypeEnum.SUCCESS, message: 'New Editor assigned' }));
				setOpenConfirmationModal(false);
			} else {
				setSelectedEditor(parseFloat(row?.original?.editors_id));
				dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: 'Editor assigned failed' }));
			}
		} catch (error) {
			dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: 'Editor assigned failed' }));
		}
	};
	useEffect(() => {
		setSelectedEditor(parseFloat(row?.original?.editors_id));
	}, [parseFloat(row?.original?.editors_id)]);
	return (
		<Typography
			className={clsx(
				'inline-flex items-center px-[8px] py-[2px] rounded-full ',
				!row?.original?.editors_id ? 'border-[1px] border-black' : ''
			)}
		>
			<select
				className={clsx('inline-flex items-center w-full text-[12px] text-black')}
				value={selectedEditor}
				onChange={(e) => handleEditorChange(e.target.value, row.original.id)}
			>
				<option
					className="bg-white text-black"
					value=""
				>
					Assign Editor
				</option>

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
			<ConfirmationModal
				openModal={openConfirmationModal}
				handleClose={handleConfirmationModalClose}
				bodyText={'Are you sure you want to change this Editor?'}
				cancelBtnText={'Cancel'}
				confirmBtnText={'Confirm'}
				topIcon={changeIcon}
				handleCancelClick={handleConfirmationModalClose}
				handleConfirmClick={handleConfirmClick}
				isLoading={isLoading}
			/>
		</Typography>
	);
};

export default AssignEditorComponent;
