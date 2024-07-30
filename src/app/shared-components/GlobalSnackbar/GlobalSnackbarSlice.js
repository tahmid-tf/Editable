import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';
import { SnackbarTypeEnum } from 'src/app/appUtils/constant';
const initialState = {
	isSnackbarOpen: false,
	type: SnackbarTypeEnum.SUCCESS,
	message: ''
};
export const GlobalSnackbarSlice = createSlice({
	name: 'globalSnackbar',
	initialState,
	reducers: {
		openSnackbar: (state, action) => {
			state.isSnackbarOpen = true;
			state.message = action.payload.message;
			state.type = action.payload.type;
		},
		closeSnackbar: (state) => {
			return { ...initialState, type: state.type };
		}
	},
	selectors: {
		selectSnackbarState: (state) => state
	}
});

rootReducer.inject(GlobalSnackbarSlice);
const injectedSlice = GlobalSnackbarSlice.injectInto(rootReducer);

export const { openSnackbar, closeSnackbar } = GlobalSnackbarSlice.actions;
export const { selectSnackbarState } = injectedSlice.selectors;
