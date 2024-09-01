import { createSlice } from "@reduxjs/toolkit";
//we put actions and states here
const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  //we put actions that effect on states in reducers
  reducers: {
    setCategories(state, actions) {
      state.categories = actions.payload;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (c) => c._id !== action.payload
      );
    },
  },
});

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;
export { categoryActions, categoryReducer };
