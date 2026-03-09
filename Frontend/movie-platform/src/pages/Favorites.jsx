import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';


const Favorites = () => {
  const { user } = useSelector((state) => state.auth);
  
 
  const favorites = user?.favorites || [];

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-10 pt-24 text-white">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-10 w-2 bg-red-600 rounded-full"></div>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter">My GilVerse List</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="h-[50vh] flex flex-col items-center justify-center text-gray-500">
           <p className="text-xl italic">Aapki list khali hai. Kuch mast add karo!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} isFavoritePage={true} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Favorites;