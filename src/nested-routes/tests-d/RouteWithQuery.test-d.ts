import { RouteQuery, RouteWithQuery } from '../types';
import { expectType } from 'tsd';

declare const testConfig: RouteWithQuery<{
  url: '/path/:id/path1/:id2';
  query: {
    id: 'idQuery';
    id2: 'id2Query';
  };
}>;

type expectedRoute = {
  $url: (options?: {
    query?: RouteQuery<Record<'id' | 'id2', string>>;
    withBackTo?: boolean;
  }) => string;
  $query: {
    id: 'idQuery';
    id2: 'id2Query';
  };
};

expectType<expectedRoute>(testConfig);
