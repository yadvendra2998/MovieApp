
import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    WatchListItems: [],
};
export const WatchListSlice = createSlice({
    name: 'watchList',
    initialState,
    reducers: {
        addToWatchList: (state, action) => {
            if (!state.WatchListItems.find(item => item.id === action.payload.id)) {
                state.WatchListItems.push({
                    ...action.payload,
                })
            }
        },
        removeItem: (state, action) => {
            const removeItem = state.WatchListItems.filter((item) => item.id !== action.payload.id);
            state.WatchListItems = removeItem;
        },
    },
});

export const WatchListReducer = WatchListSlice.reducer;
export const { addToWatchList, removeItem } = WatchListSlice.actions;