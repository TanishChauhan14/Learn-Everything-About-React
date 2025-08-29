import { configureStore } from "@reduxjs/toolkit";
import blogreducer from "../features/authSlice";

export const blogstore = configureStore({
    reducer : blogreducer
})