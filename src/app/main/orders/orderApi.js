import apiService from 'app/store/apiService';

const orderApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		getOrdersData: builder.query({
			query: () => ''
		})
	})
});

const { useGetOrdersDataQuery } = orderApi;
