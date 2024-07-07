import { useEffect } from "react";
import { TMDB_API_OPTIONS, TMDB_NOWPLAYING_MOVIES_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector(store => store.moviesReducer.nowPlayingMovies)

    useEffect(() => {
        !nowPlayingMovies && getNowPlayingMovieList(); // memoization
    }, []);

    const getNowPlayingMovieList = async () => {
        const response = await fetch(TMDB_NOWPLAYING_MOVIES_URL, TMDB_API_OPTIONS);
        if (response) {
            const movieList = await response.json();
            dispatch(addNowPlayingMovies(movieList.results))
        }
    }
}

export default useNowPlayingMovies;