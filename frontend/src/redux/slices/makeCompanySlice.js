import { createSlice } from "@reduxjs/toolkit";
//we put actions and states here
const makeCompanySlice = createSlice({
  name: "makeCompany",
  initialState: {
    makeCompanies: [],
    makeCompaniesCount: null,
  },
  //we put actions that effect on states in reducers
  reducers: {
    setMakeCompanies(state, actions) {
      state.makeCompanies = actions.payload;
    },
    setMakeCompaniesCount(state, action) {
      state.makeCompaniesCount = action.payload;
    },

    addMakeCompany(state, action) {
      state.makeCompanies.push(action.payload);
    },
    deleteMakeCompany(state, action) {
      state.makeCompanies = state.makeCompanies.filter(
        (c) => c._id !== action.payload
      );
    },
  },
});

const makeCompanyReducer = makeCompanySlice.reducer;
const makeCompanyActions = makeCompanySlice.actions;
export { makeCompanyActions, makeCompanyReducer };
