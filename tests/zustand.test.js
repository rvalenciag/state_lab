import { beforeEach, describe, expect, it } from 'vitest'
import { useZustandCartStore } from '../src/state/zustand/useCartStore'

describe('carrito de Zustand', () => {
    beforeEach(() => {
        useZustandCartStore.setState({
            items: {},
            history: [],
            nextEventId: 1,
        })
    })

    it('actualiza el store y guarda el historial', () => {
        useZustandCartStore.getState().addItem('p2')

        const state = useZustandCartStore.getState()

        expect(state.items).toEqual({ p2: 1 })
        expect(state.history).toHaveLength(1)
        expect(state.history[0].type).toBe('add')
    })

    it('mantiene operaciones, capturas e ignora una acción inválida', () => {
        const actions = useZustandCartStore.getState()

        actions.addItem('p1')
        actions.addItem('p1')
        actions.addItem('p2')
        actions.decrementItem('p1')
        actions.removeItem('p2')
        actions.incrementItem('ausente')

        const state = useZustandCartStore.getState()

        expect(state.items).toEqual({ p1: 1 })
        expect(state.history).toHaveLength(5)
        expect(state.history.at(-1).before).toEqual({})
        expect(state.history.at(-1).after).toEqual({ p1: 1 })
    })

    it('vacía el carrito, pero no registra un segundo vaciado inválido', () => {
        const actions = useZustandCartStore.getState()
        actions.addItem('p3')
        actions.clearCart()
        actions.clearCart()

        const state = useZustandCartStore.getState()

        expect(state.items).toEqual({})
        expect(state.history).toHaveLength(2)
        expect(state.history[0].type).toBe('clear')
    })
})
