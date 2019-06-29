import { get } from 'lodash';
import { StructuredResource } from './reducers/types';
import { INITIAL_RESOURCE } from './reducers/initial-resource';

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

  return get(state.resources, uri, { ...INITIAL_RESOURCE });
}

/**
 * Get one or more queries
 *
 * When there is more than one query, it combines they in a singe StructuredResource,
 * appending the data, and merging the metadata
 */
export function getQueries(
  state: { resources: object },
  resource: string,
  queries: object[] = [{}]
): StructuredResource {
  const res = get(state.resources, `query.${resource}`, {});
  return queries.reduce(
    (acc: StructuredResource, query: object) => {
      const queryKey = JSON.stringify(query);
      const currentQuery = get(res, queryKey, {
        ...INITIAL_RESOURCE,
      }) as StructuredResource;
      const data = (acc.data as []) || [];
      const newData = (currentQuery.data as []) || [];
      acc = { ...acc, ...currentQuery };
      acc.data = [...data, ...newData];
      return acc;
    },
    { ...INITIAL_RESOURCE }
  );
}
