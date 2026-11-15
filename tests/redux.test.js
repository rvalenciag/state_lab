import { describe, expect, it } from 'vitest'
import cartReducer, {
    addItem,
    clearCart,
    decrementItem,
    incrementItem,
    removeItem,
} from '../src/state/redux/cartSlice'

describe('carrito de Redux Toolkit', () => {
    it('guarda el carrito y un registro de la acción despachada', () => {
        const afterAdding = cartReducer(undefined, addItem({ productId: 'p3', timestamp: 1000 }))

        expect(afterAdding.items).toEqual({ p3: 1 })
        expect(afterAdding.history).toHaveLength(1)
        expect(afterAdding.history[0].before).toEqual({})
        expect(afterAdding.history[0].after).toEqual({ p3: 1 })
    })

    it('no registra el vaciado cuando el carrito está vacío', () => {
        const afterClear = cartReducer(undefined, clearCart({ timestamp: 1000 }))

        expect(afterClear.history).toEqual([])
    })

    it('procesa las cinco operaciones y conserva capturas independientes', () => {
        let state = cartReducer(undefined, addItem({ productId: 'p1', timestamp: 1 }))
        state = cartReducer(state, incrementItem({ productId: 'p1', timestamp: 2 }))
        state = cartReducer(state, decrementItem({ productId: 'p1', timestamp: 3 }))
        state = cartReducer(state, removeItem({ productId: 'p1', timestamp: 4 }))
        state = cartReducer(state, addItem({ productId: 'p2', timestamp: 5 }))
        state = cartReducer(state, clearCart({ timestamp: 6 }))
        const afterInvalidAction = cartReducer(
            state,
            incrementItem({ productId: 'p1', timestamp: 7 }),
        )

        expect(state.items).toEqual({})
        expect(state.history).toHaveLength(6)
        expect(state.history.at(-1).after).toEqual({ p1: 1 })
        expect(afterInvalidAction.history).toHaveLength(6)
    })
})
