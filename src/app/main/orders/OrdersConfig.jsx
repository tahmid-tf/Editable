import Orders from './Orders';

const OrdersConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'orders',
			element: <Orders />
		}
	],
	auth: ['admin', 'user']
};
export default OrdersConfig;
