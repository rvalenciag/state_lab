import { useEffect, useRef, useState } from 'react'
import { ProductCatalog } from '../components/catalog/ProductCatalog'
import { CartPanel } from '../components/cart/CartPanel'
import { StateInspector } from '../components/inspector/StateInspector'

export function LabWorkspace({ technology, technologyName, cart }) {
    const catalogRef = useRef(null)
    const [catalogHeight, setCatalogHeight] = useState()

    useEffect(() => {
        const catalog = catalogRef.current
        if (!catalog) return undefined

        function updateCatalogHeight() {
            setCatalogHeight(catalog.getBoundingClientRect().height)
        }

        const observer = new ResizeObserver(updateCatalogHeight)
        observer.observe(catalog)
        updateCatalogHeight()

        return () => observer.disconnect()
    }, [])

    return (
        <>
            <section className="section lab" aria-label="Laboratorio interactivo">
                <ProductCatalog ref={catalogRef} onAddItem={cart.addItem} />
                <CartPanel
                    items={cart.items}
                    onIncrement={cart.incrementItem}
                    onDecrement={cart.decrementItem}
                    onRemove={cart.removeItem}
                    onClear={cart.clearCart}
                    maxHeight={catalogHeight ? `${catalogHeight}px` : undefined}
                />
            </section>
            <StateInspector
                technology={technology}
                technologyName={technologyName}
                items={cart.items}
                history={cart.history}
            />
        </>
    )
}
