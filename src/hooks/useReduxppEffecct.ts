import { useStore } from './useStore';
import { useIsomorphicLayoutEffect } from '../utils/useIsomorphicLayoutEffect';
import { Action, PayloadAction } from 'reduxpp';

export function useReduxppEffect(
  acionTypes: string | string[],
  callback: (
    getState: () => any,
    action: Action | PayloadAction,
    dispatch: (action: Action) => void
  ) => void
) {
  const store = useStore();
  useIsomorphicLayoutEffect(() => {
    if (!Array.isArray(acionTypes)) acionTypes = [acionTypes];
    const sub = store.effectOn(...acionTypes).subscribe(callback);
    return () => sub?.unsubscribe();
  }, [store]);
}
