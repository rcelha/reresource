import * as actions from '../actions';
import { reducer } from './query-reducer';
import { service } from '../test-helpers';

describe('query-reducer', () => {
  describe('receiving a RESOURCE_LIST action', () => {
    it('should return a "loading" state for a query of resources', () => {
      const action = actions.listResources('users', service.fetchUsers);
      const state = reducer(undefined, action);
      expect(state.users['{}']).toMatchObject({
        data: null,
        loading: true,
        initialized: true,
      });
    });
  });

  describe('receiving a RESOURCE_LIST_SUCCESS action', () => {
    it('should return a query of resources, settings "loading" to false and "error" to null', () => {
      const action = actions.listResourcesSuccess(
        'users',
        service.fetchUsers()
      );
      const state = reducer(undefined, action);
      expect(state.users['{}']).toMatchObject({
        data: [
          { id: 1, name: 'Rodrigo' },
          { id: 2, name: 'Fernanda' },
        ],
        meta: { total: 2 },
        loading: false,
        initialized: true,
        error: null,
      });
    });
  });

  describe('receiving a RESOURCE_LIST_FAILURE  action', () => {
    it('should return an error', () => {
      const error = new Error();
      const action = actions.listResourcesFailure('users', error);
      const state = reducer(undefined, action);
      expect(state.users['{}']).toMatchObject({
        error,
        data: null,
        loading: false,
      });
    });
  });

  describe('receiving a RESOURCE_DEL_SUCCESS  action', () => {
    it('should remove that resource', () => {
      const deleteUser = service.deleteUser(1);
      const action = actions.deleteResourceSuccess(
        'users',
        deleteUser,
        { id: 1 },
        { cached: true }
      );
      const users = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const users2 = [{ id: 1 }, { id: 5 }, { id: 6 }];
      const state = reducer(
        {
          users: { '{}': { data: users }, '{ page: 2 }': { data: users2 } },
        } as any,
        action
      );
      expect(state.users['{}']).toMatchObject({
        data: [{ id: 2 }, { id: 3 }],
      });
      expect(state.users['{ page: 2 }']).toMatchObject({
        data: [{ id: 5 }, { id: 6 }],
      });
    });

    it('should not fail when there is no resource to remove', () => {
      const deleteUser = service.deleteUser(1);
      const action = actions.deleteResourceSuccess(
        'users',
        deleteUser,
        { id: 1 },
        { cached: true }
      );
      const state = reducer(
        {
          users: {
            '{}': { data: null },
            '{ page: 2 }': { data: null },
          },
        } as any,
        action
      );
      expect(state.users['{}']).toMatchObject({
        data: null,
      });
      expect(state.users['{ page: 2 }']).toMatchObject({
        data: null,
      });
    });

    it('should not fail when there are no queries', () => {
      const deleteUser = service.deleteUser(1);
      const action = actions.deleteResourceSuccess(
        'users',
        deleteUser,
        { id: 1 },
        { cached: true }
      );
      const state = reducer({} as any, action);
    });
  });
});
