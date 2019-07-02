import { put, takeEvery, call } from 'redux-saga/effects';
import {
  RESOURCE_GET,
  RESOURCE_LIST_SUCCESS,
  RESOURCE_LIST,
  RESOURCE_ADD,
  RESOURCE_ADD_SUCCESS,
  RESOURCE_DEL,
} from '../action-types';
import * as actions from '../actions';
import { ResourceAction, ResourceSuccessAction } from '../actions/types';

/**
 * @ignore
 */
export function* fetchResource(action: ResourceAction) {
  try {
    const response = yield call(
      action.payload.serviceFunction,
      action.payload.serviceParameters
    );
    yield put(
      actions.fetchResourceSuccess(
        action.resourceType,
        response,
        action.payload.serviceParameters,
        action.payload.resourceOptions
      )
    );
  } catch (e) {
    yield put(
      actions.fetchResourceFailure(
        action.resourceType,
        e,
        action.payload.serviceParameters,
        action.payload.resourceOptions
      )
    );
  }
}

/**
 * @todo Avoid fetching the same list multiple times
 */
export function* listResources(action: ResourceAction) {
  try {
    const response = yield call(
      action.payload.serviceFunction,
      action.payload.serviceParameters
    );
    yield put(
      actions.listResourcesSuccess(
        action.resourceType,
        response,
        action.payload.serviceParameters,
        action.payload.resourceOptions
      )
    );
  } catch (e) {
    yield put(
      actions.listResourcesFailure(
        action.resourceType,
        e,
        action.payload.serviceParameters,
        action.payload.resourceOptions
      )
    );
  }
}

/**
 * @ignore
 */
export function* cacheResources(action: ResourceSuccessAction) {
  for (const i of action.payload.data as [{ id?: string | number }]) {
    if (!i.id) {
      continue;
    }
    const resourceOptions = {
      ...action.payload.resourceOptions,
      cached: true,
    };
    yield put(
      actions.fetchResourceSuccess(
        action.resourceType,
        { data: i },
        { id: i.id },
        resourceOptions
      )
    );
  }
}

export function* cacheCreatedResource(action: ResourceSuccessAction) {
  const { id } = action.payload.data as { id?: string | number };
  if (!id) return;

  const resourceOptions = {
    ...action.payload.resourceOptions,
    cached: true,
  };
  yield put(
    actions.fetchResourceSuccess(
      action.resourceType,
      { data: { ...action.payload.serviceParameters, ...action.payload.data } },
      { id },
      resourceOptions
    )
  );
}

/**
 * @ignore
 */
export function* createResource(action: ResourceAction) {
  try {
    const response = yield call(
      action.payload.serviceFunction,
      action.payload.serviceParameters
    );
    yield put(
      actions.createResourceSuccess(
        action.resourceType,
        response,
        action.payload.serviceParameters,
        action.payload.resourceOptions
      )
    );
  } catch (e) {
    yield put(
      actions.createResourceFailure(
        action.resourceType,
        e,
        action.payload.serviceParameters,
        action.payload.resourceOptions
      )
    );
  }
}

/**
 * @ignore
 */
export function* deleteResource(action: ResourceAction) {
  try {
    const response = yield call(
      action.payload.serviceFunction,
      action.payload.serviceParameters
    );
    yield put(
      actions.deleteResourceSuccess(
        action.resourceType,
        response,
        action.payload.serviceParameters,
        action.payload.resourceOptions
      )
    );
  } catch (e) {
    yield put(
      actions.deleteResourceFailure(
        action.resourceType,
        e,
        action.payload.serviceParameters,
        action.payload.resourceOptions
      )
    );
  }
}
export function* saga() {
  yield takeEvery(RESOURCE_GET, fetchResource);
  yield takeEvery(RESOURCE_LIST, listResources);
  yield takeEvery(RESOURCE_LIST_SUCCESS, cacheResources);
  yield takeEvery(RESOURCE_ADD, createResource);
  yield takeEvery(RESOURCE_ADD_SUCCESS, cacheCreatedResource);
  yield takeEvery(RESOURCE_DEL, deleteResource);
}
