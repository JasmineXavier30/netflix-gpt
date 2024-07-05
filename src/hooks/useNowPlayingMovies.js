import { useEffect } from "react";
import { TMDB_API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        getNowPlayingMovieList();
    }, []);

    const getNowPlayingMovieList = async () => {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', TMDB_API_OPTIONS);
        if (response) {
            const movieList = await response.json();
            dispatch(addNowPlayingMovies(movieList.results))
        }
    }
}

export default useNowPlayingMovies;