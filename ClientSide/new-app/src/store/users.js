import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
    name: "users",
    initialState: {users: []},
    reducers:{
        storeUsers(state, actions){
            const data = actions.payload;
            state.users = data;
        },
        checkUser(state, actions) {
            const inputUser = actions.payload;
            const existingUser = state.users.find(user => user.username === inputUser.username);
            if(existingUser === undefined){
                return false;
            }
            return true;
            
        }
    }
})

export default usersSlice;

export const usersActions = usersSlice.actions;