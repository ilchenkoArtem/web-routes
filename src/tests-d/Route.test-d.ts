import { Route, RouteBase, RouteWithParams, RouteWithQuery, RouteWithQueryAndParams } from '../types';
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
type CorrectRouteWithParamsAndQuery = RouteWithQueryAndParams<paramsAndQueryConfig>;
expectType<CorrectRouteWithParamsAndQuery>(routeWithParamsAndQueryTest);
