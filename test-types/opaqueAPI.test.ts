import { expectAssignable, expectType } from 'tsd';

import { Opaque, createOpaqueAPI } from '../src/index';

// Testing createOpaqueAPI apis return types

type $Private = {
  truc: string;
};

const { toOpaque, fromOpaque, isOpaque } = createOpaqueAPI<'Thing', $Private>(
  'Thing',
);

const opaqueThing = toOpaque({ truc: 'toto' });

expectType<Opaque<'Thing'>>(opaqueThing);

const opaqueValue = fromOpaque(opaqueThing);

expectType<$Private>(opaqueValue);

const anything = 'totot';

if (isOpaque(anything)) {
  expectAssignable<Opaque<'Thing'>>(anything);
}
