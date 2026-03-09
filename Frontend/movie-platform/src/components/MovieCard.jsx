import React from 'react'
import { Link } from 'react-router-dom'
import TrailerModal from '../pages/TrailerModel'

const MovieCard = ({ movie }) => {
  return (
    <div className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-red-600/20 hover:shadow-2xl active:scale-95">
      
      {/* 1. Poster Image */}
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          loading="lazy"
        />
      </div>

      {/* 2. Glassmorphic Overlay (Appears on Hover) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg">
          <p className="text-[10px] font-bold text-yellow-500 flex items-center gap-1">
            ⭐ {movie.vote_average?.toFixed(1)}
          </p>
        </div>

        {/* Movie Info */}
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-black italic uppercase tracking-tighter text-sm line-clamp-2 mb-1">
            {movie.title}
          </h3>
          <p className="text-[10px] text-gray-400 mb-3 font-medium">
            {movie.release_date?.split('-')[0]} • Movie
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Link 
              to={`/movie/${movie.id}`}
              className="w-full text-center bg-white text-black py-2 rounded-lg text-[10px] font-bold hover:bg-gray-200 transition-colors"
            >
              VIEW DETAILS
            </Link>
            
            {/* Custom styled Trailer Button (pass a class to TrailerModal if possible) */}
            <div className="w-full">
               <TrailerModal movieId={movie.id} movieTitle={movie.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard