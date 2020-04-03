import React, { useState, useCallback } from 'react'

function useSetState<S extends object>(
    initalState: S | (() => S),
): [S, (state: Partial<S> | ((state: S) => Partial<S>)) => void] {
    const [_state, _setState] = useState<S>(initalState)

    const setState = useCallback((state: Partial<S> | ((state: S) => Partial<S>)) => {
        _setState((prev: S) => {
            let nextState = state
            if (typeof state === 'function') {
                nextState = state(prev)
            }

            return { ...prev, ...nextState }
        })
    }, [])

    return [_state, setState]
}

// ------
// EXAMPLE
// ------
export default function UseSetState() {
    const [state, setState] = useSetState<{ name: string; age: number }>({ name: 'sx', age: 1 })

    const incrementAge = () => {
        setState(prev => ({ age: prev.age + 1 }))
    }

    return (
        <div onClick={incrementAge}>
            {state.name}: {state.age}
        </div>
    )
}

