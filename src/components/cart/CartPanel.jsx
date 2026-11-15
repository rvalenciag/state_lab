import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { productsById } from '../../data/products'
import { getCartProducts, getTotal, getUnits } from '../../domain/cartSelectors'

function formatMoney(value) {
    return `Bs ${value.toLocaleString('es-BO')}`
}

function CartItem({ item, onIncrement, onDecrement, onRemove }) {
    return (
        <li className="cart-item">
            <div className="cart-thumb">
                <img src={item.image} alt="" />
            </div>
            <div className="cart-info">
                <p className="cart-name">{item.name}</p>
                <p className="cart-unit">{formatMoney(item.price)} c/u</p>
            </div>
            <button
                className="icon-btn"
                type="button"
                aria-label={`Eliminar ${item.name}`}
                title="Eliminar"
                onClick={() => onRemove(item.id)}
            >
                <Trash2 />
            </button>
            <div className="cart-qty-row">
                <div className="qty">
                    <button
                        className="qty-btn"
                        type="button"
                        aria-label={`Disminuir cantidad de ${item.name}`}
                        onClick={() => onDecrement(item.id)}
                    >
                        <Minus />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                        className="qty-btn"
                        type="button"
                        aria-label={`Aumentar cantidad de ${item.name}`}
                        onClick={() => onIncrement(item.id)}
                    >
                        <Plus />
                    </button>
                </div>
                <span className="cart-subtotal">{formatMoney(item.subtotal)}</span>
            </div>
        </li>
    )
}

export function CartPanel({ items, onIncrement, onDecrement, onRemove, onClear, maxHeight }) {
    const cartProducts = getCartProducts(items, productsById)
    const units = getUnits(items)
    const total = getTotal(items, productsById)

    return (
        <aside className="card cart" aria-labelledby="cart-title" style={{ maxHeight }}>
            <div className="card-head card-head--compact">
                <div>
                    <h2 id="cart-title" className="card-title-lg">
                        Carrito de compras
                    </h2>
                    <p className="section-desc">Productos seleccionados</p>
                </div>
                <span className="pill">
                    {units} {units === 1 ? 'unidad' : 'unidades'}
                </span>
            </div>

            <div className="cart-body">
                {cartProducts.length === 0 ? (
                    <div className="cart-empty">
                        <ShoppingCart />
                        <span>Tu carrito está vacío</span>
                    </div>
                ) : (
                    <ul className="cart-list">
                        {cartProducts.map((item) => (
                            <CartItem
                                item={item}
                                key={item.id}
                                onIncrement={onIncrement}
                                onDecrement={onDecrement}
                                onRemove={onRemove}
                            />
                        ))}
                    </ul>
                )}
            </div>

            <div className="cart-summary">
                <div className="summary-row">
                    <span>Unidades</span>
                    <span>{units}</span>
                </div>
                <div className="summary-row summary-total">
                    <span>Total</span>
                    <span>{formatMoney(total)}</span>
                </div>
                <button
                    className="btn btn-secondary btn-block"
                    type="button"
                    disabled={cartProducts.length === 0}
                    onClick={onClear}
                >
                    Vaciar carrito
                </button>
            </div>
        </aside>
    )
}
