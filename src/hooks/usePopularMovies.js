import { useEffect } from "react";
import { TMDB_API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";

const usePopularMovies = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getPopularMovieList();
    }, []);

    const getPopularMovieList = async () => {
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', TMDB_API_OPTIONS);
        if (response) {
            const movieList = await response.json();
            dispatch(addPopularMovies(movieList.results))
        }
    }
}

export default usePopularMovies;