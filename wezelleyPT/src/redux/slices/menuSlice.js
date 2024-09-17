import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dropdownMenu: false,
    dropdownSearch: false,
    userMenu: false,
};

const menuSlice = createSlice({
    name: 'menus',
    initialState,
    reducers: {
        setOpenDropDownMenu: (state) => {
            state.dropdownMenu = !state.dropdownMenu;
        },
        setOpenDropDownSearch: (state) => {
            state.dropdownSearch = !state.dropdownSearch;
        },
        setOpenUserMenu: (state) => {
            state.userMenu = !state.userMenu;
        },
    },
});

export const { setOpenDropDownMenu, setOpenDropDownSearch, setOpenUserMenu } = menuSlice.actions;

export default menuSlice.reducer;