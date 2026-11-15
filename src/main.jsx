import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './state/context/CartProvider.jsx'
import { reduxStore } from './state/redux/store.js'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={reduxStore}>
            <CartProvider>
                <App />
            </CartProvider>
        </Provider>
    </StrictMode>,
)
