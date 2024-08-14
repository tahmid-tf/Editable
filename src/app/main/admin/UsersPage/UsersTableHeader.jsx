import { Box, Typography } from '@mui/material';
import CustomTableHeader from 'app/shared-components/data-table/CustomTableHeader';
import { exportCSV } from 'src/app/appUtils/apiUtils';

const UsersTableHeader = ({ search, setSearch, setPage, totalUsers, base, additionalStyles }) => {
	const handleExportCSV = () => {};
	return (
		<Box>
			<CustomTableHeader
				search={search}
				setPage={setPage}
				setSearch={setSearch}
				handleButtonClick={() =>
					exportCSV(
						'admin/users_data_export',
						{
							email: search
						},
						'user_data'
					)
				}
				buttonText={'Export CSV'}
			/>
			<div className="flex justify-between py-20">
				<div className="flex">
					<div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0 text-lg font-400">
						<span>Total Users:</span>
						<b> {totalUsers}</b>
					</div>
					<Typography
						className="font-medium mx-20"
						color="text.secondary"
					>
						|
					</Typography>
					<div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0  text-lg font-400">
						<span>Base:</span>
						<b> {base}</b>
					</div>

					<Typography
						className="font-medium mx-20"
						color="text.secondary"
					>
						|
					</Typography>
					<div className="tracking-[0.2px] leading-[20px] inline-block flex-shrink-0  text-lg font-400">
						<span>Additional Styles:</span>
						<b> {additionalStyles}</b>
					</div>
				</div>
			</div>
		</Box>
	);
};

export default UsersTableHeader;
