import produce from 'immer';
import { get, set } from 'lodash';
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
      const resourceList = get(draft, resourceType, { ...INITIAL_RESOURCE });
      set(draft, resourceType, resourceList);

      switch (action.type) {
        case RESOURCE_LIST:
          Object.assign(resourceList, {
            loading: true,
            cached: false,
            initialized: true,
            error: null,
          });
          if (!action.payload.resourceOptions.append) {
            resourceList.data = null;
          }
          return;

        case RESOURCE_LIST_SUCCESS:
          const successAction = action as ResourceSuccessAction;
          Object.assign(resourceList, {
            loading: false,
            cached: false,
            initialized: true,
            error: null,
            meta: successAction.payload.meta,
          });
          if (
            successAction.payload.resourceOptions.append &&
            Array.isArray(resourceList.data)
          ) {
            resourceList.data.push(...(successAction.payload.data as [object]));
          } else {
            resourceList.data = successAction.payload.data;
          }
          return;

        case RESOURCE_LIST_FAILURE:
          const failAction = action as ResourceFailureAction;
          Object.assign(resourceList, {
            loading: false,
            data: null,
            error: failAction.payload.error,
          });
          return;
        default:
          return;
      }
    }
  );
}
