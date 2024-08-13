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
        const gptQuery = `Act as a movie recommendation system and suggest some movies for the query ${searchTextVal}. Only give me names of 10 movies, comma separated like the example result given ahead. Example Result: Don, Run, Mila, Pink, Ghilli.`

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
            gptMovieNames = ["Interstellar", "Dunkirk", "Oppenheimer", "Titanic", "Memento", "Avatar"]
        }
        else gptMovieNames = gptResults?.choices?.[0]?.message?.content.split(",");
        gptMovieNames = gptMovieNames.map(x => x.toLowerCase().trim());
        console.log("gptMovieNames::", gptMovieNames)
        //For each movie search TMDB API and display poster
        const moviesPromiseArr = gptMovieNames.map(x => searchMoviesInTMDB(x)); // -> [Promise, Promise...]
        let tmdbMoviesList = await Promise.all(moviesPromiseArr);
        tmdbMoviesList = tmdbMoviesList.flat();
        console.log("tmdbMoviesList::", tmdbMoviesList)
        let exactMoviesList = tmdbMoviesList.filter(x => gptMovieNames.includes((x.title || '').toLowerCase().trim()));
        console.log("exactMoviesList::", exactMoviesList)
        dispatch(addGptMovieResultsFromTMDB({ gptMovieNames, gptMovieResultsFromTMDB: [exactMoviesList] }));
    }

    const searchMoviesInTMDB = async (movieName) => {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`, TMDB_API_OPTIONS);
        const json = await data.json();
        return json.results;
    }

    const langConfig = useSelector(store => store.configReducer.lang);

    return (
        <div className='z-10 mx-2 md:mx-auto'>
            <form className=' bg-black md:w-1/2 mx-auto grid grid-cols-12 z-10 bg-opacity-80' onSubmit={e => e.preventDefault()}>
                <input ref={searchText} type="text" className='md:p-4 md:m-4 m-2 p-2 col-span-9 rounded' placeholder={lang[langConfig].placeholder} />
                <button className='md:p-4 md:m-4 m-2 p-2 rounded bg-red-700 text-white col-span-3 font-bold hover:bg-opacity-80' onClick={handleGPTSearchClick}>{lang[langConfig].search}</button>
            </form>
        </div>
    );
}

export default GPTSearchBar;