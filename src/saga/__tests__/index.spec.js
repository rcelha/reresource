import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as actions from '../../actions';
import { saga } from '../index';
import { reducer } from '../../reducers';
import { service } from '../../reducers/__mocks__/users-service';

const sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

describe('sagas', () => {
  let store;
  beforeEach(() => {
    const sagaMiddleware = createSagaMiddleware();
    store = createStore(reducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(saga);
  });

  describe('when a fetchResource action is dispatched', () => {
    it('executes the service and dispatches a fetchResourceSuccess', async () => {
      const action = actions.fetchResource('users', service.fetchUser, 1);
      store.dispatch(action);
      await sleep(0);
      expect(store.getState().byId.users['1']).toMatchObject({
        data: { id: 1, name: 'Rodrigo' },
        loading: false,
        initialized: true,
      });
    });
  });

  describe('when a listResources action is dispatched', () => {
    it('executes the service and dispatches a listResourcesSuccess', async () => {
      const action = actions.listResources('users', service.fetchUsers);
      store.dispatch(action);
      await sleep(0);
      expect(store.getState().list.users).toMatchObject({
        data: [{ id: 1, name: 'Rodrigo' }, { id: 2, name: 'Fernanda' }],
        loading: false,
        initialized: true,
        error: null,
      });
    });
  });

  describe('when a listResourcesSuccess action is dispatched', () => {
    it('saves its result in `byId` as cached', async () => {
      const action = actions.listResources('users', service.fetchUsers);
      store.dispatch(action);
      await sleep(0);
      expect(store.getState().byId.users).toMatchObject({
        '1': {
          data: { id: 1, name: 'Rodrigo' },
          loading: false,
          cached: true,
        },
        '2': {
          data: { id: 2, name: 'Fernanda' },
          loading: false,
          cached: true,
        },
      });
    });
  });
});
