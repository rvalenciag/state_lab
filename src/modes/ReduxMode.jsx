import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import {
    addItem,
    clearCart,
    decrementItem,
    incrementItem,
    removeItem,
    selectReduxHistory,
    selectReduxItems,
} from '../state/redux/cartSlice'
import { LabWorkspace } from './LabWorkspace'

export function ReduxMode() {
    const dispatch = useDispatch()
    const items = useSelector(selectReduxItems)
    const history = useSelector(selectReduxHistory)

    const cart = useMemo(() => {
        function dispatchProduct(action, productId) {
            dispatch(action({ productId, timestamp: Date.now() }))
        }

        return {
            items,
            history,
            addItem: (productId) => dispatchProduct(addItem, productId),
            incrementItem: (productId) => dispatchProduct(incrementItem, productId),
            decrementItem: (productId) => dispatchProduct(decrementItem, productId),
            removeItem: (productId) => dispatchProduct(removeItem, productId),
            clearCart: () => dispatch(clearCart({ timestamp: Date.now() })),
        }
    }, [dispatch, history, items])

    return <LabWorkspace technology="redux" technologyName="Redux Toolkit" cart={cart} />
}
