import { useEffect } from "react";
import { TMDB_API_OPTIONS, TMDB_TOPRATED_MOVIES_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";

const useTopRatedMovies = () => {

    const dispatch = useDispatch();
    const topRatedMovies = useSelector(store => store.moviesReducer.topRatedMovies);

    useEffect(() => {
        !topRatedMovies && getTopRatedMovieList();
    }, []);

    const getTopRatedMovieList = async () => {
        const response = await fetch(TMDB_TOPRATED_MOVIES_URL, TMDB_API_OPTIONS);
        if (response) {
            const movieList = await response.json();
            dispatch(addTopRatedMovies(movieList.results))
        }
    }
}

export default useTopRatedMovies;