import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
//Get User Profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);

      dispatch(profileActions.setProfile(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}

//Get User  balance
export function getUserBalanceProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/balance/${userId}`);

      dispatch(profileActions.setProfile(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//charge balance
export function chargeProfileBalance(userId, amount) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/balance/${userId}`,
        amount,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      toast.success(`you have charge user balance`);
      dispatch(profileActions.chargeBalance(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Upload Profile Photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/users/profile/upload-profile-photo",

        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //the data is the payload for action
      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      toast.success(data.message);
      //modify the user in local storage with new photo
      const user = JSON.parse(localStorage.getItem("user-info"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("user-info", JSON.stringify(user));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Upload Profile
export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUsername(data.username));
      const user = JSON.parse(localStorage.getItem("user-info"));
      user.username = data?.username;
      localStorage.setItem("user-info", JSON.stringify(user));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Delete Profile (Account)
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setLoading());
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      //the data is the payload for action
      dispatch(profileActions.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => {
        dispatch(profileActions.clearIsProfileDeleted());
      }, 2000);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
      dispatch(profileActions.clearLoading());
    }
  };
}
//Get Users Count (for admin dashboard)
export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/count`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      //the data is the payload for action
      dispatch(profileActions.setUserCount(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Get All Users Profiles (for admin dashboard)
export function getAllUsersProfile() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/profile`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      //the data is the payload for action
      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
