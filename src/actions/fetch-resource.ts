import * as actionTypes from '../action-types';
import { isObject } from 'lodash';
import {
  ServiceFunction,
  ServiceOptions,
  ResourceOptions,
  ResourceAction,
  ServiceReturn,
  ResourceSuccessAction,
  ResourceFailureAction,
} from './types';

/**
 * Triggers the beginning of the resource fetching flow
 */
export function fetchResource(
  resourceType: string,
  serviceFunction: ServiceFunction,
  serviceParameters: string | number | ServiceOptions,
  resourceOptions?: ResourceOptions
): ResourceAction {
  const serviceParametersObject = isObject(serviceParameters)
    ? serviceParameters
    : { id: serviceParameters };
  resourceOptions = resourceOptions || {};
  return {
    type: actionTypes.RESOURCE_GET,
    resourceType,
    payload: {
      serviceFunction,
      serviceParameters: serviceParametersObject,
      resourceOptions,
    },
  };
}

/**
 * @ignore
 */
export function fetchResourceSuccess(
  resourceType: string,
  serviceResult: ServiceReturn,
  serviceParameters: ServiceOptions,
  resourceOptions?: ResourceOptions
): ResourceSuccessAction {
  resourceOptions = resourceOptions || {};
  return {
    type: actionTypes.RESOURCE_GET_SUCCESS,
    resourceType,
    payload: {
      data: serviceResult.data,
      meta: serviceResult.meta,
      serviceParameters,
      resourceOptions,
    },
  };
}

/**
 * @ignore
 */
export function fetchResourceFailure(
  resourceType: string,
  error: Error,
  serviceParameters: ServiceOptions,
  resourceOptions?: ResourceOptions
): ResourceFailureAction {
  resourceOptions = resourceOptions || {};
  return {
    type: actionTypes.RESOURCE_GET_FAILURE,
    resourceType,
    payload: {
      error,
      serviceParameters,
      resourceOptions,
    },
  };
}
