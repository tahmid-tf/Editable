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
	const deliveryDate = parsedOrderDate.add(orderType === 'standard' ? 15 : orderType === 'express' ? 7 : 0, 'day');
	return deliveryDate.format('MMM D, YYYY');
};

export const getMaxThreshold = (thresholdsData, editsData) => {
	const relevantThresholds = {
		style: thresholdsData?.category?.style_threshold || 0
	};

	// Use optional chaining and ternary operator for conditional assignments
	relevantThresholds.culling = editsData?.culling ? thresholdsData?.category?.culling_threshold || 0 : 0;
	relevantThresholds.skinRetouching = editsData?.skinRetouching
		? thresholdsData?.category?.skin_retouch_threshold || 0
		: 0;
	relevantThresholds.previewEdits = editsData?.previewEdits
		? thresholdsData?.category?.preview_edit_threshold || 0
		: 0;

	// Leverage spread operator and Math.max for concise maximum calculation
	return Math.max(...Object.values(relevantThresholds));
};

export const imageUrlCompleter = (imageKey) => {
	return `${import.meta.env.VITE_BASE_IMAGE_URL}/${imageKey}`;
};

export const getExistingId = (idArray, dataArray) => {
	const existingIds = new Set(dataArray.map((item) => item.id));
	const filteredArray = idArray.filter((id) => existingIds.has(id));
	return filteredArray;
};

export const getStyleAndAdditionalStyleName = (styleData) => {
	if (!styleData?.length) {
		return { mainStyle: 'N/A', additionalStyle: 'N/A' };
	} else {
		const mainStyle = styleData?.find((style) => style?.additional_style === 'no');
		const additional_style = styleData
			?.filter((style) => style?.additional_style === 'yes')
			?.map((style) => style?.style_name)
			?.join(', ');

		return { mainStyle: mainStyle?.style_name || 'N/A', additionalStyle: additional_style || 'N/A' };
	}
};

export const getOrdinal = (n) => {
	const s = ['th', 'st', 'nd', 'rd'];
	const v = n % 100;
	return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
export const buildQueryString = (queryObj) => {
	// Initialize an array to hold individual query parameters
	const queryParams = [];

	// Iterate over the keys in the queryObj
	for (const key in queryObj) {
		if (queryObj.hasOwnProperty(key)) {
			const value = queryObj[key];
			// If the value exists, add the parameter to the queryParams array
			if (value !== undefined && value !== null) {
				queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
			}
		}
	}

	// Join the parameters with '&&' and prepend a '?' to form the query string
	return queryParams.length > 0 ? `?${queryParams.join('&&')}` : '';
};
export const formatNumber = (num) => {
	if (num >= 1_000_000_000) {
		return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
	}
	if (num >= 1_000_000) {
		return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
	}
	if (num >= 1_000) {
		return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
	}
	return num.toString();
};

export const formatDateAndId = (dateString, id) => {
	// Create a Date object from the input string
	const date = new Date(dateString);

	// Extract day, month, and year from the date
	const day = date.getDate(); // Gets the day of the month (1-31)
	const month = date.toLocaleString('default', { month: 'short' }).slice(0, 2); // Gets the first two letters of the month (e.g., "Aug")
	const year = date.getFullYear().toString().slice(-2); // Gets the last two digits of the year (e.g., "24")

	// Format the ID to be at least 3 digits long (e.g., "010")
	const formattedId = id.toString().padStart(3, '0');

	// Concatenate day, month, year, and ID
	const result = `${day}${month}${year}${formattedId}`;

	return result;
};
export const getStartOfDayISO = (dateString) => {
	// Parse the date using Day.js
	const date = dayjs(dateString);

	// Get the start of the day (12:00 AM) for the given date
	const startOfDay = date.startOf('day');

	// Convert the start of the day to ISO format
	return startOfDay.toISOString();
};

export const getEndOfDayISO = (dateString) => {
	// Parse the date using Day.js
	const date = dayjs(dateString);

	// Get the end of the day (11:59:59 PM) for the given date
	const endOfDay = date.endOf('day');

	// Convert the end of the day to ISO format
	return endOfDay.toISOString();
};
