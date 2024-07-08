import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../auth/services/jwt/jwtAuthConfig';

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_BASE_URL,
	prepareHeaders: (headers) => {
		const token = localStorage.getItem(config.tokenStorageKey);

		if (token) headers.set('authorization', `Bearer ${token}`);

		return headers;
	}
});
export const apiService = createApi({
	baseQuery,
	endpoints: () => ({}),
	reducerPath: 'apiService'
});
export default apiService;
