import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import menuSlice from './slices/menuSlice';
import passengerCounterSlice from './slices/passengerCounterSlice';
import cityIata from './slices/cityIataSlice';
import { wellezyApi } from './services/ApiServices';
import dataSlice from './slices/dataSlice';
import filterSlice from './slices/filterSlice';
import authSlice from './slices/authSlice';

const rootReducer = combineReducers({
    menu: menuSlice,
    counter: passengerCounterSlice,
    cityIata: cityIata,
    datas: dataSlice,
    filters: filterSlice,
    auth: authSlice,
    [wellezyApi.reducerPath]: wellezyApi.reducer, // Añadir el reducer de RTK Query
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wellezyApi.middleware), // Añadir el middleware de RTK Query
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
