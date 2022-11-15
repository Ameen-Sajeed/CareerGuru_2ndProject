import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Features/Auth/authSlice'
export default configureStore({
    reducer: {
    user: userReducer
    },
})