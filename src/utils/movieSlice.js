import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        trailer: null
    },
    reducers: {
        // actions
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTrailer: (state, action) => {
            state.trailer = action.payload;
        }
    }
})

export const { addNowPlayingMovies, addPopularMovies, addTrailer } = movieSlice.actions;

export default movieSlice.reducer;