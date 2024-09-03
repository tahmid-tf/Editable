import { Typography } from '@mui/material';
import clsx from 'clsx';
import { useAssignEditorMutation, useGetAllEditorsQuery } from '../../admin/EditorsPage/EditorsApi';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';
import { useAppDispatch } from 'app/store/hooks';
import { useEffect, useState } from 'react';

const AssignEditorComponent = ({ row, editorData }) => {
	const [selectedEditor, setSelectedEditor] = useState(parseFloat(row?.original?.editors_id));

	const [assignEditor] = useAssignEditorMutation();
	const dispatch = useAppDispatch();
	const handleEditorChange = async (editor_id, order_id) => {
		try {
			const res = await assignEditor({ editor_id: parseFloat(editor_id), order_id });
			setSelectedEditor(editor_id);
			if (res.data) {
				dispatch(openSnackbar({ type: SnackbarTypeEnum.SUCCESS, message: 'New Editor assigned' }));
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
				row?.original?.editors_id ? 'bg-[#CBCBCB] text-Black' : 'bg-[#F29339] text-black'
			)}
		>
			<select
				className={clsx(
					'inline-flex items-center w-full text-[12px]',
					row?.original?.editors_id ? 'bg-[#CBCBCB] text-Black' : 'bg-[#F29339] text-black'
				)}
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
		</Typography>
	);
};

export default AssignEditorComponent;
