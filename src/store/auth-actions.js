import { authActions } from "./auth-slice";

let logoutTimer;

export const setTokenExpiration = (expirationTime) => {
  return (dispatch, getState) => {
    const isLoggedIn = getState().auth.isLoggedIn;
    if (!isLoggedIn) {
      clearTimeout(logoutTimer);
    }
    logoutTimer = setTimeout(() => {
      dispatch(authActions.logout());
      localStorage.removeItem("token");
    }, expirationTime);
  };
};
