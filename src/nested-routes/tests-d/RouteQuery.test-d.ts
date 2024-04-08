// Object query config to route query config
import { expectType } from 'tsd';
import { RouteQuery } from '../types';

declare const test1: RouteQuery<{
  id: 'idQuery';
  id2: 'idQuery2';
}>;

expectType<{
  id?: string;
  id2?: string;
}>(test1);

// array query config to route query config

declare const test2: RouteQuery<['id', 'id2']>;

expectType<{
  id?: string;
  id2?: string;
}>(test2);
