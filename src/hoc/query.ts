import React, { ComponentType, PureComponent } from 'react';
import { connect } from 'react-redux';
import { listResources } from '../actions';
import { getQueries } from '../helpers';
import {
  ServiceFunction,
  ServiceOptions,
  ResourceOptions,
} from '../actions/types';
import { Dispatch } from 'redux';

interface QueryProps {
  // queries: object[];
  // addQuery(q: object): void;
  [propName: string]: any; // tslint:disable-line:no-any
}

/**
 * Inject query features into a given component
 */
export const withQuery = (options: {
  resourceType: string;
  serviceFunction: ServiceFunction;
  serviceParameters?: ServiceOptions;
  resourceOptions?: ResourceOptions;
  name?: string;
}) => (WrappedComponent: ComponentType<QueryProps>): ComponentType => {
  const {
    resourceType,
    serviceFunction,
    serviceParameters = {},
    resourceOptions = {},
    name = 'resource',
  } = options;

  function mapStateToProps(state: { resources: object }, props: QueryProps) {
    const resource = getQueries(state, resourceType, props.queries);
    return {
      [name]: resource,
    };
  }

  function mapDispatchToProps(dispatch: Dispatch, props: QueryProps) {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const loadResource = `load${capitalizedName}`;
    return {
      [loadResource]: (parameters: object) => {
        const mergedParameters = {
          ...serviceParameters,
          ...parameters,
        };
        props.addQuery(mergedParameters);
        dispatch(
          listResources.call(
            undefined,
            resourceType,
            serviceFunction,
            mergedParameters,
            resourceOptions
          )
        );
      },
    };
  }

  const ConnectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedComponent);

  return class QueryAwareComponent extends PureComponent {
    state = { queries: [] };

    addQuery = (q: object) =>
      this.setState((prevState: { queries: object[] }) => ({
        queries: [...prevState.queries, q],
      }));

    render() {
      return React.createElement(ConnectedComponent, {
        ...this.props,
        queries: this.state.queries,
        addQuery: this.addQuery,
      });
    }
  };
};
