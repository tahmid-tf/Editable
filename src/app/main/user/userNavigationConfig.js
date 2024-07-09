import { commonNavigationItems } from 'app/configs/navigationConfig';

const userNavigationConfig = [
	{
		id: 'dashboards',
		type: 'group',
		translate: 'DASHBOARDS',
		children: [...commonNavigationItems]
	}
];
export default userNavigationConfig;
