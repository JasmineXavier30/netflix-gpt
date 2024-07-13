import React, { useEffect, useRef } from 'react';
import MovieCard from './MovieCard';

function MovieList({ title, movies }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const handleScroll = (e) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;

        };
        container.addEventListener("wheel", handleScroll, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleScroll);
        }
    }, [])


    //movies = (movies || []).slice(0, 10); // showing only 10 results because of scrollbar-not-hiding issue
    return (
        <div className='py-6 pt-0 pl-4 z-20 relative mx-[2%]'>
            <div>
                <h1 className='text-lg py-4 text-white'>{title}</h1>
            </div>
            <div ref={containerRef} className='flex overflow-x-scroll no-scrollbar h-full overflow-y-hidden'>
                <div className='flex'>
                    {
                        movies && movies.map(x => x.poster_path && <MovieCard key={x.id} posterPath={x.poster_path} />)
                    }
                </div>
            </div>

        </div>
    );
}

export default MovieList;