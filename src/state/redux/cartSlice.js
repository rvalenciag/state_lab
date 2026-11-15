import { createSlice } from '@reduxjs/toolkit'
import { initialCartState, updateCartState } from '../cartState'

function changeCart(state, action, type) {
    return updateCartState(state, type, action.payload?.productId, action.payload.timestamp)
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItem: (state, action) => changeCart(state, action, 'add'),
        incrementItem: (state, action) => changeCart(state, action, 'increment'),
        decrementItem: (state, action) => changeCart(state, action, 'decrement'),
        removeItem: (state, action) => changeCart(state, action, 'remove'),
        clearCart: (state, action) => changeCart(state, action, 'clear'),
    },
})

export const { addItem, incrementItem, decrementItem, removeItem, clearCart } = cartSlice.actions
export const selectReduxItems = (state) => state.cart.items
export const selectReduxHistory = (state) => state.cart.history
export default cartSlice.reducer
