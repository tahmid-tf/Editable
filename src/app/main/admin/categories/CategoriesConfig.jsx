
import Categories from './Categories';

const CategoriesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'admin/categories',
			element: <Categories />
		}
	],
	auth: ['admin']
};
export default CategoriesConfig;
