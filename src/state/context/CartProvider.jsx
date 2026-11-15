import { useState } from 'react'
import { operationTypes } from '../../domain/cartLogic'
import { initialCartState, updateCartState } from '../cartState'
import { CartContext } from './CartContext'

export function CartProvider({ children }) {
    const [cartState, setCartState] = useState(initialCartState)

    function runOperation(type, productId) {
        const timestamp = Date.now()

        setCartState((previousState) => {
            return updateCartState(previousState, type, productId, timestamp)
        })
    }

    const value = {
        ...cartState,
        addItem: (productId) => runOperation(operationTypes.add, productId),
        incrementItem: (productId) => runOperation(operationTypes.increment, productId),
        decrementItem: (productId) => runOperation(operationTypes.decrement, productId),
        removeItem: (productId) => runOperation(operationTypes.remove, productId),
        clearCart: () => runOperation(operationTypes.clear),
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
