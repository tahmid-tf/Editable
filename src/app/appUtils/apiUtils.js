import jwtAuthConfig from '../auth/services/jwt/jwtAuthConfig';
import { buildQueryString } from './appUtils';
const token = localStorage.getItem(jwtAuthConfig.tokenStorageKey);
export const exportCSV = async (apiEndPoint, queryObj, fileName) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BASE_URL}/${apiEndPoint}${buildQueryString(queryObj)}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				authorization: `Bearer ${token}`
			}
		});

		if (response.ok) {
			const blob = await response.blob();
			const url = window.URL.createObjectURL(new Blob([blob]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `${fileName || 'users_data'}.xlsx`);
			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);
		} else {
			console.error('Failed to download file:', response.statusText);
		}
	} catch (error) {
		console.error('Error while fetching the file:', error);
	}
};
