import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiHome, HiSearch, HiCollection, HiUser } from 'react-icons/hi';

const MobileNavbar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', icon: <HiHome size={26} />, path: '/' },
    { name: 'Search', icon: <HiSearch size={26} />, path: '/search' },
    { name: 'My List', icon: <HiCollection size={26} />, path: '/favorites' },
    { name: 'Profile', icon: <HiUser size={26} />, path: '/login' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-2xl border-t border-white/5 z-[100] px-6 py-3 flex justify-between items-center shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => (
        <Link 
          key={item.name} 
          to={item.path} 
          className={`flex flex-col items-center gap-1 transition-all ${
            location.pathname === item.path ? 'text-red-600 scale-110' : 'text-gray-500 hover:text-white'
          }`}
        >
          {item.icon}
          <span className="text-[10px] font-bold uppercase tracking-tighter">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileNavbar;