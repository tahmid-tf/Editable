import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, CircularProgress, Modal, TextField, Typography } from '@mui/material';
import GlobalSnackbar from 'app/shared-components/GlobalSnackbar/GlobalSnackbar';
import { openSnackbar } from 'app/shared-components/GlobalSnackbar/GlobalSnackbarSlice';
import { useAppDispatch } from 'app/store/hooks';
import _ from 'lodash';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';
import { z } from 'zod';
import { useCreateNewEditorMutation, useUpdateEditorMutation } from './EditorsApi';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	px: 4,
	py: 2,
	borderRadius: 2
};
const defaultValues = {
	name: ''
};
const schema = z.object({
	name: z.string('Name Should be String').nonempty('Name is Required')
});
const CreateEditorModal = ({ openModal, handleCloseModal, editorInfo, setEditorInfo }) => {
	const [createNewEditor, { isLoading: createLoading }] = useCreateNewEditorMutation();
	const [updateEditor, { isLoading: updateLoading }] = useUpdateEditorMutation();
	const dispatch = useAppDispatch();
	const { control, formState, handleSubmit, reset, setValue } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	const handleCreateName = async (formData) => {
		const response =
			editorInfo !== null
				? await updateEditor({ updatedValue: { editor_name: formData.name }, id: editorInfo?.id })
				: await createNewEditor({ editor_name: formData.name });

		if (response.data) {
			dispatch(openSnackbar({ type: SnackbarTypeEnum.SUCCESS, message: response?.data?.message }));
			reset(defaultValues);
			setEditorInfo(null);
			handleCloseModal();
		} else {
			dispatch(openSnackbar({ type: SnackbarTypeEnum.ERROR, message: response?.error?.data?.message }));
		}
	};

	useEffect(() => {
		editorInfo !== null ? setValue('name', editorInfo?.editor_name) : null;
	}, [editorInfo]);
	return (
		<Box>
			<Modal
				open={openModal}
				onClose={handleCloseModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<>
					<Box sx={style}>
						<Box
							display={'flex'}
							justifyContent={'space-between'}
							alignItems={'center'}
						>
							<Typography
								color={'gray'}
								fontSize={20}
								fontWeight={700}
							>
								Create Editor
							</Typography>
							<button onClick={handleCloseModal}>
								<IoClose size={24} />
							</button>
						</Box>
						<form
							onSubmit={handleSubmit(handleCreateName)}
							className="my-[3em] flex flex-col gap-[1em]"

							// sx={{ my: 5, display: 'flex', flexDirection: 'column', gap: 2 }}
						>
							<Typography
								color={'black'}
								fontSize={'14px'}
								fontWeight={500}
							>
								Name
							</Typography>
							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										name="name"
										sx={{ width: '100%' }}
										placeholder="Ex: Jack Monas"
										error={!!errors.name}
										helperText={errors?.name?.message}
										variant="outlined"
										required
										fullWidth
									/>
								)}
							/>
							<Button
								variant="contained"
								size="large"
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
									whiteSpace: 'nowrap',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 2
								}}
								disabled={_.isEmpty(dirtyFields) || !isValid || createLoading || updateLoading}
								type="submit"
							>
								{editorInfo !== null ? 'Update Editor' : 'Create Editor'}
								{createLoading || updateLoading ? (
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center'
										}}
									>
										<CircularProgress
											sx={{ color: 'white' }}
											size={20}
										/>
									</Box>
								) : (
									''
								)}
							</Button>
						</form>
					</Box>
					<GlobalSnackbar />
				</>
			</Modal>
		</Box>
	);
};

export default CreateEditorModal;
