import { useState } from 'react'
import { Header } from './components/layout/Header'
import { TechnologySelector } from './components/technology/TechnologySelector'
import { ContextMode } from './modes/ContextMode'
import { ReduxMode } from './modes/ReduxMode'
import { ZustandMode } from './modes/ZustandMode'
import './App.css'

function App() {
    const [activeTechnology, setActiveTechnology] = useState('context')

    const modes = {
        context: <ContextMode />,
        zustand: <ZustandMode />,
        redux: <ReduxMode />,
    }

    return (
        <>
            <Header />
            <main className="container page">
                <TechnologySelector
                    activeTechnology={activeTechnology}
                    onSelect={setActiveTechnology}
                />
                {modes[activeTechnology]}
            </main>
            <footer className="container site-footer">
                StateLab · Proyecto académico de demostración — sin backend, pagos ni autenticación.
            </footer>
        </>
    )
}

export default App
