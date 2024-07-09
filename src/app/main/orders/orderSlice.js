import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState = {
	email: '',
	phone: '',
	order_type: '',
	order_name: '',
	category: 0,
	payment_status: ''
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		addOrderGeneralInfo: (state, action) => {
			state.email = action.payload.email;
			state.phone = action.payload.phone;
			state.order_name = action.payload.order_name;
			state.order_type = action.payload.order_type;
			state.category = action.payload.category;
			state.payment_status = action.payload.payment_status;
		},
		addOrderStyleInfo: (state, action) => {
			console.log(action.payload);
		}
	},
	selectors: {
		selectOrderState: (state) => state
	}
});

/**
 * Lazy load
 * */
rootReducer.inject(orderSlice);
const injectedSlice = orderSlice.injectInto(rootReducer);

// Action creators are generated for each case reducer function
export const { addOrderGeneralInfo } = orderSlice.actions;

export const { selectOrderState } = injectedSlice.selectors;

export default orderSlice.reducer;
