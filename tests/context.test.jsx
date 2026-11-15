import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CartProvider } from '../src/state/context/CartProvider'
import { useContextCart } from '../src/state/context/useContextCart'
import { productsById } from '../src/data/products'
import { getTotal } from '../src/domain/cartSelectors'

function ContextConsumer() {
    const cart = useContextCart()

    return (
        <>
            <output>unidades: {cart.items.p1 ?? 0}</output>
            <output>historial: {cart.history.length}</output>
            <output>total: {getTotal(cart.items, productsById)}</output>
            <button onClick={() => cart.addItem('p1')}>Agregar teclado</button>
            <button onClick={() => cart.incrementItem('ausente')}>Operación inválida</button>
        </>
    )
}

describe('CartProvider de Context API', () => {
    it('actualiza a sus consumidores y no registra operaciones inválidas', async () => {
        const user = userEvent.setup()

        render(
            <CartProvider>
                <ContextConsumer />
            </CartProvider>,
        )

        expect(screen.getByText('unidades: 0')).toBeInTheDocument()
        await user.click(screen.getByRole('button', { name: 'Agregar teclado' }))

        expect(screen.getByText('unidades: 1')).toBeInTheDocument()
        expect(screen.getByText('historial: 1')).toBeInTheDocument()
        expect(screen.getByText('total: 450')).toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: 'Operación inválida' }))
        expect(screen.getByText('historial: 1')).toBeInTheDocument()
    })
})
