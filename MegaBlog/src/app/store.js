import { configureStore } from "@reduxjs/toolkit";
import  authReducer   from "../features/authSlice";

export const blogstore = configureStore({
     reducer: {
        auth: authReducer
    }
})