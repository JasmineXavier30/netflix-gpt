import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from "./MovieList";

function GPTMovieSuggestions(props) {
    const { gptMovieNames, gptMovieResultsFromTMDB } = useSelector(store => store.gptReducer);
    //console.log("obj::", gptMovieResultsFromTMDB)
    return (
        <div className='z-10 mt-4 mx-4'>
            <div className='bg-black z-10 bg-opacity-90 '>
                {
                    gptMovieNames && gptMovieNames.map((movie, index) => <MovieList key={movie} title={movie} movies={gptMovieResultsFromTMDB[index]} />)
                }
            </div>
        </div>
    );
}

export default GPTMovieSuggestions;