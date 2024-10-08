import { RouteQuery, RouteWithQueryAndParams } from '../types';
import { expectType } from 'tsd';

declare const testConfig: RouteWithQueryAndParams<{
  url: '/path/:id/path1/:id2';
  query: {
    id: 'idQuery';
    id2: 'id2Query';
  };
}>;

type expectedRoute = {
  $url: (options: {
    query?: RouteQuery<Record<'id' | 'id2', string>>;
    params: Record<'id' | 'id2', string | number>;
    withBackTo?: boolean;
  }) => string;
  $query: {
    id: 'idQuery';
    id2: 'id2Query';
  };
};

expectType<expectedRoute>(testConfig);
