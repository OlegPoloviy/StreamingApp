import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/user.slice.jsx'

export const store = configureStore({
    reducer: userReducer,
    devTools: true
})