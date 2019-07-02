import {
  RESOURCE_GET,
  RESOURCE_GET_FAILURE,
  RESOURCE_GET_SUCCESS,
  RESOURCE_DEL_SUCCESS,
} from '../action-types';
import produce from 'immer';
import { get, setWith, omit } from 'lodash';
import {
  ResourceAction,
  ResourceSuccessAction,
  ResourceFailureAction,
} from '../actions/types';
import { StructuredResource } from './types';
import { INITIAL_RESOURCE } from './initial-resource';

const set = (a: any, b: any, c: any) => setWith(a, b, c, Object); // tslint:disable-line:no-any

export function reducer(
  state: { [k: string]: StructuredResource } = {},
  action: ResourceAction | ResourceSuccessAction | ResourceFailureAction
) {
  return produce(
    state,
    (draft: { [k: string]: { [k: string]: StructuredResource } }): void => {
      if (!action.type.startsWith('reresource/')) return;
      const resourceType = action.resourceType;
      const resourceId = action.payload.serviceParameters.id;
      const resourceUri = `${resourceType}.${resourceId}`;
      const resource = get(draft, resourceUri, { ...INITIAL_RESOURCE });
      set(draft, resourceUri, resource);

      switch (action.type) {
        case RESOURCE_GET:
          Object.assign(resource, {
            loading: true,
            initialized: true,
            error: null,
          });
          return;

        case RESOURCE_GET_SUCCESS:
          const successAction = action as ResourceSuccessAction;
          Object.assign(resource, {
            loading: false,
            cached: successAction.payload.resourceOptions.cached || false,
            data: successAction.payload.data,
            meta: successAction.payload.meta,
            error: null,
          });
          return;

        case RESOURCE_GET_FAILURE:
          const failAction = action as ResourceFailureAction;
          Object.assign(resource, {
            loading: false,
            data: null,
            error: failAction.payload.error,
          });
          return;
        case RESOURCE_DEL_SUCCESS:
          omit(draft, resourceUri);
          return;
        default:
          return;
      }
    }
  );
}
