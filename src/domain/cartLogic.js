export const operationTypes = {
    add: 'add',
    increment: 'increment',
    decrement: 'decrement',
    remove: 'remove',
    clear: 'clear',
}

function hasItem(items, productId) {
    return Object.hasOwn(items, productId)
}

export function addItem(items, productId, productsById) {
    if (!productsById[productId]) return null

    return {
        ...items,
        [productId]: (items[productId] ?? 0) + 1,
    }
}

export function incrementItem(items, productId) {
    if (!hasItem(items, productId)) return null

    return {
        ...items,
        [productId]: items[productId] + 1,
    }
}

export function decrementItem(items, productId) {
    if (!hasItem(items, productId)) return null

    if (items[productId] === 1) {
        return removeItem(items, productId)
    }

    return {
        ...items,
        [productId]: items[productId] - 1,
    }
}

export function removeItem(items, productId) {
    if (!hasItem(items, productId)) return null

    const nextItems = { ...items }
    delete nextItems[productId]
    return nextItems
}

export function clearCart(items) {
    if (Object.keys(items).length === 0) return null
    return {}
}

export function runCartOperation(items, type, productId, productsById) {
    const operations = {
        [operationTypes.add]: () => addItem(items, productId, productsById),
        [operationTypes.increment]: () => incrementItem(items, productId),
        [operationTypes.decrement]: () => decrementItem(items, productId),
        [operationTypes.remove]: () => removeItem(items, productId),
        [operationTypes.clear]: () => clearCart(items),
    }

    return operations[type]?.() ?? null
}
