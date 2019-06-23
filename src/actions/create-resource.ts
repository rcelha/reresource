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
 * Triggers the beginning of the resource creation flow
 */
export function createResource(
  resourceType: string,
  serviceFunction: ServiceFunction,
  serviceParameters: ServiceOptions,
  resourceOptions?: ResourceOptions
): ResourceAction {
  resourceOptions = resourceOptions || {};
  return {
    type: actionTypes.RESOURCE_ADD,
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
export function createResourceSuccess(
  resourceType: string,
  serviceResult: ServiceReturn,
  serviceParameters: ServiceOptions,
  resourceOptions?: ResourceOptions
): ResourceSuccessAction {
  resourceOptions = resourceOptions || {};
  return {
    type: actionTypes.RESOURCE_ADD_SUCCESS,
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
export function createResourceFailure(
  resourceType: string,
  error: Error,
  serviceParameters: ServiceOptions,
  resourceOptions?: ResourceOptions
): ResourceFailureAction {
  resourceOptions = resourceOptions || {};
  return {
    type: actionTypes.RESOURCE_ADD_FAILURE,
    resourceType,
    payload: {
      error,
      serviceParameters,
      resourceOptions,
    },
  };
}
