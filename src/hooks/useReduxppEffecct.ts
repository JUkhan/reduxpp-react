import { useStore } from './useStore';
import { useIsomorphicLayoutEffect } from '../utils/useIsomorphicLayoutEffect';
import { EffectHandler } from 'reduxpp';

export function useReduxppEffect(
  acionTypes: string | string[],
  callback: EffectHandler
) {
  const store = useStore();
  useIsomorphicLayoutEffect(() => {
    let actions = acionTypes;
    if (!Array.isArray(acionTypes)) actions = [acionTypes];
    const sub = store.effectOn(...actions).subscribe(callback);
    return () => sub?.unsubscribe();
  }, [store]);
}
