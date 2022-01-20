import { Action } from 'reduxpp';
export type ActionFn = (...args: any[]) => Action;
export type ActionParam = ActionFn | ActionFn[];
