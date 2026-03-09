import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Function to load state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load state from localStorage", e);
    return undefined;
  }
};

// Function to save state to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState);
  } catch (e) {
    console.warn("Could not save state to localStorage", e);
  }
};

// Preload state from localStorage
const preloadedState = {
  auth: loadFromLocalStorage(),
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveToLocalStorage(store.getState().auth);
});