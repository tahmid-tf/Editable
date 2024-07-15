import apiService from 'app/store/apiService';

const addTagTypes = ['allStyles'];
const AdminStylePageApi = apiService.enhanceEndpoints({ addTagTypes }).injectEndpoints({
	endpoints: (builder) => ({
		getAllStyles: builder.query({
			query: ({ search, page, rowPerPage }) =>
				`admin/styles?page=${page}${rowPerPage ? `&&paginate=${rowPerPage}` : ''}${search ? `&&name=${search}` : ''}`,
			providesTags: ['allStyles']
		}),
		createStyle: builder.mutation({
			query: (body) => ({
				url: 'admin/style_store',
				method: 'POST',
				body
			}),
			invalidatesTags: ['allStyles']
		}),

		updateStyle: builder.mutation({
			query: ({ body, id }) => ({
				url: `admin/style/update/${id}`,
				method: 'POST',
				body: { ...body, _method: 'PUT' }
			}),
			invalidatesTags: ['allStyles']
		}),
		deleteStyle: builder.mutation({
			query: (id) => ({
				url: `admin/category/delete/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['allStyles']
		})
	})
});
export const { useGetAllStylesQuery, useCreateStyleMutation, useDeleteStyleMutation, useUpdateStyleMutation } =
	AdminStylePageApi;
