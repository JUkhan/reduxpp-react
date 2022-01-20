import React from 'react';
import { useStore } from './useStore';
import { shallowEqual } from 'reduxpp';
import { useReduxppEffect } from './useReduxppEffecct';
import { ActionParam } from './typeHelper';

export function useSelectorByActions<TState = any, TSelected = any>(
  actions: ActionParam,
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) {
  const store = useStore();
  const [selectedState, setState] = React.useState(selector(store.getState()));
  let oldState = selectedState;
  useReduxppEffect(actions, () => {
    const newSelectedState = selector(store.getState());
    if (!(equalityFn || shallowEqual)(newSelectedState, oldState)) {
      setState(newSelectedState);
      oldState = newSelectedState;
    }
  });

  return selectedState;
}
