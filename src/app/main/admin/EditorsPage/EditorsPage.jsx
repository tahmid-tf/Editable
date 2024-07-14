
import DataTable from 'app/shared-components/data-table/DataTable';

const EditorsPage = () => {
	return (
		<Box className="bg-white px-[26px] py-[36px]">
			<Typography sx={{ color: '#868686', fontSize: 20, fontWeight: 700, lineHeight: '20px' }}>
				Editors
			</Typography>

			<DataTable
				isLoading={isLoading}
				data={data?.data?.data}
				state={{
					columnOrder
				}}
				columns={memoizedColumns}
				enableColumnActions={false}
				enableGrouping={false}
				enableColumnDragging={false}
				enableRowSelection={false}
				enableTopToolbar={false}
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
				renderRowActions={() => (
					<div className="flex gap-5">
						<button
							type="button"
							onClick={handleLuEyeClick}
						>
							<LuEye size={20} />
						</button>
						<button
							type="button"
							onClick={handleFiEditClick}
						>
							<FiEdit size={18} />
						</button>
					</div>
				)}
			/>

			<div className="py-36">
				<div className="flex justify-center items-center">
					<Pagination
						count={data?.data?.last_page}
						page={currentPage}
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
			</div>
		</Box>
	);
};

export default EditorsPage;
