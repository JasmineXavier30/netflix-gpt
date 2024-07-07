import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "GPT",
    initialState: {
        showGPTSearch: false,
        gptMovieNames: null,
        gptMovieResultsFromTMDB: null
    },
    reducers: {
        toggleGPTSearchView: (state, action) => {
            state.showGPTSearch = !state.showGPTSearch;
        },
        showDefaultGptOption: (state) => {
            state.showGPTSearch = false;
        },
        addGptMovieResultsFromTMDB: (state, action) => {
            const { gptMovieNames, gptMovieResultsFromTMDB } = action.payload;
            state.gptMovieNames = gptMovieNames;
            state.gptMovieResultsFromTMDB = gptMovieResultsFromTMDB;
        }
    }
})

export const { toggleGPTSearchView, showDefaultGptOption, addGptMovieResultsFromTMDB } = gptSlice.actions;

export default gptSlice.reducer;