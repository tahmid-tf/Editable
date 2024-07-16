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
					endDate
				}) =>
					`admin/order_list?page=${page}${rowPerPage ? `&&paginate=${rowPerPage}` : ''}${searchValue ? `&&email=${searchValue}` : ''}${orderStatusValue ? `&&order_status=${orderStatusValue}` : ''}${paymentStatusValue ? `&&payment_status=${paymentStatusValue}` : ''}${editorValue ? `&&editor=${editorValue}` : ''}${startDate ? `&&start_date=${startDate}` : ''}${endDate ? `&&end_date=${endDate}` : ''}`,
				providesTags: ['orders']
			}),
			getValueForOrderCalculation: builder.mutation({
				query: (body) => ({ url: 'admin/selected_style_with_amount_calculation', method: 'POST', body })
			}),
			placeOrder: builder.mutation({
				query: (body) => ({
					url: 'admin/order_store',
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
			})
		})
	});

export const { useGetOrdersDataQuery, useGetValueForOrderCalculationMutation, usePlaceOrderMutation, useGetStylesMutation } = orderApi;
