import Styles from './Styles';

const stylePageConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'styles',
			element: <Styles />
		}
	],
	auth: ['admin']
};
export default stylePageConfig;
