import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    adults: 1,
    kids: 0,
};

const passengerCounters = createSlice({
    name: 'counters',
    initialState,
    reducers: {
        setAddCountAdults: (state) => {
            state.adults++;
        },
        setRemoveCountAdults: (state) => {
            if (state.adults > 0) {
                state.adults--;
            }
        },
        setAddCountKids: (state) => {
            state.kids++;
        },
        setRemoveCountKids: (state) => {
            if (state.kids > 0) {
                state.kids--;
            }
        },
        resetCounterPassengers: (state, action) => {
            state.adults = 1;
            state.kids = 0;
        },
    },
});

export const { setAddCountAdults, setRemoveCountAdults, setAddCountKids, setRemoveCountKids, resetCounterPassengers } = passengerCounters.actions;

export default passengerCounters.reducer;
