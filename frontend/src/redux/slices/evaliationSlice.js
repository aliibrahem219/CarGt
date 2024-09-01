import { createSlice } from "@reduxjs/toolkit";
//we put actions and states here
const evaliationSlice = createSlice({
  name: "evaliation",
  initialState: {
    evaliations: [],
  },
  reducers: {
    setEvaliations(state, action) {
      state.evaliations = action.payload;
    },
    deleteEvaliation(state, action) {
      state.evaliations = state.evaliations.filter(
        (c) => c._id !== action.payload
      );
    },
  },
});

const evaliationReducer = evaliationSlice.reducer;
const evaliationActions = evaliationSlice.actions;
export { evaliationActions, evaliationReducer };
