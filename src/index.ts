import { Routes, RoutesConfig } from './types';

const CONFIG = {
  home: {
    url: '/',
  },
  homeWithParams: {
    url: '/:id',
  },
  homeWithMoreParams: {
    url: '/test/:id/:name',
  },
  homeWithQuery: {
    url: '/',
    query: {
      page: 'pageQuery',
      limit: 'limitQuery',
    },
  },
  level1: {
    url: '/:id1',
    children: {
      level2: {
        url: '/level1/:id2',
        children: {
          level3: {
            url: '/level1/:id3',
          },
        },
      },
    },
  },
} satisfies RoutesConfig;

const routes = {} as Routes<typeof CONFIG>;

routes.home.$url();
routes.homeWithMoreParams.$url({ params: { id: 1, name: 'test' } });
routes.homeWithQuery.$url({ query: { limit: 10, page: 1 } });
routes.level1.level2.level3.$url({
  params: {
    id1: 1,
    id2: 2,
    id3: 3,
  },
});
