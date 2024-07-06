import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movies = useSelector(store => store.moviesReducer);
    console.log("movies.popularMovies:::", movies.popularMovies)
    return (
        movies &&
        <div className="bg-black">
            <div className="-mt-72">
                <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
                <MovieList title={"Popular"} movies={movies.popularMovies} />
                <MovieList title={"Comedy"} movies={movies.nowPlayingMovies} />
                <MovieList title={"Family Drama"} movies={movies.nowPlayingMovies} />
            </div>
        </div>
    )
}

export default SecondaryContainer;