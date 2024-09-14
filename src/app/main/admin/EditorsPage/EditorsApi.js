import apiService from 'app/store/apiService';

const addTagTypes = ['allEditors'];
const EditorsApi = apiService.enhanceEndpoints({ addTagTypes }).injectEndpoints({
	endpoints: (builder) => ({
		getAllEditors: builder.query({
			query: ({ page, rowPerPage, search }) =>
				`admin/editors?page=${page}${rowPerPage ? `&&paginate=${rowPerPage}` : ''}${search ? `&&name=${search}` : ''}`,
			providesTags: ['allEditors']
		}),
		createNewEditor: builder.mutation({
			query: (body) => ({
				url: 'admin/editor_store',
				method: 'POST',
				body
			}),
			invalidatesTags: ['allEditors']
		}),
		updateEditor: builder.mutation({
			query: ({ updatedValue, id }) => ({
				url: `admin/editor/update/${id}`,
				method: 'POST',
				body: {
					...updatedValue,
					_method: 'PUT'
				}
			}),
			invalidatesTags: ['allEditors']
		}),
		deleteEditor: builder.mutation({
			query: (id) => ({
				url: `admin/editor/${id}/delete`,
				method: 'DELETE'
			}),
			invalidatesTags: ['allEditors']
		}),
		assignEditor: builder.mutation({
			query: (body) => ({
				url: 'admin/assign_editor',
				method: 'POST',
				body
			}),
			invalidatesTags: ['orders', 'allEditors']
		})
	})
});
export const {
	useGetAllEditorsQuery,
	useCreateNewEditorMutation,
	useUpdateEditorMutation,
	useDeleteEditorMutation,
	useAssignEditorMutation
} = EditorsApi;
