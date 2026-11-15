import { describe, expect, it } from 'vitest'
import cartReducer, { addItem, clearCart } from '../src/state/redux/cartSlice'

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
})
