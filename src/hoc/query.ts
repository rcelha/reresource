import React, { ComponentType } from 'react';
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
  queries: object[];
  addQuery(q: object): void;
  [propName: string]: any; // tslint:disable-line:no-any
}

/**
 * Inject query features into a given component
 */
export const withQuery = (
  resourceType: string,
  serviceFunction: ServiceFunction,
  serviceParameters: ServiceOptions = {},
  resourceOptions: ResourceOptions = {}
) => (WrappedComponent: ComponentType<QueryProps>) => {
  function mapStateToProps(state: { resources: object }, props: QueryProps) {
    const resource = getQueries(state, resourceType, props.queries);
    return {
      resource,
    };
  }

  function mapDispatchToProps(dispatch: Dispatch, props: QueryProps) {
    return {
      listResources: (parameters: object) => {
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

  return class QueryAwareComponent extends React.PureComponent {
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
