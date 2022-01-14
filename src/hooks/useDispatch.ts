import { AnyAction } from 'reduxpp';
import { useStore } from './useStore';

export function useDispatch() {
  const store = useStore();
  return (action: AnyAction) => store.dispatch(action);
}
