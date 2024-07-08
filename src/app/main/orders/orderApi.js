import apiService from 'app/store/apiService';

const orderApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getOrdersData: builder.query({
			query: ({ orderStatusValue, paymentStatusValue, editorValue, searchValue, rowPerPage, page }) =>
				`admin/order_list?page=${page}${rowPerPage ? `&&paginate=${rowPerPage}` : ''}${searchValue ? `&&email=${searchValue}` : ''}${orderStatusValue ? `&&order_status=${orderStatusValue}` : ''}${paymentStatusValue ? `&&payment_status=${paymentStatusValue}` : ''}${editorValue ? `&&editor=${editorValue}` : ''}`
		})
	})
});

export const { useGetOrdersDataQuery } = orderApi;
