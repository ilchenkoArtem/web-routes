import { GetUrlParams } from '../types';
import { expectNever, expectType } from 'tsd';

// 1. Single param
type CorrectParam = 'id';
declare const test1_1: GetUrlParams<'/:id'>;
declare const test1_2: GetUrlParams<'/:id/path'>;
declare const test1_3: GetUrlParams<'/path/:id'>;
declare const test1_4: GetUrlParams<'/path/:id/path'>;

expectType<CorrectParam>(test1_1);
expectType<CorrectParam>(test1_2);
expectType<CorrectParam>(test1_3);
expectType<CorrectParam>(test1_4);

// 2. Multiple params
type CorrectMultipleParams = 'id' | 'id2';
declare const test2_1: GetUrlParams<'/path/:id/path/:id2'>;
declare const test2_2: GetUrlParams<':id/path/:id2'>;
declare const test2_3: GetUrlParams<':id/:id2'>;
declare const test2_4: GetUrlParams<'/path/:id/:id2'>;

expectType<CorrectMultipleParams>(test2_1);
expectType<CorrectMultipleParams>(test2_2);
expectType<CorrectMultipleParams>(test2_3);
expectType<CorrectMultipleParams>(test2_4);

// 3. Without params
declare const test3_1: GetUrlParams<'/path'>;
declare const test3_2: GetUrlParams<'/path/path'>;
declare const test3_3: GetUrlParams<''>;

expectNever(test3_1);
expectNever(test3_2);
expectNever(test3_3);
