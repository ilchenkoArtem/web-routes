import { describe, expect, it } from 'vitest';
import { createRoutes } from './index';

describe('My test suite', () => {
  it('should create a route with a static URL', () => {
    const routes = createRoutes({
      home: {
        url: '/',
      },
    });

    expect(routes.home).toHaveProperty('$url');
    expect(routes.home).not.toHaveProperty('$query');
    expect(routes.home.$url()).toBe('/');
  });

  it('should create a route with a dynamic URL', () => {
    const routes = createRoutes({
      homeWithParams: {
        url: '/:id',
      },
    });

    expect(routes.homeWithParams).toHaveProperty('$url');
    expect(routes.homeWithParams).not.toHaveProperty('$query');
    expect(
      routes.homeWithParams.$url({
        params: {
          id: '1234',
        },
      }),
    ).toBe('/1234');
  });

  it('should create a route with a query', () => {
    const routes = createRoutes({
      homeWithQuery: {
        url: '/',
        query: {
          page: 'pageQuery',
          limit: 'limitQuery',
        },
      },
    });

    expect(routes.homeWithQuery).toHaveProperty('$url');
    expect(routes.homeWithQuery).toHaveProperty('$query');
    expect(
      routes.homeWithQuery.$url({
        query: {
          page: '1',
          limit: '10',
        },
      }),
    ).toBe('/?pageQuery=1&limitQuery=10');

    expect(routes.homeWithQuery.$query).toEqual({
      page: 'pageQuery',
      limit: 'limitQuery',
    });
  });

  it('should create a route with a query and params', () => {
    const routes = createRoutes({
      homeWithParamsAndQuery: {
        url: '/:id',
        query: {
          page: 'pageQuery',
          limit: 'limitQuery',
        },
      },
    });

    expect(routes.homeWithParamsAndQuery).toHaveProperty('$url');
    expect(routes.homeWithParamsAndQuery).toHaveProperty('$query');
    expect(
      routes.homeWithParamsAndQuery.$url({
        params: {
          id: '1234',
        },
        query: {
          page: '1',
          limit: '10',
        },
      }),
    ).toBe('/1234?pageQuery=1&limitQuery=10');

    expect(routes.homeWithParamsAndQuery.$query).toEqual({
      page: 'pageQuery',
      limit: 'limitQuery',
    });
  });
});
