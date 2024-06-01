import { afterEach, describe, expect, it, vitest as vi } from 'vitest';
import {
  replaceParams,
  addQuery,
  mapRouteQueryToConfigQuery,
  mergeUrl,
  configQueryToRouteQuery,
  addBackToQuery,
} from '../utils';

describe('utils', () => {
  describe('replaceParams', () => {
    const REPLACE_PARAMS_TEST_CASES = [
      {
        url: '/:id',
        params: { id: 1 },
        expected: '/1',
      },
      {
        url: '/path/:id',
        params: { id: 1 },
        expected: '/path/1',
      },
      {
        url: '/:id/path',
        params: { id: 1 },
        expected: '/1/path',
      },
      {
        url: '/:id/:name',
        params: { id: 1, name: 'test' },
        expected: '/1/test',
      },
      {
        url: '/path/:id/path',
        params: { id: 1 },
        expected: '/path/1/path',
      },
      {
        url: '/path/:id/path/:id2',
        params: { id: 1, id2: 2 },
        expected: '/path/1/path/2',
      },
      {
        url: '/path',
        params: {},
        expected: '/path',
      },
    ] as const;

    it.each(REPLACE_PARAMS_TEST_CASES)(
      '$url to $expected',
      ({ expected, params, url }) => {
        expect(replaceParams(url, params)).toEqual(expected);
      },
    );
  });

  describe('addQuery', () => {
    const ADD_QUERY_TEST_CASES = [
      {
        url: '/path',
        query: {},
        expected: '/path',
      },
      {
        url: '/path',
        query: { page: 1, limit: 10, name: 'test' },
        expected: '/path?page=1&limit=10&name=test',
      },
      {
        url: '/path',
        query: { page: 1, limit: 10 },
        expected: '/path?page=1&limit=10',
      },
      {
        url: '/path',
        query: { page: undefined, limit: null },
        expected: '/path',
      },
    ] as const;

    it.each(ADD_QUERY_TEST_CASES)(
      '$url to $expected',
      ({ expected, query, url }) => {
        expect(addQuery(url, query)).toEqual(expected);
      },
    );
  });

  describe('mapRouteQueryToConfigQuery', () => {
    it('should return empty object if set empty query', () => {
      expect(mapRouteQueryToConfigQuery({}, {})).toEqual({});
    });

    it('should map the query parameters to the route config', () => {
      const query = {
        page: '1',
        limit: '10',
      };

      const configQuery = {
        page: 'pageQuery',
        limit: 'limitQuery',
      };

      expect(mapRouteQueryToConfigQuery(query, configQuery)).toEqual({
        pageQuery: '1',
        limitQuery: '10',
      });
    });

    it('should ignore the query parameters that are not defined in the route config', () => {
      const query = {
        page: '1',
        limit: '10',
      };

      const configQuery = {
        page: 'pageQuery',
      };

      expect(mapRouteQueryToConfigQuery(query, configQuery)).toEqual({
        pageQuery: '1',
      });
    });
  });

  describe('mergeUrl', () => {
    const MERGE_URL_TEST_CASES = [
      {
        parentUrl: '',
        url: '',
        expected: '/',
      },
      {
        parentUrl: '/',
        url: '/',
        expected: '/',
      },
      {
        parentUrl: '',
        url: '/',
        expected: '/',
      },
      {
        parentUrl: '/',
        url: '',
        expected: '/',
      },
      {
        parentUrl: '',
        url: '',
        expected: '/',
      },
      {
        parentUrl: '/test/:id',
        url: '/child/:id3',
        expected: '/test/:id/child/:id3',
      },
      {
        parentUrl: '/test',
        url: '/child',
        expected: '/test/child',
      },
      {
        parentUrl: '/test/:id',
        url: '/child/:id3',
        expected: '/test/:id/child/:id3',
      },
      {
        parentUrl: '/test',
        url: '/child',
        expected: '/test/child',
      },
      {
        parentUrl: '/test/',
        url: '/child',
        expected: '/test/child',
      },
    ] as const;

    it.each(MERGE_URL_TEST_CASES)(
      '$parentUrl + $url to $expected',
      ({ expected, parentUrl, url }) => {
        expect(mergeUrl(parentUrl, url)).toEqual(expected);
      },
    );
  });

  describe('configQueryToRouteQuery', () => {
    it('should return an object with the query parameters as keys', () => {
      expect(configQueryToRouteQuery(['page', 'limit'])).toEqual({
        page: 'page',
        limit: 'limit',
      });
    });

    it('should return an empty object if the config query is not defined', () => {
      expect(configQueryToRouteQuery(undefined)).toEqual({});
    });

    it('should return an object with the query parameters as keys', () => {
      expect(configQueryToRouteQuery(['page', 'limit'])).toEqual({
        page: 'page',
        limit: 'limit',
      });
    });
  });

  describe('addBackToQuery', () => {
    const originalLocation = window;

    afterEach(() => {
      vi.resetAllMocks();
      Object.defineProperty(globalThis, 'window', {
        value: originalLocation,
      });
    });

    it('should add current address as backTo query', () => {
      vi.spyOn(window, 'location', 'get').mockReturnValue({
        ...window.location,
        pathname: '/mock-path',
      });

      expect(addBackToQuery('/test-url')).toBe(
        `/test-url?backTo=${encodeURIComponent('/mock-path')}`,
      );
    });

    it('should add current address and query as backTo query', () => {
      vi.spyOn(window, 'location', 'get').mockReturnValue({
        ...window.location,
        pathname: '/mock-path',
        search: '?query=1',
      });

      expect(addBackToQuery('/test-url')).toBe(
        `/test-url?backTo=${encodeURIComponent('/mock-path?query=1')}`,
      );
    });

    it('should not add backTo query if window is not defined', () => {
      Object.defineProperty(globalThis, 'window', {
        value: undefined,
      });

      expect(addBackToQuery('/test-url')).toBe('/test-url');
    });
  });
});
