export function getUnits(items) {
    return Object.values(items).reduce((total, quantity) => total + quantity, 0)
}

export function getDistinctProducts(items) {
    return Object.keys(items).length
}

export function getTotal(items, productsById) {
    return Object.entries(items).reduce((total, [productId, quantity]) => {
        return total + productsById[productId].price * quantity
    }, 0)
}

export function getCartProducts(items, productsById) {
    return Object.entries(items).map(([productId, quantity]) => {
        const product = productsById[productId]

        return {
            ...product,
            quantity,
            subtotal: product.price * quantity,
        }
    })
}
