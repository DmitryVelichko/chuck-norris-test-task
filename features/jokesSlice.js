import { createSlice } from '@reduxjs/toolkit';

const jokesSlice = createSlice({
    name: 'jokes',
    initialState: {
        totalJokes: 0,
    },
    reducers: {
        setTotalJokes: (state, action) => {
            state.totalJokes = action.payload;
        },
    },
});

export const { setTotalJokes } = jokesSlice.actions;

export default jokesSlice.reducer;
