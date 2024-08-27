import { Box, Button, DialogActions } from '@mui/material';
import { DateField } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { getEndOfDayISO, getStartOfDayISO } from 'src/app/appUtils/appUtils';

const CustomActionComponent = (props) => {
	const { className, setDateValue, dateValue, setOpenDate, setStartDate, setEndDate, setPage } = props;

	const handleApplyClick = () => {
		setStartDate(dateValue[0] ? getStartOfDayISO(dateValue[0]) : '');
		setEndDate(dateValue[1] !== null ? getEndOfDayISO(dateValue[1]) : getEndOfDayISO(dateValue[0]));
		setOpenDate(false);
		setPage(1);
	};
	const handleCancelClick = () => {
		setOpenDate(false);
		setStartDate('');
		setEndDate('');
		setDateValue([]);
	};
	return (
		<DialogActions
			className={className}
			sx={{ borderTop: '1px solid #e2e8f0', justifyContent: 'space-between', px: 5, pt: 2 }}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
				<DateField
					format="LL"
					sx={{
						width: '10em',
						height: '3em'
					}}
					onChange={(value) => setDateValue([value, dateValue[1]])}
					value={dateValue[0]}
				/>
				<Box>-</Box>
				<DateField
					onChange={(value) => setDateValue([dateValue[0], value])}
					value={dateValue[1] !== null ? dateValue[1] : dateValue[0]}
					format="LL"
					sx={{
						width: '10em',
						height: '3em'
					}}
				/>
			</Box>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<Button
					variant="outlined"
					sx={{ borderRadius: '8px' }}
					onClick={handleCancelClick}
				>
					Cancel
				</Button>
				<Button
					variant="contained"
					color="primary"
					sx={{ borderRadius: '8px' }}
					onClick={handleApplyClick}
				>
					Apply
				</Button>
			</Box>
		</DialogActions>
	);
};

export default CustomActionComponent;
