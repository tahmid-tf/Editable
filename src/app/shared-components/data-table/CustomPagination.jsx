import { MenuItem, Pagination, Select } from '@mui/material';

const CustomPagination = ({ totalPage, page, setPage, rowPerPage, setRowPerPage }) => {
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	return (
		<div className="flex justify-center items-center py-36">
			<Pagination
				count={totalPage}
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
	);
};

export default CustomPagination;
