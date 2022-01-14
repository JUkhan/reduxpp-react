import React from 'react';
import { Store } from 'reduxpp';
import { StoreContext } from '../components/context';
import { useReduxppContext as useDefaultContext } from './useReduxppContext';

export function createStoreHook(context = StoreContext) {
  const useMonoContext =
    context === StoreContext
      ? useDefaultContext
      : () => React.useContext<Store>(context);
  return function useStore() {
    const store = useMonoContext();
    return store;
  };
}

export const useStore = createStoreHook();
