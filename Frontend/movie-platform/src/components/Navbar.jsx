import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../features/auth/Hook/useAuth";
import { useSelector } from "react-redux";

function Navbar() {
  const { handleLogout } = useAuth();
  const { user } = useSelector((state) => state.auth); // User status check karne ke liye
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // Form submit refresh rokne ke liye
    if (search.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(search)}`);
      setSearch(""); // Search ke baad box clear
    }
  };

  const onLogoutClick = async () => {
    await handleLogout(); // Function call kiya
    navigate("/login"); // Direct login par bhej diya
  };

  return (
    <nav className="bg-[#0b0b0b]/95 backdrop-blur-md sticky top-0 z-50 text-white px-8 py-4 flex items-center justify-between border-b border-white/5">
      
      {/* Left side: Logo & Links */}
      <div className="flex items-center gap-10">
        <Link to="/" className="text-3xl font-black text-red-600 tracking-tighter italic hover:opacity-80 transition-opacity">
          GILVERSE
        </Link>

        <div className="hidden lg:flex gap-8 text-sm font-medium text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/movies" className="hover:text-white transition-colors">Movies</Link>
          <Link to="/tv" className="hover:text-white transition-colors">TV Shows</Link>
          <Link to="/favorites" className="hover:text-white transition-colors">My List</Link>
        </div>
      </div>

      {/* Right side: Search & Auth */}
      <div className="flex items-center gap-6">
        
        {/* Modern Search Bar */}
        <form onSubmit={handleSearch} className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search titles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 px-4 py-2 pl-10 rounded-full text-sm outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent w-48 lg:w-64 transition-all"
          />
          <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </form>

        <div className="flex items-center gap-4 border-l border-white/10 pl-6">
          {!user ? (
            <>
              <Link to="/login" className="text-sm font-semibold hover:text-red-500 transition-colors">
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-red-600 px-5 py-2 rounded-lg text-sm font-bold hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-600/20"
              >
                Join Now
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400 hidden md:block">
                Hi, <span className="text-white font-medium">{user.username}</span>
              </span>
              <button 
                onClick={onLogoutClick}
                className="bg-[#252525] border border-white/10 px-5 py-2 rounded-lg text-sm font-bold hover:bg-white hover:text-black active:scale-95 transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;