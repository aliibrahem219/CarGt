import { makeCompanyActions } from "../slices/makeCompanySlice";

import request from "../../utils/request";
import { toast } from "react-toastify";
//Fetch All make-companies
export function fetchMakeCompanies() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/make-companies");

      dispatch(makeCompanyActions.setMakeCompanies(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Create MakeCompany
export function createMakeCompany(newMakeCompany) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/make-companies",
        newMakeCompany,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(makeCompanyActions.addMakeCompany(data));
      toast.success("MakeCompany created successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Delete MakeCompany
export function deleteMakeCompany(makeCompanyId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(
        `/api/make-companies/${makeCompanyId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(makeCompanyActions.deleteMakeCompany(data.makeCompanyId));
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Get Make Companies Count
export function getMakeCompaniesCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/make-companies/count`);

      dispatch(makeCompanyActions.setMakeCompaniesCount(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
