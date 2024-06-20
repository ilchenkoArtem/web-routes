import {
  RouteBase,
  Routes,
  RoutesConfig,
  RouteWithParams,
  RouteWithQuery,
  RouteWithQueryAndParams,
} from './types';

import {
  replaceParams,
  addQuery,
  mapRouteQueryToConfigQuery,
  mergeUrl,
  configQueryToRouteQuery,
} from './utils';

export type RouteTypes =
  | RouteBase
  | RouteWithQuery
  | RouteWithParams
  | RouteWithQueryAndParams;

export interface UrlOptions {
  query?: Record<string, string>;
  params?: Record<string, string | number>;
  withBackTo?: boolean;
}

export const createRoutes = <T extends RoutesConfig>(config: T): Routes<T> => {
  const buildRoutes = (config: RoutesConfig, parentUrl: string = '/') => {
    const routes = {} as Record<string, RouteTypes>;

    Object.entries(config).forEach(([routeId, routeConfig]) => {
      let url: string = mergeUrl(parentUrl, routeConfig.url);
      const configQueryObject = configQueryToRouteQuery(routeConfig.query);

      routes[routeId] = {
        $url: (options: UrlOptions = {}) => {
          if (!options) return url;

          if (options.params) {
            url = replaceParams(url, options.params);
          }

          if (routeConfig.query && options.query) {
            const mappedQuery = mapRouteQueryToConfigQuery(
              options.query,
              configQueryObject,
            );
            url = addQuery(url, mappedQuery);
          }

          const withBackTo = options.withBackTo ?? !!routeConfig.withBackTo;
          if (withBackTo && !!window) {
            url = addQuery(url, {
              backTo: window.location.pathname + window.location.search,
            });
          }

          return url;
        },
        ...(routeConfig.query && {
          $query: configQueryObject,
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
