import {
  Route,
  RouteBase,
  RouteWithParams,
  RouteWithQuery,
  RouteWithQueryAndParams,
} from '../types';
import { expectType } from 'tsd';

// Route Base
declare const routeBaseTest: Route<{
  url: '/path';
}>;
expectType<RouteBase>(routeBaseTest);

// Route with params
type paramsConfig = {
  url: '/path/:id';
};

declare const routeWithParamsTest: Route<paramsConfig>;
type CorrectRouteWithParams = RouteWithParams<paramsConfig>;
expectType<CorrectRouteWithParams>(routeWithParamsTest);

// Route with query
type queryConfig = {
  url: '/path';
  query: {
    id: string;
  };
};

declare const routeWithQueryTest: Route<queryConfig>;
type CorrectRouteWithQuery = RouteWithQuery<queryConfig>;
expectType<CorrectRouteWithQuery>(routeWithQueryTest);

// Route with params and query
type paramsAndQueryConfig = {
  url: '/path/:id';
  query: {
    id: string;
  };
};

declare const routeWithParamsAndQueryTest: Route<paramsAndQueryConfig>;
type CorrectRouteWithParamsAndQuery =
  RouteWithQueryAndParams<paramsAndQueryConfig>;
expectType<CorrectRouteWithParamsAndQuery>(routeWithParamsAndQueryTest);

// Base route with parent base route
declare const routeWithParentBaseTest: Route<
  {
    url: '/child';
  },
  {
    url: '/';
  }
>;

expectType<RouteBase>(routeWithParentBaseTest);

// Base route with parent dynamic route
declare const baseRouteWithParentDynamicRouteTest: Route<
  {
    url: '/child';
  },
  {
    url: '/:id';
  }
>;

expectType<
  RouteWithParams<{
    url: '/:id/child';
  }>
>(baseRouteWithParentDynamicRouteTest);

// Dynamic route with parent base route
declare const dynamicRouteWithParentBaseTest: Route<
  {
    url: '/:id';
  },
  {
    url: '/';
  }
>;

expectType<RouteWithParams<{ url: '/:id' }>>(dynamicRouteWithParentBaseTest);

// Dynamic route with parent dynamic route
declare const dynamicRouteWithParentDynamicRouteTest: Route<
  {
    url: '/:childId';
  },
  {
    url: '/:parentId';
  }
>;

expectType<RouteWithParams<{ url: '/:parentId/:childId' }>>(
  dynamicRouteWithParentDynamicRouteTest,
);

//Dynamic route without parent
declare const dynamicRouteWithoutParentTest: Route<{
  url: '/:id';
}>;

expectType<RouteWithParams<{ url: '/:id' }>>(dynamicRouteWithoutParentTest);

// Base route without parent
declare const baseRouteWithoutParentTest: Route<{
  url: '/';
}>;

expectType<RouteBase>(baseRouteWithoutParentTest);
