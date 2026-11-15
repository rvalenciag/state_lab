function formatMoney(value) {
    return `Bs ${value.toLocaleString('es-BO')}`
}

export function ProductCard({ product, onAddItem }) {
    return (
        <article className="product-card">
            <div className="product-media">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{formatMoney(product.price)}</p>
            </div>
            <div className="product-action">
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => onAddItem(product.id)}
                >
                    Agregar
                </button>
            </div>
        </article>
    )
}
