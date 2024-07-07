import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { addTrailer } from '../utils/movieSlice';
import { TMDB_API_OPTIONS } from '../utils/constants';

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trailer = useSelector(store => store.moviesReducer.trailer)

    const getMovieVideosList = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, TMDB_API_OPTIONS);
        if (data) {
            const json = await data.json();
            let trailer = (json.results || []).filter(x => x.type === "Trailer");
            trailer = trailer ? trailer[0] : (json.results || [])[0]; // any video if trailer is not present
            dispatch(addTrailer(trailer));
        }
    }

    useEffect(() => {
        !trailer && getMovieVideosList();
    }, []);
}

export default useMovieTrailer;