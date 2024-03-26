import { expectType } from 'tsd';
import { IsUrlWithParams } from 'src/nested-routes/types';

// 1. Positive cases:
declare const test1_1: IsUrlWithParams<'/:id'>;
declare const test1_2: IsUrlWithParams<'/:id/path'>;
declare const test1_3: IsUrlWithParams<'/path/:id'>;
declare const test1_4: IsUrlWithParams<'/path/:id/path'>;
declare const test1_5: IsUrlWithParams<'/path/:id/path/:id2'>;

expectType<true>(test1_1);
expectType<true>(test1_2);
expectType<true>(test1_3);
expectType<true>(test1_4);
expectType<true>(test1_5);

// 2. Negative cases:
declare const test2_1: IsUrlWithParams<'/path'>;
declare const test2_2: IsUrlWithParams<'/path/path'>;
declare const test2_3: IsUrlWithParams<''>;

expectType<false>(test2_1);
expectType<false>(test2_2);
expectType<false>(test2_3);
