import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "GPT",
    initialState: {
        showGPTSearch: false,
        gptSearchText: null,
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
        addGPTSearchText: (state, action) => {
            state.gptSearchText = action.payload;
        },
        addGptMovieResultsFromTMDB: (state, action) => {
            const { gptMovieNames, gptMovieResultsFromTMDB } = action.payload;
            state.gptMovieNames = gptMovieNames;
            state.gptMovieResultsFromTMDB = gptMovieResultsFromTMDB;
        }
    }
})

export const { toggleGPTSearchView, showDefaultGptOption, addGPTSearchText, addGptMovieResultsFromTMDB } = gptSlice.actions;

export default gptSlice.reducer;