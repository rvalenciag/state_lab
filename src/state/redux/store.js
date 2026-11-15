import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'

export const reduxStore = configureStore({
    reducer: {
        cart: cartReducer,
    },
})
