import React, { useRef } from 'react';
import { lang } from "../utils/languageConstants";
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { TMDB_API_OPTIONS } from '../utils/constants';
import { addGPTSearchText, addGptMovieResultsFromTMDB } from '../utils/gptSlice';

function GPTSearchBar() {
    const searchText = useRef();
    const dispatch = useDispatch();
    const gptSearchText = useSelector(store => store.gptReducer.gptSearchText);

    const handleGPTSearchClick = async () => {
        const searchTextVal = searchText.current.value;

        if (gptSearchText === searchTextVal) return; // Avoid api call if query is same
        dispatch(addGPTSearchText(searchTextVal));

        // make openAI GPT API call and get movie results
        const gptQuery = `Act as a movie recommendation system and suggest some movies for the query ${searchTextVal}. Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Don, Run, Mila, Pink, Ghilli.`

        let gptResults;
        try {
            // billing issue. so mocking results for now.
            gptResults = await openai.chat.completions.create({
                messages: [{ role: "user", content: gptQuery }],
                model: "gpt-3.5-turbo",
            }); 
        } catch (e) {
            console.log("OpenAI API issue: ", e)
        }
        //console.log(gptResults.choices)
        let gptMovieNames;
        if (!gptResults || !gptResults.choices) { //fallback values
            gptMovieNames = ["Lord of the Rings", "Terminator", "Bat Man", "Twilight Saga", "Interstellar"]
        }
        else gptMovieNames = gptResults?.choices?.[0]?.message?.content.split(",");
        //console.log(gptMovieNames)
        //For each movie search TMDB API and display poster
        const moviesPromiseArr = gptMovieNames.map(x => searchMoviesInTMDB(x)); // -> [Promise, Promise...]
        let tmdbMoviesList = await Promise.all(moviesPromiseArr);
        //console.log(tmdbMoviesList)
        dispatch(addGptMovieResultsFromTMDB({ gptMovieNames, gptMovieResultsFromTMDB: tmdbMoviesList }));
    }

    const searchMoviesInTMDB = async (movieName) => {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`, TMDB_API_OPTIONS);
        const json = await data.json();
        return json.results;
    }

    const langConfig = useSelector(store => store.configReducer.lang);

    return (
        <div className='z-10'>
            <form className=' bg-black w-1/2 mx-auto grid grid-cols-12 z-10 bg-opacity-80' onSubmit={e => e.preventDefault()}>
                <input ref={searchText} type="text" className='p-4 m-4 col-span-9 rounded' placeholder={lang[langConfig].placeholder} />
                <button className='px-4 py-2 m-4 rounded bg-red-700 text-white col-span-3 font-bold hover:bg-opacity-80' onClick={handleGPTSearchClick}>{lang[langConfig].search}</button>
            </form>
        </div>
    );
}

export default GPTSearchBar;