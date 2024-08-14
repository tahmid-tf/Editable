import Orders from '../../orders/Orders';
import UsersPage from './UsersPage';

const UsersPageConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'admin',
			children: [
				{
					path: 'all-users',
					element: <UsersPage />
				},
				{
					path: 'single-user/:email',
					element: <Orders />
				}
			]
		}
	],
	auth: ['admin']
};
export default UsersPageConfig;
