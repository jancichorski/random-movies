import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: 0
    },
    reducers: {
        movies: (state) => {
            state.movies += 1
        }
    }
})

export const trialMovieSlice = createSlice({
    name: 'trialMovie',
    initialState: {
        title: "Trial Title",
        overView: "This movie is cool hueheue",
        rating: "This movie is cool",
        imgPath: null,
        releaseDate: "21.37.2137"
    },
    reducers: {
        trialMovie: (state) => {
            state.overView = "This movie sucks balls"
        }
    }
})

export const { movies, trialMovie } = movieSlice.actions

export default trialMovieSlice.reducer