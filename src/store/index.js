import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './slice/AuthSlice';
import networkSlice from './slice/networkSlice';

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        network:networkSlice
    },
})


export default store;