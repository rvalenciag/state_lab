import { create } from 'zustand'
import { operationTypes } from '../../domain/cartLogic'
import { initialCartState, updateCartState } from '../cartState'

function runOperation(set, type, productId) {
    const timestamp = Date.now()

    set((state) => updateCartState(state, type, productId, timestamp))
}

export const useZustandCartStore = create((set) => ({
    ...initialCartState,
    addItem: (productId) => runOperation(set, operationTypes.add, productId),
    incrementItem: (productId) => runOperation(set, operationTypes.increment, productId),
    decrementItem: (productId) => runOperation(set, operationTypes.decrement, productId),
    removeItem: (productId) => runOperation(set, operationTypes.remove, productId),
    clearCart: () => runOperation(set, operationTypes.clear),
}))
