import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from "./MovieList";

function GPTMovieSuggestions(props) {
    const { gptMovieNames, gptMovieResultsFromTMDB } = useSelector(store => store.gptReducer);
    //console.log("obj::", gptMovieResultsFromTMDB)
    return (
        <div className='z-10 mt-4 md:mx-4 mx-2'>
            <div className='bg-black z-10 bg-opacity-90 '>
                {
                    /** key can be index in this case as there will be no operation on this array */
                    //gptMovieNames && gptMovieNames.map((movie, index) => <MovieList key={index} title={movie} movies={gptMovieResultsFromTMDB[index]} />)

                    gptMovieResultsFromTMDB && <MovieList title={"Search Results"} movies={gptMovieResultsFromTMDB[0]} />
                }
            </div>
        </div>
    );
}

export default GPTMovieSuggestions;