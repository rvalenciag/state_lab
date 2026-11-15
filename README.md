# StateLab

StateLab es una aplicación académica creada con React para demostrar cómo **Context API**, **Zustand** y **Redux Toolkit** administran el mismo carrito de compras mediante mecanismos distintos.

El proyecto está pensado para una exposición universitaria: la interfaz permite realizar operaciones reales y el inspector muestra las capturas del estado antes y después de cada cambio.

## Funcionalidades

- Catálogo local de ocho productos.
- Carrito con operaciones para agregar, aumentar, disminuir, eliminar y vaciar.
- Un carrito e historial independientes para Context API, Zustand y Redux Toolkit.
- Historial limitado a las 30 operaciones más recientes.
- Comparación del estado anterior y posterior de cada operación.
- Vista del estado en JSON y botón para copiarlo.
- Flujo educativo que explica cómo cada tecnología procesa una actualización.

## Tecnologías

- React y Vite.
- Context API y `useState`.
- Zustand.
- Redux Toolkit y React-Redux.
- Vitest, React Testing Library y Testing Library User Event.
- Oxlint y Prettier.

## Instalación y comandos

```bash
npm ci
npm run dev
```

También están disponibles los siguientes comandos:

```bash
npm test       # Ejecuta las pruebas automatizadas.
npm run lint   # Revisa src/ y tests con Oxlint.
npm run build  # Genera la compilación de producción.
npm run format # Formatea los archivos con 4 espacios.
```

## Estructura

- `src/data/`: catálogo estático de productos e imágenes locales.
- `src/domain/`: reglas puras, selectores y eventos del carrito.
- `src/state/`: Context API, store de Zustand, slice y store de Redux.
- `src/modes/`: conexión entre cada tecnología y los componentes visuales.
- `src/components/`: catálogo, carrito, selector, encabezado e inspector.
- `tests/`: pruebas de dominio, stores, Context API, inspector e integración.

## Gestión de estado

Cada alternativa guarda su propio carrito, historial y contador de operaciones durante la sesión:

- **Context API:** `CartProvider` mantiene el estado con `useState` y lo expone mediante contexto.
- **Zustand:** `useZustandCartStore` define un store independiente y acciones con `set()`.
- **Redux Toolkit:** `cartSlice` procesa acciones mediante reducers y Redux almacena el resultado.

Las tres implementaciones reutilizan las mismas reglas de negocio, pero no comparten el almacenamiento de sus carritos.

## Limitaciones

- Los productos son datos locales de demostración.
- No existe backend, autenticación, pagos ni proceso de compra.
- Los carritos no se conservan después de recargar la página.
- El inspector presenta operaciones y capturas reales; el flujo técnico es una explicación conceptual.

## Pruebas

Las pruebas comprueban reglas del dominio, operaciones de Context API, Zustand y Redux Toolkit, historial, inspector y la independencia de los tres carritos. Ejecútalas con:

```bash
npm test
```
