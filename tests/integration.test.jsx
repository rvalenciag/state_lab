import { Provider } from 'react-redux'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../src/App'
import { CartProvider } from '../src/state/context/CartProvider'
import { reduxStore } from '../src/state/redux/store'
import { useZustandCartStore } from '../src/state/zustand/useCartStore'

function renderApplication() {
    return render(
        <Provider store={reduxStore}>
            <CartProvider>
                <App />
            </CartProvider>
        </Provider>,
    )
}

describe('independencia entre tecnologías', () => {
    beforeEach(() => {
        useZustandCartStore.setState({ items: {}, history: [], nextEventId: 1 })
        reduxStore.dispatch({ type: 'cart/reset' })
    })

    it('conserva el carrito propio al alternar entre modos', async () => {
        const user = userEvent.setup()
        renderApplication()

        await user.click(screen.getAllByRole('button', { name: 'Agregar' })[0])
        await user.click(screen.getByRole('button', { name: 'Zustand' }))
        await user.click(screen.getAllByRole('button', { name: 'Agregar' })[1])
        await user.click(screen.getByRole('button', { name: 'Redux Toolkit' }))
        await user.click(screen.getAllByRole('button', { name: 'Agregar' })[2])

        const cart = () =>
            within(screen.getByRole('heading', { name: 'Carrito de compras' }).closest('aside'))
        const cartTotal = () => cart().getByText('Total').parentElement.lastElementChild

        await user.click(screen.getByRole('button', { name: 'Context API' }))
        expect(cartTotal()).toHaveTextContent('Bs 450')
        await user.click(screen.getByRole('button', { name: 'Zustand' }))
        expect(cartTotal()).toHaveTextContent('Bs 180')
        await user.click(screen.getByRole('button', { name: 'Redux Toolkit' }))
        expect(cartTotal()).toHaveTextContent('Bs 320')
    })
})
