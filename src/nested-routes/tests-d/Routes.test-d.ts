import {
  RouteBase,
  Routes,
  RouteWithParams,
  RouteWithQuery,
  RouteWithQueryAndParams,
} from 'src/nested-routes/types';
import { expectType } from 'tsd';

// Base Route
type testRouteConfig = {
  home: {
    url: '/';
  };
};
declare const routes: Routes<testRouteConfig>;
type expectedRoutes = {
  home: RouteBase;
};
expectType<expectedRoutes>(routes);

// Route with params
type testRouteConfigWithParams = {
  homeWithParams: {
    url: '/:id';
  };
};

declare const routesWithParams: Routes<testRouteConfigWithParams>;
type expectedRoutesWithParams = {
  homeWithParams: RouteWithParams<testRouteConfigWithParams['homeWithParams']>;
};
expectType<expectedRoutesWithParams>(routesWithParams);

// Route with query
type testRouteConfigWithQuery = {
  homeWithQuery: {
    url: '/';
    query: {
      id: string;
    };
  };
};
declare const routesWithQuery: Routes<testRouteConfigWithQuery>;
type expectedRoutesWithQuery = {
  homeWithQuery: RouteWithQuery<testRouteConfigWithQuery['homeWithQuery']>;
};
expectType<expectedRoutesWithQuery>(routesWithQuery);

// Route with params and query
type testRouteConfigWithParamsAndQuery = {
  homeWithParamsAndQuery: {
    url: '/:id';
    query: {
      id: string;
    };
  };
};
declare const routesWithParamsAndQuery: Routes<testRouteConfigWithParamsAndQuery>;
type expectedRoutesWithParamsAndQuery = {
  homeWithParamsAndQuery: RouteWithQueryAndParams<
    testRouteConfigWithParamsAndQuery['homeWithParamsAndQuery']
  >;
};
expectType<expectedRoutesWithParamsAndQuery>(routesWithParamsAndQuery);

// Base route with base children
type testRouteConfigWithChildren = {
  home: {
    url: '/';
    children: {
      child: {
        url: '/child';
      };
    };
  };
};

declare const routesWithChildren: Routes<testRouteConfigWithChildren>;
type expectedRoutesWithChildren = {
  home: RouteBase & {
    child: RouteBase;
  };
};
expectType<expectedRoutesWithChildren>(routesWithChildren);

// Route with params and base children
type testRouteConfigWithParamsAndChildren = {
  homeWithParams: {
    url: '/:id';
    children: {
      child: {
        url: '/child';
      };
    };
  };
};

declare const routesWithParamsAndChildren: Routes<testRouteConfigWithParamsAndChildren>;
type expectedRoutesWithParamsAndChildren = {
  homeWithParams: RouteWithParams<
    testRouteConfigWithParamsAndChildren['homeWithParams']
  > & {
    child: RouteWithParams<{
      url: '/:id/child';
    }>;
  };
};
expectType<expectedRoutesWithParamsAndChildren>(routesWithParamsAndChildren);

// Route with query and base children
type testRouteConfigWithQueryAndChildren = {
  homeWithQuery: {
    url: '/';
    query: {
      id: string;
    };
    children: {
      child: {
        url: '/child';
      };
    };
  };
};

declare const routesWithQueryAndChildren: Routes<testRouteConfigWithQueryAndChildren>;
type expectedRoutesWithQueryAndChildren = {
  homeWithQuery: RouteWithQuery<
    testRouteConfigWithQueryAndChildren['homeWithQuery']
  > & {
    child: RouteBase;
  };
};
expectType<expectedRoutesWithQueryAndChildren>(routesWithQueryAndChildren);

// Route with params, query and base children
type testRouteConfigWithParamsAndQueryAndChildren = {
  homeWithParamsAndQuery: {
    url: '/:id';
    query: {
      id: string;
    };
    children: {
      child: {
        url: '/child';
      };
    };
  };
};

declare const routesWithParamsAndQueryAndChildren: Routes<testRouteConfigWithParamsAndQueryAndChildren>;
type expectedRoutesWithParamsAndQueryAndChildren = {
  homeWithParamsAndQuery: RouteWithQueryAndParams<
    testRouteConfigWithParamsAndQueryAndChildren['homeWithParamsAndQuery']
  > & {
    child: RouteWithParams<{
      url: '/:id/child';
    }>;
  };
};

expectType<expectedRoutesWithParamsAndQueryAndChildren>(
  routesWithParamsAndQueryAndChildren,
);

// Base route with children params
type testRouteConfigWithChildrenWithParams = {
  home: {
    url: '/';
    children: {
      child: {
        url: '/:id';
      };
    };
  };
};

declare const routesWithChildrenWithParams: Routes<testRouteConfigWithChildrenWithParams>;
type expectedRoutesWithChildrenWithParams = {
  home: RouteBase & {
    child: RouteWithParams<{
      url: '/:id';
    }>;
  };
};
expectType<expectedRoutesWithChildrenWithParams>(routesWithChildrenWithParams);

// Extends parent params
type testRouteConfigWithParamsAndWithChildrenWithParams = {
  level1: {
    url: '/:id1';
    children: {
      level2: {
        url: '/:id2';
        children: {
          level3: {
            url: '/:id3';
          };
        };
      };
    };
  };
};

declare const routesWithParamsAndWithChildrenWithParams: Routes<testRouteConfigWithParamsAndWithChildrenWithParams>;
type expectedRoutesWithParamsAndWithChildrenWithParams = {
  level1: RouteWithParams<{
    url: '/:id1';
  }> & {
    level2: RouteWithParams<{
      url: '/:id1/:id2';
    }> & {
      level3: RouteWithParams<{
        url: '/:id1/:id2/:id3';
      }>;
    };
  };
};
expectType<expectedRoutesWithParamsAndWithChildrenWithParams>(
  routesWithParamsAndWithChildrenWithParams,
);
