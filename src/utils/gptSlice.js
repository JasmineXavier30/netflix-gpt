import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "GPT",
    initialState: {
        showGPTSearch: false
    },
    reducers: {
        toggleGPTSearchView: (state, action) => {
            state.showGPTSearch = !state.showGPTSearch;
        },
        showDefaultGptOption: (state) => {
            state.showGPTSearch = false;
        }
    }
})

export const { toggleGPTSearchView, showDefaultGptOption } = gptSlice.actions;

export default gptSlice.reducer;