import { Box, Button, TextField } from '@mui/material';
import _ from 'lodash';
import { useCallback, useState } from 'react';

const CustomTableHeader = ({ search, setSearch, setPage, buttonText, handleButtonClick, children }) => {
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
	return (
		<div>
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
						onClick={handleButtonClick}
					>
						{buttonText}
					</Button>
				</Box>
			</Box>
			{children}
		</div>
	);
};

export default CustomTableHeader;
