import * as actions from '../actions';
import { reducer } from './list-reducer';
import { service } from '../test-helpers';

describe('list-reducer', () => {
  describe('receiving a RESOURCE_LIST action', () => {
    it('should return a "loading" state for a list of resources', () => {
      const action = actions.listResources('users', service.fetchUsers);
      const state = reducer(undefined, action);
      expect(state.users).toMatchObject({
        data: null,
        loading: true,
        initialized: true,
      });
    });
  });

  describe('receiving a RESOURCE_LIST_SUCCESS action', () => {
    it('should return a list of resources, settings "loading" to false and "error" to null', () => {
      const action = actions.listResourcesSuccess(
        'users',
        service.fetchUsers()
      );
      const state = reducer(undefined, action);
      expect(state.users).toMatchObject({
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

    it('should return a list of resources with appended results', () => {
      const action = actions.listResourcesSuccess(
        'users',
        service.fetchUsers(),
        undefined,
        { append: true }
      );
      let state = reducer(undefined, action);
      state = reducer(
        state,
        actions.listResources('users', service.fetchUsers(), undefined, {
          append: true,
        })
      );
      state = reducer(state, action);
      expect(state.users).toMatchObject({
        data: [
          { id: 1, name: 'Rodrigo' },
          { id: 2, name: 'Fernanda' },
          { id: 1, name: 'Rodrigo' },
          { id: 2, name: 'Fernanda' },
        ],
      });
    });
  });

  describe('receiving a RESOURCE_LIST_FAILURE  action', () => {
    it('should return an error', () => {
      const error = new Error();
      const action = actions.listResourcesFailure('users', error);
      const state = reducer(undefined, action);
      expect(state.users).toMatchObject({
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
      const state = reducer({ users: { data: users } } as any, action);
      expect(state.users).toMatchObject({
        data: [{ id: 2 }, { id: 3 }],
      });
    });

    it('should not fail when the removed resource is not present', () => {
      const deleteUser = service.deleteUser(1);
      const action = actions.deleteResourceSuccess(
        'users',
        deleteUser,
        { id: 1 },
        { cached: true }
      );
      const state = reducer({ users: { data: null } } as any, action);
      expect(state.users).toMatchObject({
        data: null,
      });
    });
  });
});
