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

/**
 * Triggers the beginning of the resource deletion flow
 */
export function deleteResource(
  resourceType: string,
  serviceFunction: ServiceFunction,
  serviceParameters: ServiceOptions,
  resourceOptions?: ResourceOptions
): ResourceAction {
  resourceOptions = resourceOptions || {};
  return {
    type: actionTypes.RESOURCE_DEL,
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
export function deleteResourceSuccess(
  resourceType: string,
  serviceResult: ServiceReturn,
  serviceParameters: ServiceOptions,
  resourceOptions?: ResourceOptions
): ResourceSuccessAction {
  resourceOptions = resourceOptions || {};
  return {
    type: actionTypes.RESOURCE_DEL_SUCCESS,
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
export function deleteResourceFailure(
  resourceType: string,
  error: Error,
  serviceParameters: ServiceOptions,
  resourceOptions?: ResourceOptions
): ResourceFailureAction {
  resourceOptions = resourceOptions || {};
  return {
    type: actionTypes.RESOURCE_DEL_FAILURE,
    resourceType,
    payload: {
      error,
      serviceParameters,
      resourceOptions,
    },
  };
}
