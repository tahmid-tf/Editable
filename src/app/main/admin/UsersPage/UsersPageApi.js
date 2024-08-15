import apiService from 'app/store/apiService';
const addTagTypes = ['orders'];
const UsersPageApi = apiService.enhanceEndpoints({ addTagTypes }).injectEndpoints({
	endpoints: (builder) => ({
		getAllUsers: builder.query({
			query: ({ page, rowPerPage, search }) =>
				`admin/users_info?page=${page}${rowPerPage ? `&&paginate=${rowPerPage}` : ''}${search ? `&&email=${search}` : ''}`,
			providesTags: ['orders']
		}),
		getUserDetails: builder.query({
			query: ({
				orderStatusValue,
				orderId,
				paymentStatusValue,
				editorValue,
				email,
				rowPerPage,
				page,
				startDate,
				endDate
			}) =>
				`admin/users_info/${email}?page=${page}${rowPerPage ? `&&paginate=${rowPerPage}` : ''}${orderStatusValue ? `&&order_status=${orderStatusValue}` : ''}${orderId ? `&&order_id=${orderId}` : ''}${paymentStatusValue ? `&&payment_status=${paymentStatusValue}` : ''}${editorValue ? `&&editor=${editorValue}` : ''}${startDate ? `&&start_date=${startDate}` : ''}${endDate ? `&&end_date=${endDate}` : ''}`,
			providesTags: ['orders']
		})
	})
});
export const { useGetAllUsersQuery, useGetUserDetailsQuery } = UsersPageApi;
