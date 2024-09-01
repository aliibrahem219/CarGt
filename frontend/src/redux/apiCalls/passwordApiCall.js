import { passwordActions } from "../slices/passwordSlice";

import request from "../../utils/request";
import { toast } from "react-toastify";
//Forget Password
export function forgetPassword(email) {
  return async () => {
    try {
      const { data } = await request.post("/api/password/reset-password-link", {
        email,
      });

      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Get Reset Password
export function getResetPassword(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/password/reset-password/${userId}/${token}`);
    } catch (error) {
      console.log(error + "get");
      dispatch(passwordActions.setError());
    }
  };
}
//Reset the Password
export function resetPassword(password, userId, token) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(
        `/api/password/reset-password/${userId}/${token}`,
        { password: password }
      );
      dispatch(passwordActions.clearError());
      toast.success(data.message);
    } catch (error) {
      console.log(error.message + "re");
    }
  };
}
