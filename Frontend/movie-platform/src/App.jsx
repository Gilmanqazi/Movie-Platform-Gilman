import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./features/auth/redux/authSlice"; // Apna sahi path check kar lena

import Home from './pages/Home';
import Navbar from './components/Navbar';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import ProtectedRoute from './components/ProtectedRoutes';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import Favorites from './pages/Favorites';

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Ye line refresh par user ko wapas database se dhoond ke layegi
    dispatch(fetchUser());
  }, [dispatch]);

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
        <Route path='/' element={
         
            <Home />
         
        } />
        <Route path="/movies" element={<Movies/>} />
  <Route path="/tv" element={<TvShows />} />
  <Route path="/favorites" element={<Favorites/> } /> 

        {/* Public Routes */}
        <Route path='/search' element={<Search />} />
        <Route path='/movie/:id' element={<MovieDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;