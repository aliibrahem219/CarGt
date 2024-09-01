import { authActions } from "../slices/authSlice";

import request from "../../utils/request";
import { toast } from "react-toastify";
//Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);

      dispatch(authActions.login(data));
      localStorage.setItem("user-info", JSON.stringify(data));
      toast.info("welcome");
    } catch (error) {
      toast.error(error.response.data?.message);
      console.log(error.message);
    }
  };
}
//Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("user-info");
    toast.info("You have logged out");
  };
}
//Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);

      dispatch(authActions.register(data.message));
      toast.info("welcome");
    } catch (error) {
      toast.error(error.response.data?.message);
      console.log(error.message);
    }
  };
}
//Verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);

      dispatch(authActions.setIsEmailVerifeid());
    } catch (error) {
      toast.error(error.response.data?.message);
      console.log(error?.message);
    }
  };
}
