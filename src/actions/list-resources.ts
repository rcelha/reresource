import * as actionTypes from '../action-types';
import {
  ServiceFunction,
  ServiceOptions,
  ResourceOptions,
  ResourceAction,
  ServiceReturn,
  ResourceSuccessAction,
  ResourceFailureAction,
} from './types';

export function listResources(
  resourceType: string,
  serviceFunction: ServiceFunction,
  serviceParameters: ServiceOptions = {},
  resourceOptions?: ResourceOptions
): ResourceAction {
  resourceOptions = resourceOptions || {};
  return {
    type: actionTypes.RESOURCE_LIST,
    resourceType,
    payload: {
      serviceFunction,
      serviceParameters,
      resourceOptions,
    },
  };
}

/**
 * @ignore
 */
export function listResourcesSuccess(
  resourceType: string,
  serviceResult: ServiceReturn,
  serviceParameters: ServiceOptions = {},
  resourceOptions?: ResourceOptions
): ResourceSuccessAction {
  resourceOptions = resourceOptions || {};
  return {
    type: actionTypes.RESOURCE_LIST_SUCCESS,
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
export function listResourcesFailure(
  resourceType: string,
  error: Error,
  serviceParameters: ServiceOptions = {},
  resourceOptions?: ResourceOptions
): ResourceFailureAction {
  resourceOptions = resourceOptions || {};
  return {
    type: actionTypes.RESOURCE_LIST_FAILURE,
    resourceType,
    payload: {
      error,
      serviceParameters,
      resourceOptions,
    },
  };
}
