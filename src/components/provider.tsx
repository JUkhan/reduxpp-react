import React from 'react';
import { Store } from 'reduxpp';
import { StoreContext } from '../components/context';
import { useIsomorphicLayoutEffect } from '../utils/useIsomorphicLayoutEffect';
interface StoreProps {
    store: Store,
    context?: React.Context<Store>
}

export const Provider: React.FC<StoreProps> = ({ store, context, children }) => {
    useIsomorphicLayoutEffect(() => {
        return () => {
            store?.clean();
        }
    }, [store]);
    const Context = context || StoreContext
    return <Context.Provider value={store}>{children}</Context.Provider>;
}
