// auth.ts
let isAuthenticated = false;

export const setAuthenticated = (status: boolean) => {
  isAuthenticated = status;
};

export const isAuthenticatedUser = () => {
  return isAuthenticated;
};
