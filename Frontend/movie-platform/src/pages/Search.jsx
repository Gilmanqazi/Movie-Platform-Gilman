import React, { useEffect, useState } from 'react';
import { searchMovies } from '../services/tmdbApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // URL se query nikalna (e.g., ?q=interstellar)
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get('q') || "";

  // Jab bhi URL ka 'q' change ho, API call karein
  useEffect(() => {
    if (!q) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await searchMovies(q);
        // TMDB data.results bhejta hai, check kar lena
        setResults(data.results || data); 
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchResults, 500);
    return () => clearTimeout(timer);
  }, [q]); // Dependency 'q' honi chahiye

  const handleInputChange = (e) => {
    const value = e.target.value;
    // URL update karo, useEffect khud baaki sambhal lega
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white p-6 md:p-12">
      {/* Search Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-red-600 italic uppercase tracking-tighter">Search</span> Results
        </h1>
        
        <div className="relative group">
          <input
            type="text"
            placeholder="Search for movies, actors, or directors..."
            value={q}
            onChange={handleInputChange}
            className="w-full bg-[#1a1a1a] border border-white/10 p-5 pl-14 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all shadow-2xl text-lg"
          />
          <svg className="w-6 h-6 absolute left-5 top-5 text-gray-500 group-focus-within:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {results.length > 0 ? (
            results.map((item) => (
              <Link 
                key={item.id} 
                to={`/movie/${item.id}`}
                className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg"
              >
                {item.poster_path ? (
                  <img
                    className="w-full h-[300px] object-cover"
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    alt={item.title}
                  />
                ) : (
                  <div className="w-full h-[300px] bg-gray-800 flex items-center justify-center text-gray-500 text-xs text-center p-4">
                    No Poster Available
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                  <p className="text-sm font-bold truncate">{item.title || item.name}</p>
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1">
                    ⭐ {item.vote_average?.toFixed(1)}
                  </p>
                </div>
              </Link>
            ))
          ) : q && (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-xl italic">No results found for "{q}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;