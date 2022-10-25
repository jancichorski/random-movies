import { configureStore } from "@reduxjs/toolkit";
import movieReducer from './movieSlice'
import trialMovieReducer from './movieSlice'

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        trialMovie: trialMovieReducer,
    },
});