import { useEffect } from "react";
import { TMDB_API_OPTIONS, TMDB_UPCOMING_MOVIES_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";

const useUpcomingMovies = () => {

    const dispatch = useDispatch();
    const upcomingMovies = useSelector(store => store.moviesReducer.upcomingMovies);

    useEffect(() => {
        !upcomingMovies && getUpcomingMovieList();
    }, []);

    const getUpcomingMovieList = async () => {
        const response = await fetch(TMDB_UPCOMING_MOVIES_URL, TMDB_API_OPTIONS);
        if (response) {
            const movieList = await response.json();
            dispatch(addUpcomingMovies(movieList.results))
        }
    }
}

export default useUpcomingMovies;