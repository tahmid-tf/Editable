import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import Orders from '../main/orders/Orders';
import Categories from '../main/categories/Categories';
import Styles from '../main/styles/Styles';

const routeConfigs = [ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig];
/**
 * The routes of the application.
 */
const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
	{
		path: '/',
		element: <Navigate to="/orders" />,
		// element: <Navigate to="/example" />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'orders',
		element: <Orders />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'categories',
		element: <Categories />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'styles',
		element: <Styles />,
		auth: settingsConfig.defaultAuth
	},
	{
		path: 'loading',
		element: <FuseLoading />
	},
	{
		path: '404',
		element: <Error404Page />
	},
	{
		path: '*',
		element: <Navigate to="404" />
	}
];
export default routes;
