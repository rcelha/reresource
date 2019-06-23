import * as actions from '../../actions';
import { reducer } from '../create-reducer';
import { service } from '../__mocks__/users-service';

describe('create-reducer', () => {
  const newUser = { name: 'New User' };

  describe('receiving a RESOURCE_ADD action', () => {
    it('should return a "loading" state for the new resource', () => {
      const action = actions.createResource('users', service.postUser, newUser);
      const state = reducer(undefined, action);
      expect(state.users).toMatchObject({
        data: null,
        loading: true,
        initialized: true,
      });
    });
  });

  describe('receiving a RESOURCE_ADD_SUCCESS action', () => {
    it('should return the new resource, combining sent data with returned id', () => {
      const action = actions.createResourceSuccess(
        'users',
        service.postUser(),
        newUser
      );
      const state = reducer(undefined, action);
      expect(state.users).toMatchObject({
        data: {
          id: 999,
          name: 'New User',
        },
        loading: false,
        initialized: true,
      });
    });

    it('should return the new resource prioritising remote data', () => {
      const action = actions.createResourceSuccess(
        'users',
        service.postUser({ expand: true }),
        newUser
      );
      const state = reducer(undefined, action);
      expect(state.users).toMatchObject({
        data: {
          id: 100,
          name: 'New User From Service',
        },
        loading: false,
        initialized: true,
      });
    });
  });

  describe('receiving a RESOURCE_ADD_FAILURE  action', () => {
    it('should return an error', () => {
      const error = new Error();
      const action = actions.createResourceFailure('users', error);
      const state = reducer(undefined, action);
      expect(state.users).toMatchObject({
        error,
        data: null,
        loading: false,
      });
    });
  });
});
