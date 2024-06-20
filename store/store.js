import { configureStore } from '@reduxjs/toolkit';
import jokesReducer from '../features/jokesSlice';

export const store = configureStore({
    reducer: {
        jokes: jokesReducer,
    },
});
