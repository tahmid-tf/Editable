import apiService from 'app/store/apiService';

const orderApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getOrdersData: builder.query({
			query: ({
				orderStatusValue,
				paymentStatusValue,
				editorValue,
				searchValue,
				rowPerPage,
				page,
				startDate,
				endDate
			}) =>
				`admin/order_list?page=${page}${rowPerPage ? `&&paginate=${rowPerPage}` : ''}${searchValue ? `&&email=${searchValue}` : ''}${orderStatusValue ? `&&order_status=${orderStatusValue}` : ''}${paymentStatusValue ? `&&payment_status=${paymentStatusValue}` : ''}${editorValue ? `&&editor=${editorValue}` : ''}${startDate ? `&&start_date=${startDate}` : ''}${endDate ? `&&end_date=${endDate}` : ''}`
		})
	})
});

export const { useGetOrdersDataQuery } = orderApi;
