import { commonNavigationItems } from 'app/configs/navigationConfig';

const adminNavigationConfig = [
	{
		id: 'dashboards',
		type: 'group',
		translate: 'DASHBOARDS',
		children: [
			...commonNavigationItems,
			{
				id: 'admin-categories',
				title: 'Categories',
				translate: 'Categories',
				type: 'item',
				url: 'admin/categories'
			},
			{
				id: 'styles',
				title: 'Styles',
				translate: 'Styles',
				type: 'item',
				url: 'admin/styles'
			},
			{
				id: 'transactions',
				title: 'Transactions',
				translate: 'Transactions',
				type: 'item',
				url: 'admin/transactions'
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
