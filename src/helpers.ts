import { get } from 'lodash';
import { StructuredResource } from './reducers/types';

/**
 * Get a resource from the store
 *
 * It works with single resource or lists, depending on
 * whether you sent and `id` or not
 */
export function getFrom(
  state: { resources: object },
  resource: string,
  id?: string | number
): StructuredResource {
  let uri;
  if (id) {
    id = id.toString();
    uri = `byId.${resource}.${id}`;
  } else {
    uri = `list.${resource}`;
  }

  return get(state.resources, uri, {
    loading: false,
    cached: false,
    initialized: false,
    data: null,
    meta: null,
    error: null,
  });
}
