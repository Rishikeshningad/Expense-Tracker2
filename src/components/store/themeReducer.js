import { createSlice } from '@reduxjs/toolkit';

const initialThemeState = { theme: true};

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducers: {
        theme(state){
            state.theme = !state.theme;
        },
    },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;