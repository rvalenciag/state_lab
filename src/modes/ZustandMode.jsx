import { LabWorkspace } from './LabWorkspace'
import { useZustandCartStore } from '../state/zustand/useCartStore'

export function ZustandMode() {
    const items = useZustandCartStore((state) => state.items)
    const history = useZustandCartStore((state) => state.history)
    const addItem = useZustandCartStore((state) => state.addItem)
    const incrementItem = useZustandCartStore((state) => state.incrementItem)
    const decrementItem = useZustandCartStore((state) => state.decrementItem)
    const removeItem = useZustandCartStore((state) => state.removeItem)
    const clearCart = useZustandCartStore((state) => state.clearCart)

    const cart = {
        items,
        history,
        addItem,
        incrementItem,
        decrementItem,
        removeItem,
        clearCart,
    }

    return <LabWorkspace technology="zustand" technologyName="Zustand" cart={cart} />
}
