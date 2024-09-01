import { profileActions } from "../slices/profileSlice";
import { evaliationActions } from "../slices/evaliationSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
//Create Evaliation
export function createEvaliation(newEvaliation) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/evaliations", newEvaliation, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(profileActions.addNewEvaliationToProfile(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}

//update evaliation
export function updateEvaliation(evaliationId, evaliation) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/evaliations/${evaliationId}`,
        evaliation,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.updateEvaliationProfile(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//delete Evaliation
export function deleteEvaliation(evaliationId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/evaliations/${evaliationId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(evaliationActions.deleteEvaliation(evaliationId));
      dispatch(profileActions.deleteEvaliationFromProfile(evaliationId));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Fetch All Evaliations
export function fetchAllEvaliations() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/evaliations`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });

      dispatch(evaliationActions.setEvaliations(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
