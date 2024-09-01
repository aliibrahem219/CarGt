import { carsCategoryActions } from "../slices/carsCategorySlice";

import request from "../../utils/request";
import { toast } from "react-toastify";
//Fetch All Cars Categories
export function fetchCarsCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/cars-categories");

      dispatch(carsCategoryActions.setCarsCategories(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//get Cars Categories Count
export function getCarsCategoriesCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/cars-categories/count");
      dispatch(carsCategoryActions.setCarsCategoriesCount(data));
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Create Car Category
export function createCarCategory(newCarCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/cars-categories",
        newCarCategory,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(carsCategoryActions.addCarsCategory(data));
      toast.success("Car Category created successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
//Delete Car Category
export function deleteCarCategory(carCategoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(
        `/api/cars-categories/${carCategoryId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(carsCategoryActions.deleteCarsCategory(data.carCategoryId));
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data?.message);
    }
  };
}
