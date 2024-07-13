import React from 'react';
import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

function VideoBackground({ movieId }) {
    useMovieTrailer(movieId);
    const trailerSelector = useSelector(store => store.moviesReducer?.trailer);

    return (
        <div className=''>
            <iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${trailerSelector?.key}?&autoplay=1&mute=1`} title="Final Trailer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"></iframe>
        </div>
    );
}

export default VideoBackground;