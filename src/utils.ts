import { RouteConfigQuery, RouteQuery } from './types';

/**
 * Replaces the parameters in the URL with the values from the params object.
 * @example
 * replaceParams('/path/:id', { id: 1 }) // '/path/1'
 */
export const replaceParams = (url: string, params: Record<string, string | number>) => {
  return url.replace(/:\w+/g, (match) => {
    const paramName = match.slice(1); // Remove the colon from the match
    return params[paramName].toString();
  });
};

/**
 * Adds the query parameters to the URL.
 * @example
 * addQuery('/path', { id: 1 }, { id: 'id' }) // '/path?id=1'
 */
export const addQuery = (url: string, query: Record<string, string | number | undefined | null>) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    searchParams.set(key, value.toString());
  }

  return searchParams.size ? `${url}?${searchParams.toString()}` : url;
};

/**
 * Maps the query parameters to the route config.
 * @example
 * mapRouteQueryToConfigQuery({ id: 1 }, { id: 'id-query' }) // { 'id-query': 1 }
 *
 */
export const mapRouteQueryToConfigQuery = (query: RouteQuery, configQuery: RouteConfigQuery) => {
  const entries = Object.entries(query);

  if (!entries.length) return {};

  return entries.reduce((acc, [key, value]) => {
    const queryName = configQuery[key];

    if (!queryName) {
      console.warn(`Query parameter "${key}" is not defined in the route config`);
      return acc;
    }

    acc[queryName] = value;
    return acc;
  }, {} as RouteQuery);
};
