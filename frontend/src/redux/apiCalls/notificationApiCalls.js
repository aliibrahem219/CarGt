import { profileActions } from "../slices/profileSlice";
import { notificationActions } from "../slices/notificationSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
//Create notification
export function createNotification(newNotification) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/notification",
        newNotification,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.addNewNotificationToProfile(data));
    } catch (error) {
      toast.error(error.response.data?.message);
      console.log(error.message);
    }
  };
}

//delete notification
export function deleteNotification(notificationId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/notification/${notificationId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(notificationActions.deleteNotification(notificationId));
      dispatch(profileActions.deleteNotificationFromProfile(notificationId));
    } catch (error) {
      toast.error(error.response.data?.message);
      console.log(error.message);
    }
  };
}
//Fetch All notifications
export function fetchAllNotifications(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/notification?user=${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(notificationActions.setNotifications(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
