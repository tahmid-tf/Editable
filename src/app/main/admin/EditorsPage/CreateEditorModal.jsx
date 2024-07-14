import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCreateNewEditorMutation, useUpdateEditorMutation } from './EditorsApi';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import _ from 'lodash';

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
	const [createNewEditor] = useCreateNewEditorMutation();
	const [updateEditor] = useUpdateEditorMutation();
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
			reset(defaultValues);
			setEditorInfo(null);
			handleCloseModal();
		}
	};

	useEffect(() => {
		editorInfo !== null ? setValue('name', editorInfo?.editor_name) : null;
	}, [editorInfo]);
	return (
		<Modal
			open={openModal}
			onClose={handleCloseModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography
					color={'gray'}
					fontSize={20}
					fontWeight={700}
				>
					Create Editor
				</Typography>
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
							whiteSpace: 'nowrap'
						}}
						disabled={_.isEmpty(dirtyFields) || !isValid}
						type="submit"
					>
						Create Editor
					</Button>
				</form>
			</Box>
		</Modal>
	);
};

export default CreateEditorModal;
