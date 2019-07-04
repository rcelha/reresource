import React from 'react';
import { shallow } from 'enzyme';
import { withQuery } from './query';
import { setupStore } from '../test-helpers';
import { Store } from 'redux';

describe('hoc', () => {
  let store: Store;

  beforeEach(() => {
    store = setupStore();
  });

  describe('query', () => {
    it('should inject the resource to the component', () => {
      const DummyComponent = () => <p>dummy</p>;
      const DummyContainer: any = withQuery({
        resourceType: 'test',
        serviceFunction: () => ({} as any),
      })(DummyComponent);
      const container = shallow(<DummyContainer store={store} />);
      const component = container.shallow().find(DummyComponent);

      expect(component.props()).toMatchObject({
        loadResource: expect.any(Function),
        resource: {
          data: null,
          initialized: false,
        },
      });
    });

    it('should rename injected props', () => {
      const DummyComponent = () => <p>dummy</p>;
      const DummyContainer: any = withQuery({
        resourceType: 'test',
        serviceFunction: () => ({} as any),
        name: 'user',
      })(DummyComponent);
      const container = shallow(<DummyContainer store={store} />);
      const component = container.shallow().find(DummyComponent);

      expect(component.props()).toMatchObject({
        loadUser: expect.any(Function),
        user: {
          data: null,
          initialized: false,
        },
      });
    });
  });
});
