const jwtAuthConfig = {
  tokenStorageKey: "jwt_access_token",
  signInUrl: "http://13.234.232.10/api/login",
  signUpUrl: "mock-api/auth/sign-up",
  tokenRefreshUrl: "mock-api/auth/refresh",
  getUserUrl: "mock-api/auth/user",
  updateUserUrl: "mock-api/auth/user",
  updateTokenFromHeader: true,
};
export default jwtAuthConfig;
