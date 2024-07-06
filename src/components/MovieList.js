import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ title, movies }) {
    return (
        <div className='py-6 pt-0 pl-4 z-20 relative'>
            <div>
                <h1 className='text-lg py-4 text-white'>{title}</h1>
            </div>
            <div className='flex overflow-x-auto no-scrollbar'>
                <div className='flex'>
                    {
                        movies && movies.map(x => <MovieCard key={x.id} posterPath={x.poster_path} />)
                    }
                </div>
            </div>

        </div>
    );
}

export default MovieList;