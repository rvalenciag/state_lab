import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { StateInspector } from '../src/components/inspector/StateInspector'

const firstEvent = {
    id: 1,
    type: 'add',
    productId: 'p1',
    before: {},
    after: { p1: 1 },
    timestamp: 1000,
}

const secondEvent = {
    id: 2,
    type: 'add',
    productId: 'p2',
    before: { p1: 1 },
    after: { p1: 1, p2: 1 },
    timestamp: 2000,
}

function renderInspector(props = {}) {
    return render(
        <StateInspector
            technology="context"
            technologyName="Context API"
            items={{}}
            history={[]}
            {...props}
        />,
    )
}

describe('StateInspector', () => {
    it('muestra el estado inicial y el flujo de la tecnología activa', () => {
        renderInspector()

        expect(screen.getByText('Aún no se registraron operaciones.')).toBeInTheDocument()
        expect(screen.getByText('Función del contexto')).toBeInTheDocument()
    })

    it('conserva JSON abierto y selecciona automáticamente la operación nueva', async () => {
        const user = userEvent.setup()
        const view = renderInspector({ items: { p1: 1 }, history: [firstEvent] })

        await user.click(screen.getByRole('button', { name: 'Estado (JSON)' }))
        expect(screen.getByText('Estado actual')).toBeInTheDocument()

        view.rerender(
            <StateInspector
                technology="context"
                technologyName="Context API"
                items={{ p1: 1, p2: 1 }}
                history={[secondEvent, firstEvent]}
            />,
        )

        expect(screen.getByRole('button', { name: 'Estado (JSON)' })).toHaveAttribute(
            'aria-pressed',
            'true',
        )
        expect(screen.getByText(/"p2": 1/)).toBeInTheDocument()
    })

    it('permite observar una operación histórica sin cambiar el estado recibido', async () => {
        const user = userEvent.setup()
        renderInspector({ items: secondEvent.after, history: [secondEvent, firstEvent] })

        await user.click(screen.getByRole('button', { name: /Agregar Teclado Mecánico/ }))
        await user.click(screen.getByRole('button', { name: 'Estado (JSON)' }))

        expect(screen.getByText(/"p1": 1/)).toBeInTheDocument()
        expect(screen.queryByText(/"p2": 1/)).not.toBeInTheDocument()
    })
})
