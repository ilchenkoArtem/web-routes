import { expectNever, expectType } from 'tsd';
import { ExtractParamName } from 'src/nested-routes/types';

declare const test1: ExtractParamName<':id'>;
expectType<'id'>(test1);

declare const test2: ExtractParamName<'test'>;
expectNever(test2);
