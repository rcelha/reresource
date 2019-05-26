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
};
