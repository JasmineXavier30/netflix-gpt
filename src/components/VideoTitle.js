import React from 'react';

function VideoTitle({ title, overview }) {
    return (
        <div className='w-screen aspect-video pt-[20%] px-12 absolute text-white bg-gradient-to-r from-black'>
            <h1 className='text-3xl font-bold'>{title}</h1>
            <p className='w-1/4 py-10'>{overview}</p>
            <div>
                <button className='px-4 py-2 mr-4 bg-white text-black rounded font-bold hover:bg-opacity-80'>Play</button>
                <button className='px-4 py-2 bg-gray-500 text-white rounded font-bold hover:bg-opacity-80'>More Info</button>
            </div>
        </div>
    );
}

export default VideoTitle;