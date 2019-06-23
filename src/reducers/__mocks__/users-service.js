import { keyBy } from 'lodash';

export const service = {
  fetchUser({ id }) {
    const users = service.fetchUsers();
    const data = keyBy(users.data, 'id')[id];
    return { data };
  },

  fetchUsers() {
    return {
      data: [{ id: 1, name: 'Rodrigo' }, { id: 2, name: 'Fernanda' }],
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
