import React, { useState, useCallback } from 'react'

function useSetState<S extends object>(
    initialState: S | (() => S),
): [S, (state: Partial<S> | ((state: S) => Partial<S>)) => void] {

    const [_state, _setState] = useState<S>(initialState);

    const setState = useCallback((state: Partial<S> | ((state: S) => Partial<S>)) => {
        _setState((prev: S) => {
            let nextState = state;
            if (typeof state === 'function') {
                nextState = state(prev);
            }

            return { ...prev, ...nextState };
        })
    }, [])

    return [_state, setState];
}


// -----
// EXAMPLE
// -----

export default function UseSetState() {
    // const [state, setState] = useState({ name: 'fdp', age: '1' })
    const [state, setState] = useSetState<{ name: string; age: number }>({ name: 'sx', age: 1 });

    const increamentAge = () => {
        setState(prev => ({ age: prev.age + 1 }))
    }

    return (
        <div onClick={increamentAge} style={{ width: '100px', height: '100px', background: 'pink' }}>
            {state.name}: {state.age}
        </div>
    )
}
