import { getFrom } from '../helpers';
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
});
