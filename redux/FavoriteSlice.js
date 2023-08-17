import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    favoriteMovies: [],
}
export const FavoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToFavorite: (state, action) => {
            if (!state.favoriteMovies.find(item => item.id === action.payload.id)) {
                state.favoriteMovies.push({
                    ...action.payload,
                })
            }
        },
        removeFromFavorite: (state, action) => {
            const removeItem = state.favoriteMovies.filter((item) => item.id !== action.payload.id);
            state.favoriteMovies = removeItem;
        },
    },
});

export const FavoriteReducer = FavoriteSlice.reducer;
export const { addToFavorite, removeFromFavorite } = FavoriteSlice.actions;