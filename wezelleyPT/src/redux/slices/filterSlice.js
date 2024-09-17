import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedAirline: '',  // Para el filtro de aerolínea
  departureTime: '',    // Para la hora de salida
  arrivalDate: '',      // Para la fecha de llegada
  arrivalTime: '',      // Para la hora de llegada
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedAirline: (state, action) => {
      state.selectedAirline = action.payload;
    },
    setDepartureTime: (state, action) => {
      state.departureTime = action.payload;
    },
    setArrivalDate: (state, action) => {
      state.arrivalDate = action.payload;
    },
    setArrivalTime: (state, action) => {
      state.arrivalTime = action.payload;
    },
  },
});

export const { setSelectedAirline, setDepartureTime, setArrivalDate, setArrivalTime } = filtersSlice.actions;
export default filtersSlice.reducer;
