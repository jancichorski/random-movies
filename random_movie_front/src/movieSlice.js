import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



const hostUrl = "http://127.0.0.1/trending_movies";

const initialState = { 
    movies: [],
    body: {
        'media_type': 'all',
        'time_window': 'week',
        'page': 1
    }
}

export const getMovies = createAsyncThunk('movies/getMovies', async (fetchData) => {
    try {
        const response = await fetch(hostUrl, {
            method: 'POST',
            mode: "cors",
            body: JSON.stringify(fetchData),
        })
        return response.json()
    }
    catch (err) {
        console.warn(err.message)
        return err.message
    }
})

export const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        getBody: (state, action) => {
            state.body = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getMovies.pending, (state, action) => {

            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.movies = action.payload.results
            })
            .addCase(getMovies.rejected, (state, action) => {
                console.warn(state.error.message);
            })
    }
})

export const selectMovies = (state) => state.movies.movies; 

export const { getBody } = movieSlice.actions

export default movieSlice.reducer