import React from 'react';
import { lang } from "../utils/languageConstants";
import { useSelector } from 'react-redux';

function GPTSearchBar(props) {
    const langConfig = useSelector(store => store.configReducer.lang)
    return (
        <div className='z-10'>
            <form className=' bg-black w-1/2 mx-auto grid grid-cols-12 z-10 bg-opacity-80'>
                <input type="text" className='p-4 m-4 col-span-9 rounded' placeholder={lang[langConfig].placeholder} />
                <button className='px-4 py-2 m-4 rounded bg-red-700 text-white col-span-3 font-bold hover:bg-opacity-80'>{lang[langConfig].search}</button>
            </form>
        </div>
    );
}

export default GPTSearchBar;