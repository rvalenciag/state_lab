import { useContextCart } from '../state/context/useContextCart'
import { LabWorkspace } from './LabWorkspace'

export function ContextMode() {
    const cart = useContextCart()

    return <LabWorkspace technology="context" technologyName="Context API" cart={cart} />
}
