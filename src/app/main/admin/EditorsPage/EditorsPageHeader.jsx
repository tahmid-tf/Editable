import { Box, Button, TextField } from '@mui/material';
import _ from 'lodash';
import { useCallback, useState } from 'react';
import CreateEditorModal from './CreateEditorModal';

const EditorsPageHeader = ({ setSearch, setPage, search, openModal, setOpenModal, editorInfo, setEditorInfo }) => {
	const [searchInputValue, setSearchInputValue] = useState(search);

	const debouncedHandleSearchChange = useCallback(
		_.debounce((value) => {
			setSearch(value);
			setPage(1);
		}, 500),
		[]
	);

	const handleSearchChange = (e) => {
		setSearchInputValue(e.target.value);
		debouncedHandleSearchChange(e.target.value);
	};

	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: '2em' }}>
			<Box width={'100%'}>
				<TextField
					label="Search"
					name="search"
					sx={{ width: '15em' }}
					value={searchInputValue}
					onChange={handleSearchChange}
				/>
			</Box>
			<Box>
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
					onClick={handleOpenModal}
				>
					Create Editor
				</Button>
			</Box>
			<CreateEditorModal
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				editorInfo={editorInfo}
				setEditorInfo={setEditorInfo}
			/>
		</Box>
	);
};

export default EditorsPageHeader;
