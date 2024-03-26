import { describe, expect, it } from 'vitest';
import { createNestedRoutes } from '../index';

describe('createRoutes', () => {
  describe('simple routes', () => {
    it('should create a route with a static URL', () => {
      const routes = createNestedRoutes({
        home: {
          url: '/',
        },
      });

      expect(routes).toEqual({
        home: {
          $url: expect.any(Function),
        },
      });

      expect(routes.home.$url()).toBe('/');
    });
    it('should create a route with a static URL and a query', () => {
      const routes = createNestedRoutes({
        homeWithQuery: {
          url: '/',
          query: {
            page: 'pageQuery',
            limit: 'limitQuery',
          },
        },
      });

      expect(routes).toEqual({
        homeWithQuery: {
          $url: expect.any(Function),
          $query: {
            page: 'pageQuery',
            limit: 'limitQuery',
          },
        },
      });

      expect(
        routes.homeWithQuery.$url({
          query: {
            page: '1',
            limit: '10',
          },
        }),
      ).toBe('/?pageQuery=1&limitQuery=10');
    });
    it('should create a route with a static URL and a query array', () => {
      const routes = createNestedRoutes({
        homeWithQueryArray: {
          url: '/',
          query: ['pageQuery', 'limitQuery'],
        },
      });

      expect(routes).toEqual({
        homeWithQueryArray: {
          $url: expect.any(Function),
          $query: {
            pageQuery: 'pageQuery',
            limitQuery: 'limitQuery',
          },
        },
      });

      expect(
        routes.homeWithQueryArray.$url({
          query: {
            pageQuery: '1',
            limitQuery: '10',
          },
        }),
      ).toBe('/?pageQuery=1&limitQuery=10');
    });
    it('should create a route with a dynamic URL', () => {
      const routes = createNestedRoutes({
        homeWithParams: {
          url: '/:id',
        },
      });

      expect(routes).toEqual({
        homeWithParams: {
          $url: expect.any(Function),
        },
      });

      expect(
        routes.homeWithParams.$url({
          params: {
            id: '1234',
          },
        }),
      ).toBe('/1234');
    });
    it('should create a route with a dynamic URL and a query', () => {
      const routes = createNestedRoutes({
        homeWithParamsAndQuery: {
          url: '/:id',
          query: {
            page: 'pageQuery',
            limit: 'limitQuery',
          },
        },
      });

      expect(routes).toEqual({
        homeWithParamsAndQuery: {
          $url: expect.any(Function),
          $query: {
            page: 'pageQuery',
            limit: 'limitQuery',
          },
        },
      });

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
    });
    it('should create a route with a dynamic URL and a query array', () => {
      const routes = createNestedRoutes({
        homeWithParamsAndQueryArray: {
          url: '/:id',
          query: ['pageQuery', 'limitQuery'],
        },
      });

      expect(routes).toEqual({
        homeWithParamsAndQueryArray: {
          $url: expect.any(Function),
          $query: {
            pageQuery: 'pageQuery',
            limitQuery: 'limitQuery',
          },
        },
      });

      expect(
        routes.homeWithParamsAndQueryArray.$url({
          params: {
            id: '1234',
          },
          query: {
            pageQuery: '1',
            limitQuery: '10',
          },
        }),
      ).toBe('/1234?pageQuery=1&limitQuery=10');
    });
    it('should create routes with full example', () => {
      const routes = createNestedRoutes({
        base: {
          url: '/',
        },
        baseWithParam: {
          url: '/:id',
        },
        baseWithQuery: {
          url: '/',
          query: {
            page: 'flor3PageQuery',
            limit: 'flor3LimitQuery',
          },
        },
        baseWithQueryAndParam: {
          url: '/:id',
          query: {
            page: 'flor4PageQuery',
            limit: 'flor4LimitQuery',
          },
        },
      });

      expect(routes).toEqual({
        base: {
          $url: expect.any(Function),
        },
        baseWithParam: {
          $url: expect.any(Function),
        },
        baseWithQuery: {
          $url: expect.any(Function),
          $query: {
            page: 'flor3PageQuery',
            limit: 'flor3LimitQuery',
          },
        },
        baseWithQueryAndParam: {
          $url: expect.any(Function),
          $query: {
            page: 'flor4PageQuery',
            limit: 'flor4LimitQuery',
          },
        },
      });

      expect(routes.base.$url()).toBe('/');
      expect(routes.baseWithParam.$url({ params: { id: '1234' } })).toBe(
        '/1234',
      );
      expect(
        routes.baseWithQuery.$url({ query: { page: '1', limit: '10' } }),
      ).toBe('/?flor3PageQuery=1&flor3LimitQuery=10');
      expect(
        routes.baseWithQueryAndParam.$url({
          params: { id: '1234' },
          query: { page: '1', limit: '10' },
        }),
      ).toBe('/1234?flor4PageQuery=1&flor4LimitQuery=10');
    });
  });

  describe('nested routes', () => {
    describe('static parent URL', () => {
      it('children static URL', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/',
            children: {
              child: {
                url: '/child',
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            child: { $url: expect.any(Function) },
          },
        });

        expect(routes.home.$url()).toBe('/');
        expect(routes.home.child.$url()).toBe('/child');
      });
      it('children static URL and query', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/',
            children: {
              child: {
                url: '/child',
                query: {
                  page: 'pageQuery',
                  limit: 'limitQuery',
                },
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            child: {
              $url: expect.any(Function),
              $query: {
                page: 'pageQuery',
                limit: 'limitQuery',
              },
            },
          },
        });

        expect(routes.home.$url()).toBe('/');
        expect(
          routes.home.child.$url({
            query: {
              page: '1',
              limit: '10',
            },
          }),
        ).toBe('/child?pageQuery=1&limitQuery=10');
      });
      it('children dynamic URL', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/',
            children: {
              child: {
                url: '/:id',
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            child: { $url: expect.any(Function) },
          },
        });

        expect(routes.home.$url()).toBe('/');
        expect(routes.home.child.$url({ params: { id: '1234' } })).toBe(
          '/1234',
        );
      });
      it('children dynamic URL and query', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/',
            children: {
              child: {
                url: '/:id',
                query: {
                  page: 'pageQuery',
                  limit: 'limitQuery',
                },
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            child: {
              $url: expect.any(Function),
              $query: {
                page: 'pageQuery',
                limit: 'limitQuery',
              },
            },
          },
        });

        expect(routes.home.$url()).toBe('/');
        expect(
          routes.home.child.$url({
            params: { id: '1234' },
            query: { page: '1', limit: '10' },
          }),
        ).toBe('/1234?pageQuery=1&limitQuery=10');
      });
    });
    describe('static parent URL and query', () => {
      it('children static URL', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/',
            query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            children: {
              child: {
                url: '/child',
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            $query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            child: { $url: expect.any(Function) },
          },
        });

        expect(routes.home.$url()).toBe('/');
        expect(routes.home.child.$url()).toBe('/child');
      });
      it('children static URL and query', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/',
            query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            children: {
              child: {
                url: '/child',
                query: {
                  page: 'pageQuery',
                  limit: 'limitQuery',
                },
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            $query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            child: {
              $url: expect.any(Function),
              $query: {
                page: 'pageQuery',
                limit: 'limitQuery',
              },
            },
          },
        });

        expect(routes.home.$url()).toBe('/');
        expect(routes.home.child.$url()).toBe('/child');
      });
      it('children dynamic URL', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/',
            query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            children: {
              child: {
                url: '/:id2',
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            $query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            child: { $url: expect.any(Function) },
          },
        });

        expect(routes.home.$url()).toBe('/');
        expect(routes.home.child.$url({ params: { id2: '2' } })).toBe('/2');
      });
      it('children dynamic URL and query', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/',
            query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            children: {
              child: {
                url: '/:id2',
                query: {
                  page: 'pageQuery',
                  limit: 'limitQuery',
                },
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            $query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            child: {
              $url: expect.any(Function),
              $query: {
                page: 'pageQuery',
                limit: 'limitQuery',
              },
            },
          },
        });

        expect(routes.home.$url()).toBe('/');
        expect(
          routes.home.child.$url({
            params: { id2: '2' },
            query: { page: '1', limit: '10' },
          }),
        ).toBe('/2?pageQuery=1&limitQuery=10');
      });
    });
    describe('dynamic parent URL', () => {
      it('children static URL', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/:id1',
            children: {
              child: {
                url: '/child',
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            child: { $url: expect.any(Function) },
          },
        });

        expect(routes.home.$url({ params: { id1: '1234' } })).toBe('/1234');
        expect(
          routes.home.child.$url({
            params: {
              id1: '1234',
            },
          }),
        ).toBe('/1234/child');
      });
      it('children static URL and query', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/:id1',
            children: {
              child: {
                url: '/child',
                query: {
                  page: 'pageQuery',
                  limit: 'limitQuery',
                },
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            child: {
              $url: expect.any(Function),
              $query: {
                page: 'pageQuery',
                limit: 'limitQuery',
              },
            },
          },
        });

        expect(routes.home.$url({ params: { id1: '1234' } })).toBe('/1234');
        expect(
          routes.home.child.$url({
            params: { id1: '1234' },
            query: { page: '1', limit: '10' },
          }),
        ).toBe('/1234/child?pageQuery=1&limitQuery=10');
      });
      it('children dynamic URL', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/:id1',
            children: {
              child: {
                url: '/:id2',
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            child: { $url: expect.any(Function) },
          },
        });

        expect(routes.home.$url({ params: { id1: '1234' } })).toBe('/1234');
        expect(
          routes.home.child.$url({
            params: { id1: '1', id2: '2' },
          }),
        ).toBe('/1/2');
      });
      it('children dynamic URL and query', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/:id1',
            children: {
              child: {
                url: '/:id2',
                query: {
                  page: 'pageQuery',
                  limit: 'limitQuery',
                },
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            child: {
              $url: expect.any(Function),
              $query: {
                page: 'pageQuery',
                limit: 'limitQuery',
              },
            },
          },
        });

        expect(routes.home.$url({ params: { id1: '1234' } })).toBe('/1234');
        expect(
          routes.home.child.$url({
            params: { id1: '1', id2: '2' },
            query: { page: '1', limit: '10' },
          }),
        ).toBe('/1/2?pageQuery=1&limitQuery=10');
      });
    });
    describe('dynamic parent URL and query', () => {
      it('children static URL', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/:id1',
            query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            children: {
              child: {
                url: '/child',
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            $query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            child: { $url: expect.any(Function) },
          },
        });

        expect(routes.home.$url({ params: { id1: '1234' } })).toBe('/1234');
        expect(
          routes.home.child.$url({
            params: {
              id1: '1234',
            },
          }),
        ).toBe('/1234/child');
      });
      it('children static URL and query', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/:id1',
            query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            children: {
              child: {
                url: '/child',
                query: {
                  page: 'childrenPageQuery',
                  limit: 'childrenLimitQuery',
                },
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            $query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            child: {
              $url: expect.any(Function),
              $query: {
                page: 'childrenPageQuery',
                limit: 'childrenLimitQuery',
              },
            },
          },
        });

        expect(routes.home.$url({ params: { id1: '1234' } })).toBe('/1234');
        expect(routes.home.child.$url({ params: { id1: '1234' } })).toBe(
          '/1234/child',
        );
      });
      it('children dynamic URL', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/:id1',
            query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            children: {
              child: {
                url: '/:id2',
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            $query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            child: { $url: expect.any(Function) },
          },
        });

        expect(routes.home.$url({ params: { id1: '1234' } })).toBe('/1234');
        expect(
          routes.home.child.$url({
            params: { id1: '1', id2: '2' },
          }),
        ).toBe('/1/2');
      });
      it('children dynamic URL and query', () => {
        const routes = createNestedRoutes({
          home: {
            url: '/:id1',
            query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            children: {
              child: {
                url: '/:id2',
                query: {
                  page: 'pageQuery',
                  limit: 'limitQuery',
                },
              },
            },
          },
        });

        expect(routes).toEqual({
          home: {
            $url: expect.any(Function),
            $query: {
              page: 'pageQuery',
              limit: 'limitQuery',
            },
            child: {
              $url: expect.any(Function),
              $query: {
                page: 'pageQuery',
                limit: 'limitQuery',
              },
            },
          },
        });

        expect(routes.home.$url({ params: { id1: '1234' } })).toBe('/1234');
        expect(routes.home.$query).toEqual({
          page: 'pageQuery',
          limit: 'limitQuery',
        });
        expect(
          routes.home.child.$url({
            params: { id1: '1', id2: '2' },
            query: { page: '1', limit: '10' },
          }),
        ).toBe('/1/2?pageQuery=1&limitQuery=10');
        expect(routes.home.child.$query).toEqual({
          page: 'pageQuery',
          limit: 'limitQuery',
        });
      });
    });
  });
});
