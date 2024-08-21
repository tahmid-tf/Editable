import { commonNavigationItems } from 'app/configs/navigationConfig';

const userNavigationConfig = [
	{
		id: 'dashboards',
		type: 'group',
		children: [
			...commonNavigationItems,
			{
				id: 'general-settings',
				title: 'General Settings',
				type: 'item',
				url: 'user/general-settings'
			}
		]
	}
];
export default userNavigationConfig;
