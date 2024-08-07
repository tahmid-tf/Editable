import apiService from 'app/store/apiService';

const addTagTypes = ['allStyles'];
const TransactionsApi = apiService.enhanceEndpoints({ addTagTypes }).injectEndpoints({
	endpoints: (builder) => ({
		getAllTransactions: builder.query({
			query: ({ orderStatusValue, paymentStatusValue, searchValue, rowPerPage, page, startDate, endDate }) =>
				`admin/transactions?page=${page}${rowPerPage ? `&&paginate=${rowPerPage}` : ''}${searchValue ? `&&email=${searchValue}` : ''}${orderStatusValue ? `&&order_status=${orderStatusValue}` : ''}${paymentStatusValue ? `&&payment_status=${paymentStatusValue}` : ''}${startDate ? `&&start_date=${startDate}` : ''}${endDate ? `&&end_date=${endDate}` : ''}`,
			providesTags: ['allStyles']
		}),
		
	})
});
export const { useGetAllTransactionsQuery, } = TransactionsApi;
