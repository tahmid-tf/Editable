import apiService from 'app/store/apiService';

const GeneralSettingsApi = apiService.injectEndpoints({
	endpoints: (builder) => ({
		resetPassword: builder.mutation({
			query: ({ body, userType }) => ({
				url: `${userType?.includes('admin') ? 'admin' : 'user'}/change_password`,
				method: 'POST',
				body
			})
		})
	})
});
export const { useResetPasswordMutation } = GeneralSettingsApi;
