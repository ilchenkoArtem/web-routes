import {
  RouteBase,
  RouteConfigQuery,
  Routes,
  RoutesConfig,
  RouteWithParams,
  RouteWithQuery,
  RouteWithQueryAndParams,
} from './types';

import { replaceParams, addQuery, mapRouteQueryToConfigQuery } from './utils';

export type RouteTypes = RouteBase | RouteWithQuery<any> | RouteWithParams<any> | RouteWithQueryAndParams<any>;

export interface UrlOptions {
  query?: Record<string, string | number>;
  params?: Record<string, string | number>;
}

export const createRoutes = <T extends RoutesConfig>(config: T): Routes<T> => {
  let routes = {} as Record<string, RouteTypes>;

  Object.entries(config).forEach(([routeId, routeConfig]) => {
    // Directly assign to routes[routeId] instead of replacing the routes object
    routes[routeId] = {
      $url: (options: UrlOptions = {}) => {
        let url: string = routeConfig.url;

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
    };
  });

  return routes as Routes<T>;
};
