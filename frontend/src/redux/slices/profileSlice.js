import { createSlice } from "@reduxjs/toolkit";
//we put actions and states here
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    isProfileDeleted: false,
    usersCount: null,
    profiles: [],
  },

  //we put actions that effect on states in reducers
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setProfilePhoto(state, action) {
      state.profile.profilePhoto = action.payload;
    },
    updateProfile(state, action) {
      state.profile = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsProfileDeleted(state) {
      state.isProfileDeleted = true;
      state.loading = false;
    },
    clearIsProfileDeleted(state) {
      state.isProfileDeleted = false;
    },
    setUserCount(state, action) {
      state.usersCount = action.payload;
    },
    setProfiles(state, action) {
      state.profiles = action.payload;
    },
    chargeBalance(state, action) {
      state.profile.balance = action.payload;
    },
    addNewEvaliationToProfile(state, action) {
      state.profile.evaliations.push(action.payload);
    },
    updateEvaliationProfile(state, action) {
      state.profile.evaliations = state.profile.evaliations.map((evaliation) =>
        evaliation._id === action.payload._id ? action.payload : evaliation
      );
    },
    deleteEvaliationFromProfile(state, action) {
      const evaliation = state.profile.evaliations.find(
        (c) => c._id === action.payload
      );
      const evaliationIndex = state.profile.evaliations.indexOf(evaliation);
      state.profile.evaliations.splice(evaliationIndex, 1);
    },
    addNewNotificationToProfile(state, action) {
      state.profile.notifications.push(action.payload);
    },

    deleteNotificationFromProfile(state, action) {
      const notification = state.profile.notifications.find(
        (c) => c._id === action.payload
      );
      const notificationIndex =
        state.profile.notifications.indexOf(notification);
      state.profile.notifications.splice(notificationIndex, 1);
    },
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;
export { profileActions, profileReducer };
