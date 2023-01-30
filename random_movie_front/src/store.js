import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import  movieReducer  from "./movieSlice";


export const store = configureStore({
    reducer: {
        movies: movieReducer,    
    },
    
})

setupListeners(store.dispatch)