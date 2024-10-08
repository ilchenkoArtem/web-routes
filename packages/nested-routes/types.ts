import type { SetRequired, Simplify, Split } from 'type-fest';

export type Url = `/${string}`;

/**
 * Transform url param to simple string
 * @example
 * ExtractParamName<":id"> // "id"
 */
export type ExtractParamName<T extends string> = T extends `:${infer Name}`
  ? Name
  : never;

/**
 * Get params from url
 * @example
 * GetUrlParams<"/:id"> // "id"
 * GetUrlParams<"/user/:id"> // "id"
 * GetUrlParams<"/user/:id/:id2"> // "id" | "id2"
 */
export type GetUrlParams<S extends string> = ExtractParamName<
  Split<S, '/'>[number]
>;

/**
 * Check if url has params
 * @example
 * IsUrlWithParams<"/:id"> // true
 * IsUrlWithParams<"/user/:id"> // true
 * IsUrlWithParams<"/user"> // false
 */
export type IsUrlWithParams<T extends string> =
  GetUrlParams<T> extends never ? false : true;

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

export type ExtendsUrlFromParentConfig<
  TFrom extends RouteConfig,
  T extends RouteConfig,
> = Simplify<
  {
    url: MergeUrl<TFrom['url'], T['url']> extends `/${string}`
      ? MergeUrl<TFrom['url'], T['url']>
      : never;
  } & (T extends RouteConfigWithQuery ? { query: T['query'] } : object) &
    (T extends RouteConfigWithChildren ? { children: T['children'] } : object)
>;

export type RouteConfigWithQuery = SetRequired<RouteConfig, 'query'>;
export type RouteConfigWithChildren = SetRequired<RouteConfig, 'children'>;
export type RouteConfigQuery = Record<string, string> | string[];
export type RouteConfigParams = Record<string, string>;

export interface RouteConfig<T extends Url = Url> {
  url: T;
  children?: RoutesConfig;
  query?: RouteConfigQuery;
  params?: RouteConfigParams;
  withBackTo?: boolean;
}

export type RoutesConfig = Record<string, RouteConfig>;

export type RouteQuery<T extends RouteConfigQuery = Record<string, string>> =
  T extends string[]
    ? {
        [Key in T[number]]?: string;
      }
    : {
        [Key in keyof T]?: string;
      };

export interface RouteBase {
  $url: (options?: { withBackTo?: boolean }) => string;
}

export interface RouteWithQuery<
  T extends RouteConfigWithQuery = RouteConfigWithQuery,
> {
  $url: (options?: {
    query?: RouteQuery<T['query']>;
    withBackTo?: boolean;
  }) => string;
  $query: T['query'];
}

export interface RouteWithParams<T extends RouteConfig = RouteConfig> {
  $url: (options: {
    params: Record<GetUrlParams<T['url']>, string | number>;
    withBackTo?: boolean;
  }) => string;
}

export interface RouteWithQueryAndParams<
  T extends RouteConfigWithQuery = RouteConfigWithQuery,
> {
  $url: (options: {
    query?: RouteQuery<T['query']>;
    params: Record<GetUrlParams<T['url']>, string | number>;
    withBackTo?: boolean;
  }) => string;
  $query: T['query'];
}

//prettier-ignore
export type Route<T extends RouteConfig, TParent extends RouteConfig = {url: "/"}> = T extends RouteConfig
  ? IsUrlWithParams<T['url'] | TParent['url']> extends true
    ? T extends RouteConfigWithQuery
      ? RouteWithQueryAndParams<ExtendsUrlFromParentConfig<TParent, T>>
      : RouteWithParams<ExtendsUrlFromParentConfig<TParent, T>>
    : T extends RouteConfigWithQuery
      ? RouteWithQuery<ExtendsUrlFromParentConfig<TParent, T>>
      : RouteBase
  : never;

export type Routes<
  T extends RoutesConfig,
  TParent extends RouteConfig = { url: '/' },
> = {
  [K in keyof T]: T[K] extends RouteConfigWithChildren
    ? Route<T[K], TParent> &
        Routes<T[K]['children'], ExtendsUrlFromParentConfig<TParent, T[K]>>
    : Route<T[K], TParent>;
};
