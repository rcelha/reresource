import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { saga } from './index';
import { reducer } from './reducers';

export const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

export const setupStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(saga);
  return store;
};
