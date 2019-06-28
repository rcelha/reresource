import * as actions from '../actions';
import { reducer } from './fetch-reducer';
import { service } from '../test-helpers';

describe('reducer', () => {
  describe('receiving a RESOURCE_GET action', () => {
    it('should return a "loading" state', () => {
      const action = actions.fetchResource('users', service.fetchUser, 1);
      const state = reducer(undefined, action);
      expect(state.users['1']).toMatchObject({
        data: null,
        loading: true,
        initialized: true,
      });
    });
  });

  describe('receiving a RESOURCE_GET_SUCCESS action', () => {
    it('should return a resource', () => {
      const user = service.fetchUser({ id: 1 });
      const action = actions.fetchResourceSuccess('users', user, { id: 1 });
      const state = reducer(undefined, action);
      expect(state.users['1']).toMatchObject({
        data: { id: 1, name: 'Rodrigo' },
        loading: false,
        cached: false,
      });
    });

    it('should store two different entries per resource fetched', () => {
      const user1 = service.fetchUser({ id: 1 });
      const user2 = service.fetchUser({ id: 2 });
      let state;
      let action;

      action = actions.fetchResourceSuccess('users', user1, { id: 1 });
      state = reducer(state, action);
      action = actions.fetchResourceSuccess('users', user2, { id: 2 });
      state = reducer(state, action);

      expect(state.users).toMatchObject({
        '1': {
          data: { id: 1, name: 'Rodrigo' },
          loading: false,
        },
        '2': {
          data: { id: 2, name: 'Fernanda' },
          loading: false,
        },
      });
    });
  });

  describe('receiving a RESOURCE_GET_SUCCESS action with `cached` flag', () => {
    it('should return a resource', () => {
      const user = service.fetchUser({ id: 1 });
      const action = actions.fetchResourceSuccess(
        'users',
        user,
        { id: 1 },
        { cached: true }
      );
      const state = reducer(undefined, action);
      expect(state.users['1']).toMatchObject({
        data: { id: 1, name: 'Rodrigo' },
        cached: true,
      });
    });
  });

  describe('receiving a RESOURCE_GET_FAILURE  action', () => {
    it('should return an error', () => {
      const error = new Error();
      const action = actions.fetchResourceFailure('users', error, { id: 1 });
      const state = reducer(undefined, action);
      expect(state.users['1']).toMatchObject({
        error,
        data: null,
        loading: false,
      });
    });
  });
});
