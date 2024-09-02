import apiService from 'app/store/apiService';

const addTagTypes = ['orders'];
const orderApi = apiService
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
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
					endDate,
					userRole
				}) =>
					`${userRole?.includes('admin') ? 'admin/order_list' : 'user/users_order_list'}?page=${page}${rowPerPage ? `&&paginate=${rowPerPage}` : ''}${searchValue ? `&&email=${searchValue}` : ''}${orderStatusValue ? `&&order_status=${orderStatusValue}` : ''}${paymentStatusValue ? `&&payment_status=${paymentStatusValue}` : ''}${editorValue ? `&&editor=${editorValue}` : ''}${startDate ? `&&start_date=${startDate}` : ''}${endDate ? `&&end_date=${endDate}` : ''}`,
				providesTags: ['orders']
			}),
			getValueForOrderCalculation: builder.mutation({
				query: (body) => ({ url: 'admin/selected_style_with_amount_calculation', method: 'POST', body })
			}),
			getValueForOrderCalculationForUser: builder.mutation({
				query: (body) => ({ url: 'user/selected_style_with_amount_calculation', method: 'POST', body })
			}),
			placeOrder: builder.mutation({
				query: (body) => ({
					url: 'admin/order_store',
					method: 'POST',
					body
				}),
				invalidatesTags: ['orders']
			}),
			placeOrderForUser: builder.mutation({
				query: (body) => ({
					url: 'user/order_store',
					method: 'POST',
					body
				}),
				invalidatesTags: ['orders']
			}),
			getStyles: builder.mutation({
				query: (body) => ({
					url: 'admin/general_info_and_category',
					method: 'POST',
					body
				})
			}),
			getStylesForUser: builder.mutation({
				query: (body) => ({
					url: 'user/general_info_and_category',
					method: 'POST',
					body
				})
			}),
			getOrderDetails: builder.query({
				query: (id) => `admin/order_info/${id}`
			}),
			updateOrderStatus: builder.mutation({
				query: (body) => ({
					url: 'admin/set_order_status',
					method: 'POST',
					body
				}),
				invalidatesTags: ['orders']
			}),
			completeOrder: builder.mutation({
				query: (body) => ({
					url: 'admin/complete_order',
					method: 'POST',
					body
				}),
				invalidatesTags: ['orders']
			}),
			editOrder: builder.mutation({
				query: (body) => ({
					url: 'admin/edit_order',
					method: 'POST',
					body
				}),
				invalidatesTags: ['orders']
			})
		})
	});

export const {
	useGetOrdersDataQuery,
	useGetValueForOrderCalculationMutation,
	useGetValueForOrderCalculationForUserMutation,
	usePlaceOrderMutation,
	usePlaceOrderForUserMutation,
	useGetStylesMutation,
	useGetStylesForUserMutation,
	useGetOrderDetailsQuery,
	useUpdateOrderStatusMutation,
	useCompleteOrderMutation,
	useEditOrderMutation
} = orderApi;
