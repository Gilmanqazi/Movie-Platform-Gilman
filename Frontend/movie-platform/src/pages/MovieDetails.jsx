import React, { useEffect, useState } from 'react'
import { getMovieDetails } from '../services/tmdbApi'
import { useParams } from 'react-router-dom'
import TrailerModel from './TrailerModel'

const MovieDetails = () => {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    getMovieDetails(id).then((data) => {
      setMovie(data)
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [id])

  // Skeleton Loader for Detail Page
  if (loading) return (
    <div className="min-h-screen bg-black p-10 animate-pulse">
      <div className="h-[70vh] bg-gray-900 rounded-3xl w-full mb-8"></div>
      <div className="h-10 bg-gray-800 w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-800 w-full mb-2"></div>
      <div className="h-4 bg-gray-800 w-2/3"></div>
    </div>
  )

  if (!movie) return <p className="text-white p-6 text-center">Movie not found!</p>

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] text-white font-sans overflow-hidden">
      
      {/* 1. Backdrop Background (Blurry Effect) */}
      <div className="absolute inset-0 z-0">
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
          className="w-full h-full object-cover opacity-30 blur-sm"
          alt="backdrop"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent"></div>
      </div>

      <div className="relative z-10 p-6 md:p-16 flex flex-col md:flex-row gap-12 items-start md:items-center min-h-screen">
        
        {/* 2. Poster Section */}
        <div className="w-full md:w-[400px] flex-shrink-0 group">
          <img
            className="rounded-2xl shadow-2xl shadow-red-900/20 border border-white/10 transform transition-transform duration-500 group-hover:scale-[1.02]"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title} 
          />
        </div>

        {/* 3. Info Section */}
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-none">
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
              <span className="text-red-500">{movie.release_date.split('-')[0]}</span>
              <span className="px-2 py-0.5 border border-gray-600 rounded text-xs uppercase">HD</span>
              <span className="flex items-center gap-1 text-yellow-500">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl italic">
            "{movie.tagline}"
          </p>

          <div className="space-y-4">
            <h3 className="text-xl font-bold uppercase tracking-widest text-red-600">Overview</h3>
            <p className="text-gray-400 text-lg leading-relaxed max-w-4xl">
              {movie.overview || "No description available for this title."}
            </p>
          </div>

          {/* 4. Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-6">
            <TrailerModel movieId={id} />
            <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black px-8 py-4 rounded-xl font-bold transition-all active:scale-95">
              + Add to Favorites
            </button>
          </div>

          {/* 5. Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-white/10">
            <div>
              <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">Status</p>
              <p className="font-semibold">{movie.status}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">Runtime</p>
              <p className="font-semibold">{movie.runtime} mins</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">Budget</p>
              <p className="font-semibold">${(movie.budget / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails