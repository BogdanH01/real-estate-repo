import { createSlice } from '@reduxjs/toolkit'

const oglasiSlice = createSlice({
    name: 'oglasi',
    initialState: { oglasi: []},
    reducers:{
        dodajOglas(state, action){
            const noviOglas = action.payload;
            state.oglasi.push(noviOglas);
        },
        obrisiOglas(state, action){
            const id = action.payload;
            state.oglasi.filter(item => item.id !== id);
        }, ucitajOglase(state, action) {
            const ucitaniOglasi = action.payload;
            state.oglasi = ucitaniOglasi;
        }        
    }
});

export default oglasiSlice;

export const oglasiActions = oglasiSlice.actions;