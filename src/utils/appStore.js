import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";

const appStore = configureStore({
    reducer: {
        userReducer,
        moviesReducer,
        gptReducer,
        configReducer
    }
});

export default appStore;