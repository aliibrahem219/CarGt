import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { postReducer } from "./slices/postSlice";
import { offerReducer } from "./slices/offerSlice";
import { categoryReducer } from "./slices/categorySlice";
import { commentReducer } from "./slices/commentSlice";
import { passwordReducer } from "./slices/passwordSlice";
import { evaliationReducer } from "./slices/evaliationSlice";
import { makeCompanyReducer } from "./slices/makeCompanySlice";
import { carsCategoryReducer } from "./slices/carsCategorySlice";
import { notificationReducer } from "./slices/notificationSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    category: categoryReducer,
    carsCategory: carsCategoryReducer,
    makeCompany: makeCompanyReducer,
    comment: commentReducer,
    evaliation: evaliationReducer,
    password: passwordReducer,
    offer: offerReducer,
    notification: notificationReducer,
  },
});

export default store;
