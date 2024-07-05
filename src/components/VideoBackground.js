import React from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

function VideoBackground({ movieId }) {
    useMovieTrailer(movieId);
    const trailerSelector = useSelector(store => store.moviesReducer?.trailer);

    return (
        <div className='w-screen mx-auto p-0 overflow-x-hidden '>
            <iframe className="w-screen aspect-video" src={`https://www.youtube.com/embed/${trailerSelector?.key}?&autoplay=1&mute=1`} title="Inside Out 2 | Final Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
        </div>
    );
}

export default VideoBackground;