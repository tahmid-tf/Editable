const jwtAuthConfig = {
	tokenStorageKey: 'jwt_access_token',
	signInUrl: `${import.meta.env.VITE_BASE_URL}/login`,
	signUpUrl: `${import.meta.env.VITE_BASE_URL}/register`,
	logoutUrl: `${import.meta.env.VITE_BASE_URL}/logout`,
	tokenRefreshUrl: 'mock-api/auth/refresh',
	getUserUrl: `${import.meta.env.VITE_BASE_URL}/user`,
	updateUserUrl: 'mock-api/auth/user',
	updateTokenFromHeader: true
};
export default jwtAuthConfig;
