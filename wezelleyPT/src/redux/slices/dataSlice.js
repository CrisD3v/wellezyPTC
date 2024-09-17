import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    flights: [],
    airlines: [],
    loadingData: 0,
};

const datas = createSlice({
    name: 'datas',
    initialState,
    reducers: {
        setFlights: (state, action) => {
            state.flights = action.payload;
        },
        setAirlines: (state, action) => {
            state.airlines = action.payload;
        },
        setLoadData: (state, action) => {
            state.loadingData = action.payload;
        },
    },
});

export const { setFlights , setLoadData, setAirlines} = datas.actions;

export default datas.reducer;
