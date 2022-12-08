import {configureStore} from '@reduxjs/toolkit';
import favoriteReducer from '../features/favorite/favoriteSlice';

export const store = configureStore({
    reducer: {
        favorite: favoriteReducer
    }
})