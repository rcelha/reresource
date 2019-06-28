import { getFrom, getQueries } from './helpers';
import { setupStore } from './test-helpers';

describe('helpers', () => {
  describe('getFrom', () => {
    it('should return an non initialized resource', () => {
      const state = { resources: { byId: {}, list: {} } };
      const res = getFrom(state, 'users');
      expect(res).toMatchObject({
        loading: false,
        cached: false,
        initialized: false,
        data: null,
        meta: null,
        error: null,
      });
    });

    it('should return an non initialized single resource', () => {
      const state = { resources: { byId: {}, list: {} } };
      const res = getFrom(state, 'users', 1);
      expect(res).toMatchObject({
        loading: false,
        cached: false,
        initialized: false,
        data: null,
        meta: null,
        error: null,
      });
    });

    it('should return an initialized single resource', () => {
      const state = {
        resources: {
          byId: { users: { '1': { data: { id: 1, name: 'Test' } } } },
          list: {},
        },
      };
      const res = getFrom(state, 'users', 1);
      expect(res).toMatchObject({
        data: { id: 1, name: 'Test' },
      });
    });

    it('should return an initialized list of resources', () => {
      const state = {
        resources: {
          byId: {},
          list: { users: { data: [{ id: 1, name: 'Test' }] } },
        },
      };
      const res = getFrom(state, 'users');
      expect(res).toMatchObject({
        data: [{ id: 1, name: 'Test' }],
      });
    });
  });

  describe('getQueries', () => {
    const state = {
      resources: {
        byId: {},
        list: {},
        query: {
          users: {
            '{"p":1}': {
              cached: false,
              data: [
                {
                  id: 11,
                  name: 'Cherry',
                },
                {
                  id: 12,
                  name: 'Tyrion',
                },
              ],
              error: null,
              initialized: true,
              loading: false,
              meta: {},
            },
            '{"p":2}': {
              cached: false,
              data: [
                {
                  id: 21,
                  name: 'Liz',
                },
                {
                  id: 22,
                  name: 'Edo',
                },
              ],
              error: null,
              initialized: true,
              loading: false,
              meta: {},
            },
            '{}': {
              cached: false,
              data: [
                {
                  id: 1,
                  name: 'Rodrigo',
                },
                {
                  id: 2,
                  name: 'Fernanda',
                },
              ],
              error: null,
              initialized: true,
              loading: false,
              meta: {},
            },
          },
        },
      },
    };

    it('should extract a single query', () => {
      const queries = getQueries(state, 'users');
      expect(queries).toMatchSnapshot();
    });
    it('should combine multiple queries', () => {
      const queries = getQueries(state, 'users', [{}, { p: 2 }]);
      expect(queries).toMatchSnapshot();
    });
  });
});
