import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/auth/redux/authSlice"; // Apna sahi path check kar lena

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import Favorites from './pages/Favorites';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const dispatch = useDispatch();
  const { user,loading } = useSelector((state) => state.auth);
  // const hasFetched = useRef(false);

  useEffect(() => {
    if (user) dispatch(fetchUser());
  }, []);

  // Jab tak backend response nahi deta, ek clean loading screen dikhao
  if (loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center">
        <h1 className="text-red-600 text-4xl font-black italic animate-pulse mb-4">GILVERSE</h1>
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Protected Routes */}
        <Route path='/' element={<Home />} />
        <Route path="/movies" element={<Movies/>} />
  <Route path="/tv" element={<TvShows />} />
  <Route path="/favorites" element={<Favorites/> } /> 

        {/* Public Routes */}
        <Route path='/search' element={<Search />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  );
};

export default App;