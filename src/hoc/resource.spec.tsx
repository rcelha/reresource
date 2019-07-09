import React from 'react';
import { fetchResource } from '../actions';
import { shallow } from 'enzyme';
import { withResource } from './resource';
import { setupStore, service } from '../test-helpers';
import { Store } from 'redux';

describe('hoc', () => {
  let store: Store;

  beforeEach(() => {
    store = setupStore({
      resources: {
        byId: {
          users: {
            1: {
              data: { id: 1, name: 'Rodrigo' },
              initialized: false,
              cache: true,
            },
          },
        },
      },
    });
  });

  describe('withResource', () => {
    it('should inject the resource and its functions to the component', () => {
      const DummyComponent = () => <p>dummy</p>;
      const DummyContainer: any = withResource({
        resourceType: 'users',
        serviceFunction: service.fetchUser,
        serviceParameters: 1,
      })(DummyComponent);
      const wrapper = shallow(<DummyContainer store={store} />);
      const component = wrapper.dive().dive();
      expect(component.props()).toMatchObject({
        loadResource: expect.any(Function),
        resource: {
          data: { id: 1, name: 'Rodrigo' },
          initialized: false,
        },
      });
    });

    it('should rename injected resource', () => {
      const DummyComponent = () => <p>dummy</p>;
      const DummyContainer: any = withResource({
        resourceType: 'users',
        serviceFunction: service.fetchUser,
        name: 'user',
        serviceParameters: 1,
      })(DummyComponent);
      const wrapper = shallow(<DummyContainer store={store} />);
      const component = wrapper.dive().dive();
      expect(component.props()).toMatchObject({
        loadUser: expect.any(Function),
        user: {
          data: { id: 1, name: 'Rodrigo' },
          initialized: false,
        },
      });
    });
  });
});
