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
	console.log({ thresholdsData, editsData });
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
