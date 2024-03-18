import { SetRequired, Simplify, Split } from 'type-fest';

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
//prettier-ignore
export type MergeUrl<P extends string, S extends string> =
  P extends '' | "/"
    ? (S extends '' | "/" ? '/' : S)
    : `${P}${S}` extends `${infer Url}/`
      ? Url
      : `${P}${S}`;

export type ExtendsUrlFromParentConfig<TFrom extends RouteConfig, T extends RouteConfig> = Simplify<
  {
    url: MergeUrl<TFrom['url'], T['url']> extends `/${string}` ? MergeUrl<TFrom['url'], T['url']> : never;
  } & (T extends SetRequired<RouteConfig, 'query'> ? { query: T['query'] } : {}) &
    (T extends SetRequired<RouteConfig, 'children'> ? { children: T['children'] } : {})
>;

export type RouteConfigQuery = Record<string, string>;
export type RouteConfigParams = Record<string, string>;

export interface RouteConfig<T extends Url = Url> {
  url: T;
  children?: RoutesConfig;
  query?: RouteConfigQuery;
  params?: RouteConfigParams;
}

export type RoutesConfig = Record<string, RouteConfig>;

export type RouteQuery<T extends Record<string, string> = Record<string, string>> = {
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
export type Route<T extends RouteConfig, TParent extends RouteConfig = {url: "/"}> = T extends RouteConfig
  ? IsUrlWithParams<T['url']> extends true
    ? T extends SetRequired<RouteConfig, "query">
      ? RouteWithQueryAndParams<ExtendsUrlFromParentConfig<TParent, T>>
      : RouteWithParams<ExtendsUrlFromParentConfig<TParent, T>>
    : T extends SetRequired<RouteConfig, "query">
      ? RouteWithQuery<ExtendsUrlFromParentConfig<TParent, T>>
      : RouteBase
  : never;

export type Routes<T extends RoutesConfig, TParent extends RouteConfig = { url: '/' }> = {
  [K in keyof T]: T[K] extends SetRequired<RouteConfig, 'children'>
    ? Route<T[K], TParent> & Routes<T[K]['children'], ExtendsUrlFromParentConfig<TParent, T[K]>>
    : Route<T[K], TParent>;
};
