import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FavoriteReducer } from "./FavoriteSlice";
import { WatchListReducer } from "./WatchListSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
};


const rootReducer = combineReducers({
    favorite: FavoriteReducer,
    watchList: WatchListReducer,
})



const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({reducer: persistedReducer });

export const persister = persistStore(store);