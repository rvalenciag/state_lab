import { useContext } from 'react'
import { CartContext } from './CartContext'

export function useContextCart() {
    const cart = useContext(CartContext)

    if (!cart) {
        throw new Error('useContextCart debe utilizarse dentro de CartProvider.')
    }

    return cart
}
