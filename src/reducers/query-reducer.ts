import produce from 'immer';
import { get, set, omit } from 'lodash';
import {
  ResourceAction,
  ResourceSuccessAction,
  ResourceFailureAction,
} from '../actions/types';
import { StructuredResource } from './types';
import {
  RESOURCE_LIST,
  RESOURCE_LIST_SUCCESS,
  RESOURCE_LIST_FAILURE,
  RESOURCE_DEL_SUCCESS,
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
      const serviceParameters = JSON.stringify(
        action.payload.serviceParameters
      );
      const resourceId = `${resourceType}.${serviceParameters}`;
      const resource = get(draft, resourceId, {
        ...INITIAL_RESOURCE,
      }) as StructuredResource;

      switch (action.type) {
        case RESOURCE_LIST:
          resource.loading = true;
          resource.initialized = true;
          resource.error = null;
          set(draft, resourceId, resource);
          return;

        case RESOURCE_LIST_SUCCESS:
          {
            action = action as ResourceSuccessAction;
            resource.loading = false;
            resource.initialized = true;
            resource.error = null;
            resource.data = action.payload.data;
            resource.meta = action.payload.meta || null;
            set(draft, resourceId, resource);
          }
          return;
        case RESOURCE_LIST_FAILURE:
          {
            action = action as ResourceFailureAction;
            resource.loading = false;
            resource.initialized = true;
            resource.error = action.payload.error;
            resource.data = null;
            resource.meta = null;
            set(draft, resourceId, resource);
          }
          return;

        case RESOURCE_DEL_SUCCESS:
          {
            action = action as ResourceSuccessAction;
            resource.loading = false;
            resource.initialized = true;
            resource.error = null;
            if (Array.isArray(resource.data)) {
              resource.data = resource.data.filter(
                i => i.id !== action.payload.serviceParameters.id
              );
            } else {
              resource.data = omit(resource.data, action.payload
                .serviceParameters.id as string);
            }
            resource.meta = action.payload.meta || null;
            set(draft, resourceId, resource);
          }
          return;
        default:
          return;
      }
    }
  );
}
