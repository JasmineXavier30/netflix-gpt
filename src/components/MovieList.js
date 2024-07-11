import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ title, movies }) {
    //movies = (movies || []).slice(0, 10); // showing only 10 results because of scrollbar-not-hiding issue
    return (
        <div className='py-6 pt-0 pl-4 z-20 relative'>
            <div>
                <h1 className='text-lg py-4 text-white'>{title}</h1>
            </div>
            <div className='flex flex-wrap' style={{ scrollBehavior: 'smooth' }}>
                <div className='flex flex-wrap'>
                    {
                        movies && movies.map(x => x.poster_path && <MovieCard key={x.id} posterPath={x.poster_path} />)
                    }
                </div>
            </div>

        </div>
    );
}

export default MovieList;