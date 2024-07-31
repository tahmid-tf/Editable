import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectCurrentLanguageDirection } from 'app/store/i18nSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import { selectMainTheme } from '@fuse/core/FuseSettings/fuseSettingsSlice';
import MockAdapterProvider from '@mock-api/MockAdapterProvider';
import { useAppSelector } from 'app/store/hooks';
import { useSelector } from 'react-redux';
import withAppProviders from './withAppProviders';
import AuthenticationProvider from './auth/AuthenticationProvider';
// fonts
import '@fontsource/roboto'; // Imports Roboto with default weight (400)
// To import specific weights and styles:
import '@fontsource/roboto/300.css'; // Import Roboto with weight 300
import '@fontsource/roboto/400-italic.css'; // Import Roboto with weight 400 and italic style
import GlobalSnackbar from './shared-components/GlobalSnackbar/GlobalSnackbar';
// fonts

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
const emotionCacheOptions = {
	rtl: {
		key: 'muirtl',
		stylisPlugins: [rtlPlugin],
		insertionPoint: document.getElementById('emotion-insertion-point')
	},
	ltr: {
		key: 'muiltr',
		stylisPlugins: [],
		insertionPoint: document.getElementById('emotion-insertion-point')
	}
};

/**
 * The main App component.
 */
function App() {
	/**
	 * The language direction from the Redux store.
	 */
	const langDirection = useAppSelector(selectCurrentLanguageDirection);
	/**
	 * The main theme from the Redux store.
	 */
	const mainTheme = useSelector(selectMainTheme);
	return (
		<MockAdapterProvider>
			<CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
				<FuseTheme
					theme={mainTheme}
					direction={langDirection}
				>
					<AuthenticationProvider>
						<GlobalSnackbar />
						<FuseLayout layouts={themeLayouts} />
					</AuthenticationProvider>
				</FuseTheme>
			</CacheProvider>
		</MockAdapterProvider>
	);
}

export default withAppProviders(App);
