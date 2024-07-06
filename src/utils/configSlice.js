import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: "config",
    initialState: {
        lang: "en"
    },
    reducers: {
        changeLanguage: (state, action) => {
            state.lang = action.payload;
        },
        showDefaultLang: (state) => {
            state.lang = "en";
        }
    }
});

export const { changeLanguage, showDefaultLang } = configSlice.actions;

export default configSlice.reducer;