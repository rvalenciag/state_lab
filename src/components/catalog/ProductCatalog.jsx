import { forwardRef } from 'react'
import { products } from '../../data/products'
import { ProductCard } from './ProductCard'

export const ProductCatalog = forwardRef(function ProductCatalog({ onAddItem }, ref) {
    return (
        <section className="card catalog" aria-labelledby="catalog-title" ref={ref}>
            <div className="card-head">
                <div>
                    <span className="eyebrow">02 · Interacción</span>
                    <h2 id="catalog-title" className="section-title">
                        Catálogo de productos
                    </h2>
                    <p className="section-desc">
                        Agrega productos al carrito y observa cómo se actualiza el estado.
                    </p>
                </div>
                <span className="pill">8 productos</span>
            </div>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} onAddItem={onAddItem} />
                ))}
            </div>
        </section>
    )
})
