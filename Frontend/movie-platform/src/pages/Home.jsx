
import { useEffect, useState } from "react";
import { getTrendingMovie } from "../services/tmdbApi";
import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link, useLocation } from "react-router-dom";
import { HiHome, HiSearch, HiCollection, HiUser } from 'react-icons/hi';

import "swiper/css";
import "swiper/css/pagination";
import MobileNavbar from "../components/MobileNavbar";

function Home() {
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);
const location = useLocation();

useEffect(() => {
const fetchMovies = async () => {
try {
setLoading(true);
const data = await getTrendingMovie();
setMovies(data.results);
} catch (error) {
console.error(error);
} finally {
setLoading(false);
}
};
fetchMovies();
}, []);

const SkeletonCard = () => (
<div className="animate-pulse space-y-4">
<div className="bg-gray-800 rounded-xl h-64 w-full"></div>
<div className="h-4 bg-gray-800 rounded w-3/4"></div>
<div className="h-4 bg-gray-800 rounded w-1/2"></div>
</div>
);

return (
<div className="bg-[#0f0f0f] min-h-screen text-white pb-24 md:pb-10">

  <section className="h-[55vh] md:h-[75vh] w-full mb-10">
    {loading ? (
      <div className="w-full h-full bg-gray-900 animate-pulse"></div>
    ) : (
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {movies.slice(0, 5).map((movie) => (
          <SwiperSlide key={movie.id}>
            <div 
              className="relative h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-black/40">
                <div className="absolute bottom-12 md:bottom-20 left-6 md:left-12 max-w-2xl space-y-4">
                  <h2 className="text-3xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                    {movie.title || movie.name}
                  </h2>
                  <p className="hidden md:block text-gray-300 line-clamp-3 text-sm md:text-lg">
                    {movie.overview}
                  </p>
                  <button className="bg-red-600 hover:bg-red-700 px-6 md:px-10 py-2.5 md:py-4 rounded-full font-black uppercase tracking-widest transition-all active:scale-90 shadow-xl shadow-red-600/40 text-xs md:text-sm">
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    )}
  </section>

  <div className="px-5 md:px-14">
    <div className="flex items-center gap-3 md:gap-5 mb-8 md:mb-12">
      <div className="h-7 md:h-10 w-2 bg-red-600 rounded-full"></div>
      <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase italic">Trending Now</h2>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-10">
      {loading 
        ? Array(12).fill(0).map((_, i) => <SkeletonCard key={i} />)
        : movies.map((movie) => (
            <div key={movie.id} className="transition-all duration-300 hover:scale-105 active:scale-95">
              <MovieCard movie={movie} />
            </div>
          ))
      }
    </div>
  </div>

  <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-2xl border-t border-white/5 z-[100] px-6 py-4 flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <Link to="/" className={`flex flex-col items-center transition-colors ${location.pathname === '/' ? 'text-red-600' : 'text-gray-500'}`}>
        <HiHome size={26} />
        <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Home</span>
      </Link>
      <Link to="/search" className={`flex flex-col items-center transition-colors ${location.pathname === '/search' ? 'text-red-600' : 'text-gray-500'}`}>
        <HiSearch size={26} />
        <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Search</span>
      </Link>
      <Link to="/favorites" className={`flex flex-col items-center transition-colors ${location.pathname === '/favorites' ? 'text-red-600' : 'text-gray-500'}`}>
        <HiCollection size={26} />
        <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">My List</span>
      </Link>
      <Link to="/login" className={`flex flex-col items-center transition-colors ${location.pathname === '/login' ? 'text-red-600' : 'text-gray-500'}`}>
        <HiUser size={26} />
        <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Profile</span>
      </Link>
      <MobileNavbar/>
  </nav>

</div>
);
}

export default Home;