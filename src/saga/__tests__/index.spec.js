import * as actions from '../../actions';
import { sleep, setupStore, service } from '../../test-helpers';

describe('sagas', () => {
  let store;
  beforeEach(() => {
    store = setupStore();
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

  describe('when a createResources action is dispatched', () => {
    it('executes the service and dispatches a createResourceSuccess', async () => {
      const action = actions.createResource('users', service.postUser, {
        name: 'Cherry',
      });
      store.dispatch(action);

      await sleep(0);
      expect(store.getState().mutation.users).toMatchObject({
        data: {
          id: 999,
          name: 'Cherry',
        },
      });
    });

    it('saves result to cache', async () => {
      const action = actions.createResource('users', service.postUser, {
        name: 'Cherry',
      });
      store.dispatch(action);

      await sleep(0);
      expect(store.getState().byId.users).toMatchObject({
        '999': {
          data: { id: 999, name: 'Cherry' },
        },
      });
    });
  });
});
