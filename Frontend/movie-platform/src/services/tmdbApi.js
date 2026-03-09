import axios from "axios";

const API_KEY = "26c38b5f0dbca876bf9d74ccfefd60d8";
const BASE_URL = "https://api.themoviedb.org/3";

export const getTrendingMovie = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.error("API error:", error);
  }
};

export const searchMovies = async (query) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=26c38b5f0dbca876bf9d74ccfefd60d8&query=${query}`
  );

  const data = await res.json();
  return data.results;
};

export const getMovieDetails = async (id) => {

  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=26c38b5f0dbca876bf9d74ccfefd60d8`,
  
  );
  const data = await res.data 
  return data;
};

export const getMovies = async (page = 1) => {
  const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=26c38b5f0dbca876bf9d74ccfefd60d8&page=${page}`);
  return res.json();
};

export const getTVShows = async (page = 1) => {
  const res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=26c38b5f0dbca876bf9d74ccfefd60d8&page=${page}`);
  return res.json();
};