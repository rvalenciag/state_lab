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
})
