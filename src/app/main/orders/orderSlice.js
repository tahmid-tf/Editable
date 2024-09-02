import { createSlice } from '@reduxjs/toolkit';
import { rootReducer } from 'app/store/lazyLoadedSlices';

const initialState = {
	email: '',
	phone: '',
	order_type: '',
	order_name: '',
	category: 0,
	category_name: '',
	payment_status: '',
	amount: 0,
	mainStylePrice: 0,
	cullingPrice: 0,
	retouchingPrice: 0,
	previewEditPrice: 0,
	expressAmount: 0,
	subtotal: 0
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
			state.category_name = action.payload.category_name;
			state.payment_status = action.payload.payment_status;
		},
		addOrderAmount: (state, action) => {
			state.amount = action.payload;
		},

		addMainStylePrice: (state, action) => {
			state.mainStylePrice = action.payload;
		},
		addCullingPrice: (state, action) => {
			state.cullingPrice = action.payload;
		},
		addRetouchingPice: (state, action) => {
			state.retouchingPrice = action.payload;
		},
		addPreviewEditPrice: (state, action) => {
			state.previewEditPrice = action.payload;
		},
		addExpressAmount: (state, action) => {
			state.expressAmount = action.payload;
		},
		addSubTotalAmount: (state, action) => {
			state.subtotal = action.payload;
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
export const {
	addOrderGeneralInfo,
	addOrderAmount,
	addMainStylePrice,
	addCullingPrice,
	addPreviewEditPrice,
	addRetouchingPice,
	addExpressAmount,
	addSubTotalAmount
} = orderSlice.actions;

export const { selectOrderState } = injectedSlice.selectors;

export default orderSlice.reducer;
