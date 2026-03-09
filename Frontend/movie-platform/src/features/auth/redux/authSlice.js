import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, logOutUser, getMe } from "../services/auth.api";
import { addMovieToFav, removeMovieFromFav } from "../services/fav.api";

const initialState = {
  user: null,
  loading: false,
  error: null,
};



// --- Thunks ---

export const toggleFavorite = createAsyncThunk(
  "auth/toggleFavorite",
  async (movie, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      // Check karo ki movie pehle se fav hai ya nahi
      const isFav = user.favorites.some((fav) => fav.id === movie.id);

      if (isFav) {
        // Agar hai toh remove wali service call karo
        const response = await removeMovieFromFav(movie.id);
        return response.favorites;
      } else {
        // Nahi hai toh add wali service call karo
        const response = await addMovieToFav(movie);
        return response.favorites;
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

// ... baaki thunks (register, login, fetchUser, logout) wahi rahenge jo aapne likhe hain

export const register = createAsyncThunk("auth/register", async (data) => {
  const response = await registerUser(data);
  return response;
});

export const login = createAsyncThunk("auth/login", async (data) => {
  const response = await loginUser(data);
  return response; 
});

export const fetchUser = createAsyncThunk("auth/me", async () => {
  return await getMe();
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await logOutUser();
});

// --- Slice ---

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- Login & Register Pending (Loading start) ---
      .addCase(login.pending, (state) => { state.loading = true; })
      .addCase(register.pending, (state) => { state.loading = true; })
      .addCase(fetchUser.pending, (state) => { state.loading = true; })

      // --- Success Cases ---
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload?.user || action.payload;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload?.user || action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload?.user || action.payload;
        state.loading = false; // Refresh fix ke liye zaroori hai
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
      })

      // --- Favorites Logic ---
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        if (state.user) {
          state.user.favorites = action.payload; // Backend se naya array aate hi update!
        }
      })

      // --- Error Handling (Optional but Recommended) ---
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;