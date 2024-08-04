import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { closeSnackbar, selectSnackbarState } from './GlobalSnackbarSlice';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';
import clsx from 'clsx';

const GlobalSnackbar = ({ snackbarStyle }) => {
	const { isSnackbarOpen, message, type } = useAppSelector(selectSnackbarState);
	const dispatch = useAppDispatch();
	const [snackbarBgColor, typeBgColor, typeColor, messageColor] = {
		[SnackbarTypeEnum.SUCCESS]: ['#ECFDF3', '#039855', '#FFFFFF', '#027A48'],
		[SnackbarTypeEnum.ERROR]: ['#FEF3F2', '#D92D20', '#FFFFFF', '#B42318'],
		[SnackbarTypeEnum.WARNING]: ['#FFFAEB', '#DC6803', '#FFFFFF', '#B54708'],
		[SnackbarTypeEnum.DELETE]: ['#0469E3', '#FFFFFF', '#000000', '#FFFFFF']
	}[type];
	return (
		<Snackbar
			open={isSnackbarOpen}
			autoHideDuration={2000}
			onClose={() => dispatch(closeSnackbar())}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			className={clsx('mt-40 z-[500]', snackbarStyle)}
		>
			<Alert
				// onClose={closeSuccess}
				variant="filled"
				sx={{
					width: '100%',
					borderRadius: '50px',
					backgroundColor: snackbarBgColor,
					color: messageColor,
					padding: '0px 16px 0px 8px', // Adjust padding to reduce height
					'& .MuiAlert-icon': {
						display: 'none'
					}
				}}
			>
				<span
					className={` px-8 py-3 mr-5 rounded-full capitalize`}
					style={{ backgroundColor: typeBgColor, color: typeColor }} // Set your desired font size here
				>
					{type}
				</span>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default GlobalSnackbar;
