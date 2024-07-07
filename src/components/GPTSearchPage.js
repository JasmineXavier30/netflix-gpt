import React from 'react';
import GPTSearchBar from './GPTSearchBar';
import GPTMovieSuggestions from './GPTMovieSuggestions';
import { BG_IMG } from '../utils/constants';

function GPTSearchPage(props) {
    return (
        <div className=''>
            <div className="fixed -z-10 ">
                <img src={BG_IMG} alt="Background" className=" w-screen h-screen" />
            </div>
            <div className='pt-[10%]'>
                <GPTSearchBar />
                <GPTMovieSuggestions />
            </div>
        </div>
    );
}

export default GPTSearchPage;