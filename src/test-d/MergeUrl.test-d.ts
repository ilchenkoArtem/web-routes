import { MergeUrl } from '../types';
import { expectType } from 'tsd';

declare const test1: MergeUrl<'/', ''>;
declare const test2: MergeUrl<'', '/'>;
declare const test3: MergeUrl<'/', '/'>;
declare const test4: MergeUrl<'/', '/path'>;
declare const test5: MergeUrl<'/', '/path/:id'>;
declare const test6: MergeUrl<'/path', '/'>;
declare const test7: MergeUrl<'/path/:id', '/'>;
declare const test8: MergeUrl<'/path', '/path'>;
declare const test9: MergeUrl<'/path/:id1', '/path/:id2'>;
declare const test10: MergeUrl<'', ''>;

expectType<'/'>(test1);
expectType<'/'>(test2);
expectType<'/'>(test3);
expectType<'/path'>(test4);
expectType<'/path/:id'>(test5);
expectType<'/path'>(test6);
expectType<'/path/:id'>(test7);
expectType<'/path/path'>(test8);
expectType<'/path/:id1/path/:id2'>(test9);
expectType<'/'>(test10);
