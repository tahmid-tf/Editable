import Transactions from './Transactions';

const TransactionsConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'admin/transactions',
			element: <Transactions />
		}
	],
	auth: ['admin']
};
export default TransactionsConfig;
