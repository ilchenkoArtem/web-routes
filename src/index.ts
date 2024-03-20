import { RouteBase, Routes, RoutesConfig, RouteWithParams, RouteWithQuery, RouteWithQueryAndParams } from './types';

import { replaceParams, addQuery, mapRouteQueryToConfigQuery, mergeUrl } from './utils';

export type RouteTypes = RouteBase | RouteWithQuery<any> | RouteWithParams<any> | RouteWithQueryAndParams<any>;

export interface UrlOptions {
  query?: Record<string, string | number>;
  params?: Record<string, string | number>;
}

export const createRoutes = <T extends RoutesConfig>(config: T): Routes<T> => {
  const buildRoutes = (config: RoutesConfig, parentUrl: string = '/') => {
    let routes = {} as Record<string, RouteTypes>;

    Object.entries(config).forEach(([routeId, routeConfig]) => {
      let url: string = mergeUrl(parentUrl, routeConfig.url);

      routes[routeId] = {
        $url: (options: UrlOptions = {}) => {
          if (!options) return url;

          if (options.params) {
            url = replaceParams(routeConfig.url, options.params);
          }

          if (routeConfig.query && options.query) {
            const mappedQuery = mapRouteQueryToConfigQuery(options.query, routeConfig.query);
            url = addQuery(url, mappedQuery);
          }

          return url;
        },
        ...(routeConfig.query && {
          $query: routeConfig.query,
        }),
        ...(routeConfig.children && {
          ...buildRoutes(routeConfig.children, url),
        }),
      };
    });

    return routes;
  };

  return buildRoutes(config, '/') as Routes<T>;
};
