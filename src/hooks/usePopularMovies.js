import { useEffect } from "react";
import { TMDB_API_OPTIONS, TMDB_POPULAR_MOVIES_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {

    const dispatch = useDispatch();
    const popularMovies = useSelector(store => store.moviesReducer.popularMovies)

    useEffect(() => {
        !popularMovies && getPopularMovieList();
    }, []);

    const getPopularMovieList = async () => {
        const response = await fetch(TMDB_POPULAR_MOVIES_URL, TMDB_API_OPTIONS);
        if (response) {
            const movieList = await response.json();
            dispatch(addPopularMovies(movieList.results))
        }
    }
}

export default usePopularMovies;