import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { keyBy } from 'lodash';
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

export const service = {
  fetchUser({ id }: { id: number }) {
    const users = service.fetchUsers();
    const data = keyBy(users.data, 'id')[id];
    return { data };
  },

  fetchUsers({ p = 0 } = {}) {
    const data = [
      [{ id: 1, name: 'Rodrigo' }, { id: 2, name: 'Fernanda' }],
      [{ id: 11, name: 'Cherry' }, { id: 12, name: 'Tyrion' }],
      [{ id: 21, name: 'Liz' }, { id: 22, name: 'Edo' }],
    ];

    return {
      data: data[p],
      meta: { total: 2 },
    };
  },

  postUser({ expand = false } = {}) {
    const data = expand
      ? { id: 100, name: 'New User From Service' }
      : { id: 999 };
    return { data };
  },
};
