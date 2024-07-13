import React from 'react';
import { TMDB_IMG_CDN_URL } from '../utils/constants';

function MovieCard({ posterPath }) {
    return (
        <div className='lg:w-44 md:w-36 w-36 mr-4 lg:mr-8 cursor-pointer'>
            <img src={TMDB_IMG_CDN_URL + posterPath} alt="Movie Poster" className='rounded pb-4' />
        </div>
    );
}

export default MovieCard;