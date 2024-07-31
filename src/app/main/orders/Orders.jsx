import React, { useState } from 'react';
import OrderTable from './Table/OrderTable';
import PickStyle from './newOrder/PickStyle';

const Orders = () => {
	const [showOrderTable, setShowOrderTable] = useState(true);
	const [allStyleData, setAllStyleData] = useState([]);

	const handleOrderTableSubmit = () => {
		setShowOrderTable(false);
	};

	const handlePickStyleSubmit = () => {
		setShowOrderTable(true);
	};

	return (
		<div>
			<div className="bg-white px-[26px]">
				{showOrderTable ? (
					<OrderTable
						setAllStyleData={setAllStyleData}
						onOrderSubmit={handleOrderTableSubmit}
					/>
				) : (
					<PickStyle
						onPickStyleSubmit={handlePickStyleSubmit}
						allStyleData={allStyleData}
					/>
				)}
			</div>
		</div>
	);
};

export default Orders;
