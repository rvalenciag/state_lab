import { describe, expect, it } from 'vitest'
import { productsById } from '../src/data/products'
import {
    addItem,
    clearCart,
    decrementItem,
    incrementItem,
    removeItem,
} from '../src/domain/cartLogic'
import { getTotal, getUnits } from '../src/domain/cartSelectors'

describe('reglas del carrito', () => {
    it('agrega un producto y aumenta su cantidad si ya existe', () => {
        const firstCart = addItem({}, 'p1', productsById)
        const secondCart = addItem(firstCart, 'p1', productsById)

        expect(secondCart).toEqual({ p1: 2 })
    })

    it('no agrega productos que no pertenecen al catálogo', () => {
        expect(addItem({}, 'no-existe', productsById)).toBeNull()
    })

    it('incrementa, disminuye y elimina al llegar a cero', () => {
        const initialCart = { p1: 2 }
        const incrementedCart = incrementItem(initialCart, 'p1')
        const decrementedCart = decrementItem(incrementedCart, 'p1')
        const emptyCart = decrementItem({ p1: 1 }, 'p1')

        expect(decrementedCart).toEqual({ p1: 2 })
        expect(emptyCart).toEqual({})
    })

    it('elimina un producto y vacía el carrito', () => {
        const cart = { p1: 2, p2: 1 }

        expect(removeItem(cart, 'p1')).toEqual({ p2: 1 })
        expect(clearCart(cart)).toEqual({})
        expect(clearCart({})).toBeNull()
    })

    it('calcula unidades y total desde los datos guardados', () => {
        const cart = { p1: 1, p2: 1 }

        expect(getUnits(cart)).toBe(2)
        expect(getTotal(cart, productsById)).toBe(630)
    })
})
