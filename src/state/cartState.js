import { productsById } from '../data/products'
import { addEvent, createCartEvent } from '../domain/cartEvents'
import { runCartOperation } from '../domain/cartLogic'

export const initialCartState = {
    items: {},
    history: [],
    nextEventId: 1,
}

export function updateCartState(state, type, productId, timestamp) {
    const nextItems = runCartOperation(state.items, type, productId, productsById)

    if (!nextItems) return state

    const event = createCartEvent({
        id: state.nextEventId,
        type,
        productId,
        before: state.items,
        after: nextItems,
        timestamp,
    })

    return {
        items: nextItems,
        history: addEvent(state.history, event),
        nextEventId: state.nextEventId + 1,
    }
}
