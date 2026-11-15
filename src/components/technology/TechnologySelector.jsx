const technologies = [
    { id: 'context', name: 'Context API' },
    { id: 'zustand', name: 'Zustand' },
    { id: 'redux', name: 'Redux Toolkit' },
]

export function TechnologySelector({ activeTechnology, onSelect }) {
    return (
        <section className="section tech-section card" aria-labelledby="tech-title">
            <div className="tech-text">
                <span className="eyebrow">01 · Implementación</span>
                <h2 id="tech-title" className="section-title">
                    Tecnología de gestión de estado
                </h2>
                <p className="section-desc">
                    Selecciona una alternativa y observa cómo administra el mismo carrito de
                    compras.
                </p>
            </div>
            <div className="segmented" role="group" aria-label="Tecnología de gestión de estado">
                {technologies.map((technology) => {
                    const isActive = technology.id === activeTechnology

                    return (
                        <button
                            key={technology.id}
                            className={`segmented-btn ${isActive ? 'is-active' : ''}`}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => onSelect(technology.id)}
                        >
                            {technology.name}
                        </button>
                    )
                })}
            </div>
        </section>
    )
}
