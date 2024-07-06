import React from 'react';
import { TMDB_IMG_CDN_URL } from '../utils/constants';

function MovieCard({ posterPath }) {
    return (
        <div className='w-36 pr-4'>
            <img src={TMDB_IMG_CDN_URL + posterPath} alt="Movie Poster" className='rounded' />
        </div>
    );
}

export default MovieCard;