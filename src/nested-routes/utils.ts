import { RouteConfigQuery, RouteQuery } from './types';

/**
 * Replaces the parameters in the URL with the values from the params object.
 * @example
 * replaceParams('/path/:id', { id: 1 }) // '/path/1'
 */
export const replaceParams = (
  url: string,
  params: Record<string, string | number>,
) => {
  const splitUrl = url.split('/');

  const replacedUrl = splitUrl.map((part) => {
    if (part.startsWith(':')) {
      const paramName = part.slice(1); // Remove the colon from the match;
      return params[paramName].toString();
    }

    return part;
  });

  return replacedUrl.join('/');
};

/**
 * Adds the query parameters to the URL.
 * @example
 * addQuery('/path', { id: 1 }, { id: 'id' }) // '/path?id=1'
 */
export const addQuery = (
  url: string,
  query: Record<string, string | number | undefined | null>,
) => {
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
export const mapRouteQueryToConfigQuery = (
  query: RouteQuery,
  configQuery: Partial<Record<string, string>>,
) => {
  const entries = Object.entries(query);

  if (!entries.length) return {};

  return entries.reduce((acc, [key, value]) => {
    const queryName = configQuery[key];

    if (!queryName) {
      console.warn(
        `Query parameter "${key}" is not defined in the route config`,
      );
      return acc;
    }

    acc[queryName] = value;
    return acc;
  }, {} as RouteQuery);
};

/**
 * Merges the parent URL with the URL.
 * @example
 * mergeUrl('/test/:id', '/child/:id3') // '/test/:id/child/:id3'
 * mergeUrl('/test', '/child') // '/test/child'
 */
export const mergeUrl = (parentUrl: string, url: string) => {
  const normalizedParentUrl = removeFirstAndLastSlash(parentUrl);
  const normalizedUrl = removeFirstAndLastSlash(url);

  if (!normalizedParentUrl) return `/${normalizedUrl}`;
  if (!normalizedUrl) return `/${normalizedParentUrl}`;
  return `/${normalizedParentUrl}/${normalizedUrl}`;
};

export const removeFirstAndLastSlash = (str: string) => {
  return str.replace(/^\/|\/$/g, '');
};

export const configQueryToRouteQuery = (
  configQuery: RouteConfigQuery | undefined,
): RouteQuery => {
  if (Array.isArray(configQuery)) {
    return configQuery.reduce(
      (acc, key) => {
        acc[key] = key;
        return acc;
      },
      {} as Record<string, string>,
    );
  }

  return configQuery || ({} as Record<string, string>);
};

export const addBackToQuery = (url: string) => {
  if (typeof window === 'undefined') return url;

  return addQuery(url, {
    backTo: window.location.pathname + window.location.search,
  });
};
