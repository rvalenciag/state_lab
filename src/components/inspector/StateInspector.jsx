import { Clipboard, Copy, ShoppingCart } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { productsById } from '../../data/products'
import { getTotal, getUnits } from '../../domain/cartSelectors'

const operationInfo = {
    add: { label: 'Agregar', tag: 'Aumento', color: 'add', button: 'Agregar' },
    increment: { label: 'Aumentar cantidad de', tag: 'Aumento', color: 'add', button: '+' },
    decrement: { label: 'Disminuir cantidad de', tag: 'Disminución', color: 'mod', button: '−' },
    remove: { label: 'Eliminar', tag: 'Eliminación', color: 'del', button: 'Eliminar' },
    clear: { label: 'Vaciar carrito', tag: 'Vaciado', color: 'del', button: 'Vaciar carrito' },
}

const flowByTechnology = {
    context: [
        ['Usuario', 'Presiona el botón en la interfaz.'],
        ['Función del contexto', 'Se ejecuta una función expuesta por CartProvider.'],
        ['Estado de React', 'La función actualiza useState con el carrito nuevo.'],
        ['Provider y consumidores', 'El Provider suministra el valor actualizado.'],
        ['Interfaz', 'Los componentes consumidores muestran el cambio.'],
    ],
    zustand: [
        ['Usuario', 'Presiona el botón en la interfaz.'],
        ['Acción del store', 'Se ejecuta una acción definida en useZustandCartStore.'],
        ['Zustand', 'La acción actualiza el store mediante set().'],
        ['Suscriptores', 'Los componentes con datos modificados reciben el cambio.'],
        ['Interfaz', 'Carrito e inspector muestran el estado nuevo.'],
    ],
    redux: [
        ['Usuario', 'Presiona el botón en la interfaz.'],
        ['dispatch()', 'El componente despacha una acción al store.'],
        ['Reducer', 'El reducer del slice calcula el estado siguiente.'],
        ['Store Redux', 'Redux guarda el resultado y notifica a suscriptores.'],
        ['Interfaz', 'Los selectores reciben el estado actualizado.'],
    ],
}

function formatMoney(value) {
    return `Bs ${value.toLocaleString('es-BO')}`
}

function getEventLabel(event) {
    const info = operationInfo[event.type]
    if (event.type === 'clear') return info.label
    return `${info.label} ${productsById[event.productId]?.name ?? ''}`
}

function eventDescription(event) {
    if (event.type === 'clear') {
        return `${Object.keys(event.before).length} productos · ${getUnits(event.before)} unidades`
    }

    const beforeQuantity = event.before[event.productId] ?? 0
    const afterQuantity = event.after[event.productId] ?? 0

    if (event.type === 'remove') return `Retirado del carrito (${beforeQuantity} u.)`
    return `Cantidad ${beforeQuantity} → ${afterQuantity}`
}

function timeAgo(timestamp) {
    const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000))
    if (seconds < 60) return `Hace ${seconds} s`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `Hace ${minutes} min`
    return `Hace ${Math.floor(minutes / 60)} h`
}

function OperationHistory({ history, selectedId, onSelect }) {
    if (history.length === 0) {
        return <p className="empty-note">Aún no se registraron operaciones.</p>
    }

    return (
        <ol className="history-list">
            {history.map((event) => {
                const info = operationInfo[event.type]
                const selected = event.id === selectedId

                return (
                    <li key={event.id}>
                        <button
                            className={`history-item ${selected ? 'is-selected' : ''}`}
                            type="button"
                            onClick={() => onSelect(event.id)}
                        >
                            <span className={`history-dot dot-${info.color}`} />
                            <span>
                                <span className="history-label">{getEventLabel(event)}</span>
                                <span className="history-desc">{eventDescription(event)}</span>
                            </span>
                            <span
                                className="history-time"
                                title={new Date(event.timestamp).toLocaleTimeString('es-BO')}
                            >
                                {timeAgo(event.timestamp)}
                            </span>
                        </button>
                    </li>
                )
            })}
        </ol>
    )
}

function StateBox({ title, items, productId, changed, isAfter }) {
    const quantity = items[productId] ?? 0
    const product = productsById[productId]
    const hasProduct = quantity > 0

    return (
        <div className="state-box">
            <p className="state-box-title">{title}</p>
            {!hasProduct && isAfter ? (
                <div className="state-absent">Ausente del carrito</div>
            ) : (
                <>
                    <div className={`state-row ${changed ? 'chg-add' : ''}`}>
                        <span>Cantidad</span>
                        <span>{quantity}</span>
                    </div>
                    <div className={`state-row ${changed ? 'chg-add' : ''}`}>
                        <span>Subtotal</span>
                        <span>{formatMoney(quantity * product.price)}</span>
                    </div>
                </>
            )}
            <div className={`state-row ${changed ? 'chg-add' : ''}`}>
                <span>Total del carrito</span>
                <span>{formatMoney(getTotal(items, productsById))}</span>
            </div>
        </div>
    )
}

function ChangeDetails({ event }) {
    if (!event) {
        return (
            <div className="empty-note change-empty">
                <ShoppingCart />
                Agrega un producto al carrito para observar cómo cambia el estado.
            </div>
        )
    }

    if (event.type === 'clear') {
        return <ClearChangeDetails event={event} />
    }

    const product = productsById[event.productId]
    const info = operationInfo[event.type]

    return (
        <>
            <div className="change-subject">
                <div className="cart-thumb">
                    <img src={product.image} alt="" />
                </div>
                <div>
                    <p className="change-kicker">{getEventLabel(event)}</p>
                    <p className="change-name">{product.name}</p>
                    <p className="change-prop">
                        Propiedad modificada: <strong>{`items["${product.id}"]`}</strong>
                    </p>
                </div>
                <span className={`op-tag op-${info.color}`}>{info.tag}</span>
            </div>
            <div className="compare">
                <StateBox title="Estado anterior" items={event.before} productId={product.id} />
                <span className="compare-arrow">→</span>
                <StateBox
                    title="Estado nuevo"
                    items={event.after}
                    productId={product.id}
                    changed
                    isAfter
                />
            </div>
            <div className="change-foot">
                Ruta del dato: <code className="code-tag">{`items["${product.id}"]`}</code>
            </div>
        </>
    )
}

function ClearChangeDetails({ event }) {
    return (
        <>
            <div className="change-subject">
                <div>
                    <p className="change-kicker">Vaciar carrito</p>
                    <p className="change-name">Carrito completo</p>
                    <p className="change-prop">
                        Propiedad modificada: <strong>items (todos los elementos)</strong>
                    </p>
                </div>
                <span className="op-tag op-del">Vaciado</span>
            </div>
            <div className="clear-metrics">
                <div className="metric">
                    <p className="metric-label">Productos eliminados</p>
                    <p className="metric-value">{Object.keys(event.before).length}</p>
                </div>
                <div className="metric">
                    <p className="metric-label">Unidades eliminadas</p>
                    <p className="metric-value">{getUnits(event.before)}</p>
                </div>
                <div className="metric">
                    <p className="metric-label">Total del carrito</p>
                    <p className="metric-value">
                        <span className="from">
                            {formatMoney(getTotal(event.before, productsById))}
                        </span>
                        <span className="to">Bs 0</span>
                    </p>
                </div>
            </div>
            <div className="change-foot">
                Ruta del dato: <code className="code-tag">items</code> →{' '}
                <code className="code-tag">{'{}'}</code>
            </div>
        </>
    )
}

function JsonViewer({ items, event, latestEventId }) {
    const [copyStatus, setCopyStatus] = useState('idle')
    const resetCopyStatusTimer = useRef()
    const isHistorical = event && event.id !== latestEventId
    const data = event ? event.after : items
    const text = JSON.stringify({ items: data }, null, 2)

    useEffect(() => {
        return () => window.clearTimeout(resetCopyStatusTimer.current)
    }, [])

    function showCopyStatus(status) {
        window.clearTimeout(resetCopyStatusTimer.current)
        setCopyStatus(status)
        resetCopyStatusTimer.current = window.setTimeout(() => setCopyStatus('idle'), 1800)
    }

    async function copyJson() {
        if (!navigator.clipboard?.writeText) {
            showCopyStatus('error')
            return
        }

        try {
            await navigator.clipboard.writeText(text)
            showCopyStatus('copied')
        } catch {
            showCopyStatus('error')
        }
    }

    return (
        <>
            <div className="json-meta">
                <span className={`json-badge ${isHistorical ? 'is-history' : ''}`}>
                    {isHistorical ? 'Captura histórica · estado posterior' : 'Estado actual'}
                </span>
                <button className="btn btn-secondary btn-copy" type="button" onClick={copyJson}>
                    {copyStatus === 'copied' ? <Clipboard /> : <Copy />}
                    <span>
                        {copyStatus === 'copied'
                            ? 'Copiado'
                            : copyStatus === 'error'
                              ? 'No se pudo copiar'
                              : 'Copiar'}
                    </span>
                </button>
            </div>
            <pre className="code-block">
                <code>{text}</code>
            </pre>
        </>
    )
}

function UpdateFlow({ technology }) {
    return (
        <div className="panel flow">
            <div className="panel-head">
                <div>
                    <h3 className="card-title">Flujo de actualización</h3>
                    <p className="panel-desc">
                        Visualiza cómo la tecnología seleccionada procesa una operación y actualiza
                        los componentes.
                    </p>
                </div>
                <span className="flow-legend">
                    <span className="legend-swatch" />
                    Paso donde se modifica el estado
                </span>
            </div>
            <ol className="flow-steps">
                {flowByTechnology[technology].map(([title, description], index) => (
                    <li className={`flow-step ${index === 2 ? 'is-state' : ''}`} key={title}>
                        <p className="flow-num">Paso {String(index + 1).padStart(2, '0')}</p>
                        <p className="flow-title">{title}</p>
                        <p className="flow-text">{description}</p>
                    </li>
                ))}
            </ol>
            <p className="flow-note">
                Representación conceptual del mecanismo utilizado; no constituye una medición de
                rendimiento.
            </p>
        </div>
    )
}

export function StateInspector({ technology, technologyName, items, history }) {
    const [view, setView] = useState('changes')
    const [manualSelection, setManualSelection] = useState(null)
    const latestEvent = history[0] ?? null
    const latestEventId = latestEvent?.id ?? null
    const selectedId =
        manualSelection?.latestEventId === latestEventId ? manualSelection.eventId : latestEventId
    const selectedEvent = history.find((event) => event.id === selectedId) ?? history[0] ?? null

    function selectHistoricalEvent(eventId) {
        setManualSelection({
            eventId,
            latestEventId,
        })
    }

    return (
        <section className="section card inspector" aria-labelledby="inspector-title">
            <div className="card-head inspector-head">
                <div>
                    <span className="eyebrow">03 · Observación</span>
                    <h2 id="inspector-title" className="section-title">
                        Inspector de estado
                    </h2>
                    <p className="section-desc">
                        Observa las operaciones del carrito, los cambios en los datos y el flujo de
                        actualización.
                    </p>
                </div>
                <span className="tech-badge">{technologyName}</span>
            </div>
            <div className="inspector-top">
                <div className="panel history">
                    <div className="panel-head">
                        <div>
                            <h3 className="card-title">Historial de operaciones</h3>
                            <p className="panel-desc">
                                Registro de las acciones realizadas por el usuario.
                            </p>
                        </div>
                        <span className="pill pill-sm">{history.length}</span>
                    </div>
                    <OperationHistory
                        history={history}
                        selectedId={selectedEvent?.id}
                        onSelect={selectHistoricalEvent}
                    />
                </div>
                <div className="panel change">
                    <div className="panel-head">
                        <div>
                            <h3 className="card-title">Cambio detectado</h3>
                            <p className="panel-desc">
                                Detalle de cómo se modificó el estado después de una operación.
                            </p>
                        </div>
                        <div className="toggle" role="group" aria-label="Vista del cambio">
                            <button
                                className={`toggle-btn ${view === 'changes' ? 'is-active' : ''}`}
                                type="button"
                                aria-pressed={view === 'changes'}
                                onClick={() => setView('changes')}
                            >
                                Cambios
                            </button>
                            <button
                                className={`toggle-btn ${view === 'json' ? 'is-active' : ''}`}
                                type="button"
                                aria-pressed={view === 'json'}
                                onClick={() => setView('json')}
                            >
                                Estado (JSON)
                            </button>
                        </div>
                    </div>
                    <div className="change-body">
                        {view === 'changes' ? (
                            <ChangeDetails event={selectedEvent} />
                        ) : (
                            <JsonViewer
                                items={items}
                                event={selectedEvent}
                                latestEventId={latestEventId}
                            />
                        )}
                    </div>
                </div>
            </div>
            <UpdateFlow technology={technology} />
        </section>
    )
}
