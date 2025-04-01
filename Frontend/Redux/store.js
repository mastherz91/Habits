import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "../features/habitSlice";
import { useReducer } from "react";


export const makestore = () => {
    return configureStore({
        reducer: {
            habits: habitReducer
        }
    });
};