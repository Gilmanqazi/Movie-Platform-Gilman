import axios from "axios";

// Backend ka base URL (Check kar lena 5000 hai ya kuch aur)
const API = axios.create({
  baseURL: "http://localhost:5000/api/favorites", 
  withCredentials: true, // Cookies/JWT bhejne ke liye zaroori hai
});

export const addMovieToFav = async (movie) => {
  const response = await API.post("/add", { movie });
  return response.data;
};

export const removeMovieFromFav = async (movieId) => {
  const response = await API.delete("/remove", { data: { movieId } });
  return response.data;
};

export const getMyFavorites = async () => {
  const response = await API.get("/");
  return response.data;
};