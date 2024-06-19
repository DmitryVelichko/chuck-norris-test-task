import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
        jokes: [],
        totalCount: 0,
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        setJokes: (state, action) => {
            state.jokes = action.payload;
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
        },
    },
});

export const { setQuery, setJokes, setTotalCount } = searchSlice.actions;
export default searchSlice.reducer;
