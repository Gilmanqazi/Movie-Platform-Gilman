import React, { useState, useEffect } from "react";
import axios from "axios";

const TrailerModal = ({ movieId, movieTitle }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId || !isModalOpen) return;

    const fetchTrailer = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=26c38b5f0dbca876bf9d74ccfefd60d8&append_to_response=videos`
        );

        const videos = res.data.videos?.results;
        const trailer = videos?.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey(null);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId, isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    setTrailerKey(null);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-red-600/20"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        <span>Watch Trailer</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fadeIn" onClick={closeModal}>
          <div className="relative bg-[#111] w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
            
            {/* Header */}
            <div className="p-4 flex justify-between items-center border-b border-white/5 bg-[#1a1a1a]">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 truncate pr-4">
                {movieTitle ? `${movieTitle} - Official Trailer` : "Movie Trailer"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors text-xl">✕</button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black relative flex items-center justify-center">
              {loading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-600"></div>
                  <p className="text-xs text-gray-500 italic">Searching Trailer...</p>
                </div>
              ) : trailerKey ? (
                <>
                  {/* Bot Error Bypass Embed */}
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&modestbranding=1&rel=0&origin=${window.location.origin}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  {/* Fallback Link in case iframe still fails */}
                  <div className="absolute bottom-4 right-4 opacity-50 hover:opacity-100 transition-opacity">
                    <a 
                      href={`https://www.youtube.com/watch?v=${trailerKey}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-[10px] bg-black/80 text-white px-3 py-1 rounded-full border border-white/10"
                    >
                      Not playing? Open on YouTube ↗
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center p-10">
                  <p className="text-gray-400 mb-6 text-sm">Trailer data not available on TMDB.</p>
                  <a 
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle + " official trailer")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all inline-block text-sm"
                  >
                    Search on YouTube 🔍
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrailerModal;