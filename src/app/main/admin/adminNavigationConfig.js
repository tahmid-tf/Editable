import { commonNavigationItems } from 'app/configs/navigationConfig';

const adminNavigationConfig = [
	{
		id: 'dashboards',
		type: 'group',
		translate: 'DASHBOARDS',
		children: [
			...commonNavigationItems,
			{
				id: 'categories',
				title: 'Categories',
				translate: 'Categories',
				type: 'item',
				url: 'categories'
			},
			{
				id: 'styles',
				title: 'Styles',
				translate: 'Styles',
				type: 'item',
				url: 'styles'
			},
			{
				id: 'all-editors',
				title: 'Editors',
				type: 'item',
				url: 'admin/all-editors'
			}
		]
	}
];
export default adminNavigationConfig;
