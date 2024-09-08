import { commonNavigationItems } from 'app/configs/navigationConfig';

const userNavigationConfig = [
	{
		id: 'dashboards',
		type: 'group',
		children: [...commonNavigationItems]
	}
];
export default userNavigationConfig;
