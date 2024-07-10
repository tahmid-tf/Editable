import dayjs from 'dayjs';

export const calculateRemainingDays = (orderDate) => {
	// console.log({});
	// Parse the order date using dayjs
	const parsedOrderDate = dayjs(orderDate);

	// Add 7 days to the parsed order date
	const targetDate = parsedOrderDate.add(7, 'day');

	// Get the current date
	const currentDate = dayjs();

	// Calculate the difference in days from the current date to the target date
	const daysRemaining = targetDate.diff(currentDate, 'day');

	return daysRemaining > 0 ? daysRemaining : 0;
};
export const calculateDeliveryDays = (orderDate, orderType, customDay) => {
	// console.log({});
	// Parse the order date using dayjs
	const parsedOrderDate = dayjs(orderDate);
	if (!parsedOrderDate.isValid()) {
		return '';
	}
	// Add 7 days to the parsed order date
	const deliveryDate = parsedOrderDate.add(
		orderType === 'standard' ? 15 : orderType === 'express' ? 7 : customDay,
		'day'
	);
	return deliveryDate.format('MMM D, YYYY');
};
