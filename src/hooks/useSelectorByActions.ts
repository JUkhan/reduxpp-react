import React from 'react';
import { useStore } from './useStore';
import { shallowEqual } from 'reduxpp';
import { useReduxppEffect } from './useReduxppEffecct';

export function useSelectorByActions<S = any, R = any>(
  actions: string | string[],
  selector: (state: S) => R
) {
  const store = useStore();
  const [selectedState, setState] = React.useState(selector(store.getState()));
  let oldState = selectedState;
  useReduxppEffect(actions, () => {
    const newSelectedState = selector(store.getState());
    if (!shallowEqual(newSelectedState, oldState)) {
      setState(newSelectedState);
      oldState = newSelectedState;
    }
  });

  return selectedState;
}
