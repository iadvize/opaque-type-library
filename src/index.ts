export type Opaque<K extends string> = {
  readonly __OPAQUE__: '__OPAQUE__';
  readonly __OPAQUE_KEY__: K;
  readonly value: unknown;
};

export function createOpaqueAPI<Key extends string, $PrivateValue>(key: Key) {
  type LocalOpaque = Opaque<Key>;

  return {
    toOpaque(value: $PrivateValue): LocalOpaque {
      return {
        __OPAQUE__: '__OPAQUE__',
        __OPAQUE_KEY__: key,
        value,
      };
    },

    fromOpaque(opaque: LocalOpaque): $PrivateValue {
      // we force the return type here, we're sure this is $PrivateValue
      return opaque.value as $PrivateValue;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isOpaque(thing: any): thing is LocalOpaque {
      // eslint-disable-next-line no-underscore-dangle
      return thing.__OPAQUE__ === '__OPAQUE__' && thing.__OPAQUE_KEY__ === key;
    },
  }
}
