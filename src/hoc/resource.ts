import React, { useEffect, ComponentType } from 'react';
import { get, isObject, isFunction } from 'lodash';
import { connect } from 'react-redux';
import { getFrom } from '../helpers';
import { fetchResource } from '../actions';
import {
  ServiceFunction,
  ServiceOptions,
  ResourceOptions,
} from '../actions/types';

interface GenericProps {
  [propName: string]: string;
}

export const withResource = (options: {
  resourceType: string;
  serviceFunction: ServiceFunction;
  serviceParameters?: any;
  resourceOptions?: ResourceOptions;
  name?: string;
  autoLoad?: boolean;
  serviceParametersSelector?: any;
}) => (WrappedComponent: ComponentType<GenericProps>): ComponentType => {
  const {
    resourceType,
    serviceFunction,
    serviceParameters = {},
    resourceOptions = {},
    name = 'resource',

    // HOC options
    autoLoad = false,
    serviceParametersSelector,
  } = options;
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const loadResourceName = `load${capitalizedName}`;

  interface StateToProps {
    serviceParameters: object;
    [propName: string]: any;
  }

  interface DispatchToProps {
    fetchResource: any;
  }

  function mapStateToProps(
    state: { resources: object },
    props: object
  ): StateToProps {
    let finalServiceParameters = serviceParameters;
    if (isFunction(serviceParametersSelector)) {
      finalServiceParameters = serviceParametersSelector(state, props);
    }
    if (finalServiceParameters && !isObject(finalServiceParameters)) {
      finalServiceParameters = { id: finalServiceParameters };
    }

    let id = get(finalServiceParameters, 'id', undefined);
    return {
      serviceParameters: finalServiceParameters,
      [name]: getFrom(state, resourceType, id),
    };
  }

  const mapDispatchToProps: DispatchToProps = {
    fetchResource,
  };

  function mergeProps(
    stateProps: StateToProps,
    dispatchProps: DispatchToProps,
    ownProps: object
  ) {
    return {
      ...stateProps,
      ...ownProps,
      [loadResourceName]: (params = {}) => {
        if (!isObject(params)) {
          params = { id: params };
        }
        const mergedParams = {
          ...stateProps.serviceParameters,
          ...params,
        };
        dispatchProps.fetchResource(
          resourceType,
          serviceFunction,
          mergedParams,
          resourceOptions
        );
      },
    };
  }
  const ContainerComponent = (props: any) => {
    const resource = props[name];
    const { initialized } = resource;
    const loadResource = props[loadResourceName];
    useEffect(() => {
      if (autoLoad && !initialized) {
        loadResource();
      }
    }, [initialized, autoLoad]);

    return React.createElement(WrappedComponent, { ...props });
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(ContainerComponent);
};
