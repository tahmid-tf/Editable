import EditorsPage from './EditorsPage';

const EditorsPageConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'admin/all-editors',
			element: <EditorsPage />
		}
	],
	auth: ['admin']
};
export default EditorsPageConfig;
