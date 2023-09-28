import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userTokenData: null
}


const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setUserTokenData(state, action) {
            state.userTokenData = action.payload;
        },
        removeUserTokenData(state) {
            state.userTokenData = null
        }
    }
})


export const { setUserTokenData, removeUserTokenData } = AuthSlice.actions;
export default AuthSlice.reducer;