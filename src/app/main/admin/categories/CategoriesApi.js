import apiService from 'app/store/apiService';

const addTagTypes = ['allCategories'];
const categoryApi = apiService.enhanceEndpoints({ addTagTypes }).injectEndpoints({
	endpoints: (builder) => ({
		getAllCategories: builder.query({
			query: ({ search, page, rowPerPage }) =>
				`admin/category?page=${page}${rowPerPage ? `&&paginate=${rowPerPage}` : ''}${search ? `&&name=${search}` : ''}`,
			providesTags: ['allCategories']
		}),
		createCategory: builder.mutation({
			query: (body) => ({
				url: 'admin/category_store',
				method: 'POST',
				body
			}),
			invalidatesTags: ['allCategories']
		}),

		updateCategory: builder.mutation({
			query: ({ body, id }) => ({
				url: `admin/category/update/${id}`,
				method: 'POST',
				body: { ...body, _method: 'PUT' }
			}),
			invalidatesTags: ['allCategories']
		}),
		deleteCategory: builder.mutation({
			query: (id) => ({
				url: `admin/category/delete/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['allCategories']
		})
	})
});
export const {
	useCreateCategoryMutation,
	useGetAllCategoriesQuery,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation
} = categoryApi;
