import { useStore } from './useStore';
import { useIsomorphicLayoutEffect } from '../utils/useIsomorphicLayoutEffect';
import { EffectHandler } from 'reduxpp';
import { ActionParam, ActionFn } from './typeHelper';

export function useReduxppEffect(
  acionTypes: ActionParam,
  callback: EffectHandler
) {
  const store = useStore();
  useIsomorphicLayoutEffect(() => {
    let actions: ActionFn[] = Array.isArray(acionTypes)
      ? acionTypes
      : [acionTypes];
    const sub = store.subscribeForEffect(
      actions.map((a) => a().type),
      callback
    );
    return () => sub?.unsubscribe();
  }, [store]);
}
