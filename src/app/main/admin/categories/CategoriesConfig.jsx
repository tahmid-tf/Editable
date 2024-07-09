import Styles from '../styles/Styles';
import Categories from './Categories';

const CategoriesConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'categories',
			element: <Categories />
		},
		{
			path: 'styles',
			element: <Styles />
		}
	],
	auth: ['admin']
};
export default CategoriesConfig;
