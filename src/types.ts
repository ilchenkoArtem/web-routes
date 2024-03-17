import { SetRequired, Split } from 'type-fest';

export type Url = `/${string}`;

/**
 * Transform url param to simple string
 * @example
 * ExtractParamName<":id"> // "id"
 */
export type ExtractParamName<T extends string> = T extends `:${infer Name}` ? Name : never;

/**
 * Get params from url
 * @example
 * GetUrlParams<"/:id"> // "id"
 * GetUrlParams<"/user/:id"> // "id"
 * GetUrlParams<"/user/:id/:id2"> // "id" | "id2"
 */
export type GetUrlParams<S extends string> = ExtractParamName<Split<S, '/'>[number]>;

/**
 * Check if url has params
 * @example
 * IsUrlWithParams<"/:id"> // true
 * IsUrlWithParams<"/user/:id"> // true
 * IsUrlWithParams<"/user"> // false
 */
export type IsUrlWithParams<T extends string> = GetUrlParams<T> extends never ? false : true;

/**
 *  Merge two url strings
 *  @example
 *  MergeUrl<'/test/:id', '/child/:id3'> // '/test/:id/child/:id3'
 */
export type MergeUrl<T1 extends string, T2 extends string> = `${T1}${T2}`;

export interface RouteConfig<T extends Url = Url> {
  url: T;
  children?: RoutesConfig;
  query?: Record<string, string>;
  params?: Record<string, string>;
}

export type RoutesConfig = Record<string, RouteConfig>;

export type RouteQuery<T extends Record<string, string>> = {
  [K in keyof T]?: string | number;
};

export interface RouteBase {
  $url: () => string;
}

export interface RouteWithQuery<T extends SetRequired<RouteConfig, 'query'>> {
  $url: (options?: { query?: RouteQuery<T['query']> }) => string;
  $query: T['query'];
}

export interface RouteWithParams<T extends RouteConfig> {
  $url: (options: { params: Record<GetUrlParams<T['url']>, string | number> }) => string;
}

export interface RouteWithQueryAndParams<T extends SetRequired<RouteConfig, 'query'>> {
  $url: (options: {
    query?: RouteQuery<T['query']>;
    params: Record<GetUrlParams<T['url']>, string | number>;
  }) => string;
  $query: T['query'];
}

//prettier-ignore
export type Route<T extends RouteConfig> = T extends RouteConfig
  ? IsUrlWithParams<T['url']> extends true
    ? T extends SetRequired<RouteConfig, "query">
      ? RouteWithQueryAndParams<T>
      : RouteWithParams<T>
    : T extends SetRequired<RouteConfig, "query">
      ? RouteWithQuery<T>
      : RouteBase
  : never;

export type MergeRouteConfig<T extends RoutesConfig> = {
  [K in keyof T]: T[K] extends SetRequired<RouteConfig, 'children'>
    ? Route<T[K]> & Routes<T[K]['children']>
    : Route<T[K]>;
};

export type Routes<T extends RoutesConfig> = {
  [K in keyof T]: T[K] extends SetRequired<RouteConfig, 'children'>
    ? Route<T[K]> & Routes<T[K]['children']>
    : Route<T[K]>;
};
