import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";

const appStore = configureStore({
    reducer: {
        userReducer,
        moviesReducer
    }
});

export default appStore;