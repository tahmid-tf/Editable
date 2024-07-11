import React, { useState } from 'react';
import OrderTable from './Table/OrderTable';
import PickStyle from './newOrder/PickStyle';
import OrdersAlerts from './Alerts/OrdersAlerts';

const Orders = () => {
	const [showOrderTable, setShowOrderTable] = useState(true);

	const handleOrderTableSubmit = () => {
		setShowOrderTable(false);
	};

	const handlePickStyleSubmit = () => {
		setShowOrderTable(true);
	};

	// Alert Success
	const [isSuccess, setIsSuccess] = useState(false);
	const successAlert = () => {
		setIsSuccess(true);
	};
	const closeSuccess = () => {
		setIsSuccess(false);
	};

	return (
		<div>
			<OrdersAlerts
				isSuccess={isSuccess}
				closeSuccess={closeSuccess}
			/>
			<div className="bg-white px-[26px]">
				{showOrderTable ? (
					<OrderTable onOrderSubmit={handleOrderTableSubmit} />
				) : (
					<PickStyle
						onPickStyleSubmit={handlePickStyleSubmit}
						successAlert={successAlert}
					/>
				)}
			</div>
		</div>
	);
};

export default Orders;
