import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
export const commonNavigationItems = [
	{
		id: 'orders',
		title: 'Orders',
		translate: 'Orders',
		type: 'item',
		url: 'orders'
	},
	{
		id: 'general-settings',
		title: 'General Settings',
		type: 'item',
		url: 'user/general-settings'
	}
];
const navigationConfig = [
	{
		id: 'dashboards',
		type: 'group',
		translate: 'DASHBOARDS',
		children: commonNavigationItems
	}
];
export default navigationConfig;
