import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

afterEach(() => cleanup())

class ResizeObserverMock {
    observe() {}

    disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock
globalThis.navigator.clipboard = {
    writeText: vi.fn(),
}
