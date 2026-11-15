export const HISTORY_LIMIT = 30

export function copyItems(items) {
    return { ...items }
}

export function createCartEvent({ id, type, productId, before, after, timestamp }) {
    return {
        id,
        type,
        productId,
        before: copyItems(before),
        after: copyItems(after),
        timestamp,
    }
}

export function addEvent(history, event) {
    return [event, ...history].slice(0, HISTORY_LIMIT)
}
