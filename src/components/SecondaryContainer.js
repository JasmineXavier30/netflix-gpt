import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movies = useSelector(store => store.moviesReducer);
    return (
        movies &&
        <div className="bg-black bg-opacity-90">
            <div className="lg:-mt-60 md:-mt-48" >
                    <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
                    <MovieList title={"Popular"} movies={movies.popularMovies} />
                    <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
                    <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
            </div>
        </div>
    )
}

export default SecondaryContainer;