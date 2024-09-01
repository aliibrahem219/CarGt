import { createSlice } from "@reduxjs/toolkit";
//we put actions and states here
const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
  },
  reducers: {
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
    deleteNotification(state, action) {
      state.notifications = state.notifications.filter(
        (c) => c._id !== action.payload
      );
    },
  },
});

const notificationReducer = notificationSlice.reducer;
const notificationActions = notificationSlice.actions;
export { notificationActions, notificationReducer };
