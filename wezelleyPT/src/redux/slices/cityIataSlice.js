import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    city: '',
    iata: '',
};

const cityIata = createSlice({
    name: 'cityIata',
    initialState,
    reducers: {
        setCity: (state,action) => {
            state.city = action.payload ;
        },
        setIata: (state,action) => {
            state.iata = action.payload ;
        },
    },
});

export const { setCity, setIata } = cityIata.actions;

export default cityIata.reducer;
