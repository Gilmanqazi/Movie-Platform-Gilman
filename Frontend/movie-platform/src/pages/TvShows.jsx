import React, { useEffect, useState } from 'react';
import { getTVShows } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard';

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTVShows().then(data => {
      setShows(data.results);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b0b] p-8 pt-24 text-white">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-8 w-2 bg-red-600 rounded-full shadow-[0_0_10px_red]"></div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">TV Series</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {loading 
          ? Array(12).fill(0).map((_, i) => <div key={i} className="h-64 bg-gray-900 animate-pulse rounded-xl"></div>)
          : shows.map(show => <MovieCard key={show.id} movie={show} />)
        }
      </div>
    </div>
  );
};

export default TVShows;