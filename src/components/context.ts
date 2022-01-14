import { Store } from 'reduxpp';
import React from 'react';

export const StoreContext = React.createContext<Store>(null as any);

if (process.env.NODE_ENV !== 'production') {
  StoreContext.displayName = 'ReactMonoState';
}
