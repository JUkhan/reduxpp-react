import React from 'react';
import { StoreContext } from '../components/context';

export function useReduxppContext() {
  const contextValue = React.useContext(StoreContext);

  if (process.env.NODE_ENV !== 'production' && !contextValue) {
    throw new Error(
      'could not find react-mono-state context value; please ensure the component is wrapped in a <Provider>'
    );
  }

  return contextValue;
}
