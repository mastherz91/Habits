import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../features/habitSlice";

export const makestore = () => {
    return configureStore({
        reducer: {
            habits: habitReducer
        }
    });
};