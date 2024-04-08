import { RouteWithParams } from '../types';
import { expectType } from 'tsd';

declare const testConfig: RouteWithParams<{
  url: '/path/:id/path1/:id2';
}>;

type expectedRoute = {
  $url: (options: { params: Record<'id' | 'id2', string | number> }) => string;
};

expectType<expectedRoute>(testConfig);
