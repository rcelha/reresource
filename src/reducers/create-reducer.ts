import produce from 'immer';
import { get, set } from 'lodash';
import {
  ResourceAction,
  ResourceSuccessAction,
  ResourceFailureAction,
} from '../actions/types';
import { StructuredResource } from './types';
import {
  RESOURCE_ADD,
  RESOURCE_ADD_SUCCESS,
  RESOURCE_ADD_FAILURE,
} from '../action-types';
import { INITIAL_RESOURCE } from './initial-resource';

export function reducer(
  state: { [k: string]: StructuredResource } = {},
  action: ResourceAction | ResourceSuccessAction | ResourceFailureAction
) {
  return produce(
    state,
    (draft: { [k: string]: { [k: string]: StructuredResource } }): void => {
      if (!action.type.startsWith('reresource/')) return;

      const resourceType = action.resourceType;
      const resource = get(draft, resourceType, { ...INITIAL_RESOURCE });
      set(draft, resourceType, resource);

      switch (action.type) {
        case RESOURCE_ADD:
          Object.assign(resource, {
            loading: true,
            cached: false,
            initialized: true,
            error: null,
          });
          return;

        case RESOURCE_ADD_SUCCESS: {
          const successAction = action as ResourceSuccessAction;
          Object.assign(resource, {
            loading: false,
            cached: false,
            initialized: true,
            error: null,
            data: {
              ...successAction.payload.serviceParameters,
              ...successAction.payload.data,
            },
            meta: successAction.payload.meta,
          });
          return;
        }
        case RESOURCE_ADD_FAILURE: {
          const failAction = action as ResourceFailureAction;
          Object.assign(resource, {
            loading: false,
            data: null,
            error: failAction.payload.error,
          });
          return;
        }
        default:
          return;
      }
    }
  );
}
