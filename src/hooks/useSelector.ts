import React from 'react';
import { useStore } from './useStore';
import { useIsomorphicLayoutEffect } from '../utils/useIsomorphicLayoutEffect';

export function useSelector<S = any, TSelected = any>(
  selector: (state: S) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) {
  const store = useStore();
  const [selectedState, setState] = React.useState(selector(store.getState()));
  useIsomorphicLayoutEffect(() => {
    const sub = store
      .select(selector, equalityFn)
      .subscribe((newSelectedState: any) => {
        setState(newSelectedState);
      });
    return () => {
      sub?.unsubscribe();
    };
  }, [store]);

  return selectedState;
}

/**
 * This interface allows you to easily create a hook that is properly typed for your
 * store's root state.
 *
 * @example
 *
 * interface RootState {
 *   property: string;
 * }
 *
 * const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
 */
export interface TypedUseSelectorHook<TState> {
  <TSelected>(
    selector: (state: TState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected;
}
