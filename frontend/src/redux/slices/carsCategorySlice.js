import { createSlice } from "@reduxjs/toolkit";

const carsCategorySlice = createSlice({
  name: "carsCategory",
  initialState: {
    carsCategories: [],
    carsCategoriesCount: null,
  },

  reducers: {
    setCarsCategories(state, actions) {
      state.carsCategories = actions.payload;
    },
    setCarsCategoriesCount(state, actions) {
      state.carsCategoriesCount = actions.payload;
    },
    addCarsCategory(state, action) {
      state.carsCategories.push(action.payload);
    },
    deleteCarsCategory(state, action) {
      state.carsCategories = state.carsCategories.filter(
        (c) => c._id !== action.payload
      );
    },
  },
});

const carsCategoryReducer = carsCategorySlice.reducer;
const carsCategoryActions = carsCategorySlice.actions;
export { carsCategoryActions, carsCategoryReducer };
