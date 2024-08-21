import GeneralSettings from './GeneralSettings';

const GeneralSettingsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'user/general-settings',
			element: <GeneralSettings />
		}
	],
    auth:['user']
};
export default GeneralSettingsConfig;
