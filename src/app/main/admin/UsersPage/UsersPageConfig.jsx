import UserDetailsPage from './UserDetailsPage/UserDetailsPage';
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
					element: <UserDetailsPage />
				},
			]
		}
	],
	auth: ['admin']
};
export default UsersPageConfig;
