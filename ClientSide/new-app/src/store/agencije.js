import { createSlice } from "@reduxjs/toolkit";

const agencijeSlice = createSlice({
    name: 'agencije',
    initialState: {agencije: []},
    reducers:{
        ucitajAgencije(state, action){
            state.agencije = action.payload;
        }
    }
});

export default agencijeSlice;

export const agencijeActions = agencijeSlice.actions;