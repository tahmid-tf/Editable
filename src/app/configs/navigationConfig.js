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
const navigationConfig = [
	{
		id: 'dashboards',
		// title: "Dashboards",
		// subtitle: "Unique dashboard designs",
		type: 'group',
		// icon: "heroicons-outline:home",
		translate: 'DASHBOARDS',
		children: [
			// {
			//   id: "example-component",
			//   title: "Example",
			//   translate: "Example",
			//   type: "item",
			//   // icon: "heroicons-outline:star",
			//   url: "example",
			// },
			{
				id: 'orders',
				title: 'Orders',
				translate: 'Orders',
				type: 'item',
				// icon: "heroicons-outline:star",
				url: 'orders'
			},
			{
				id: 'categories',
				title: 'Categories',
				translate: 'Categories',
				type: 'item',
				// icon: "heroicons-outline:star",
				url: 'categories'
			},
			{
				id: 'styles',
				title: 'Styles',
				translate: 'Styles',
				type: 'item',
				// icon: "heroicons-outline:star",
				url: 'styles'
			}
		]
	}
];
export default navigationConfig;
