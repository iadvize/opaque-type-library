/**
 * The opaque type, of type `Key`, storing something private in `value`
 */
export type Opaque<Key extends string> = {
  /**
   * @internal
   */
  readonly __OPAQUE__: '__OPAQUE__';

  /**
   * Where the type of opaque is stored
   *
   * @internal
   */
  readonly __OPAQUE_KEY__: Key;

  /**
   * Where the private value is stored
   *
   * @internal
   */
  readonly value: unknown;
};

/**
 * Create the api for one specific opaque
 *
 * @example
```ts
  type $Car = { brand: string };

  const {
      toOpaque,
      fromOpaque,
      isOpaque,
  } = createOpaqueAPI<'CAR', $Car>('CAR');

  type Car = ReturnType<typeof toOpaque>
```
 *
 * @typeParam Key - The key used to distinguish this opaque type from other
 * @param     key - The key used to distinguish this opaque type from other
 * @typeParam $PrivateValue - The private type hidden in the opaque
 *
 * @returns API for Opaque<Key>
 */
export function createOpaqueAPI<Key extends string, $PrivateValue>(
  key: Key,
): {
  /**
   * Encapsulate a private, non-opaque, value in the opaque
   *
   * @example
```ts
  type $Car = { brand: string };

  const { toOpaque } = createOpaqueAPI<'CAR', $Car>('CAR');

  type Car = ReturnType<typeof toOpaque>

  function createCar(brand: string): Car {
      return toOpaque({ brand });
  }
```
   *
   * @param value - The value to hide in the opaque
   * @returns The opaque
   */
  toOpaque: (value: $PrivateValue) => Opaque<Key>;

  /**
   * Extract the private value from the opaque
   *
   * Should usually not be shared outside of where the private type is used
   *
   * @example
```ts
  type $Car = { brand: string };

  const { fromOpaque } = createOpaqueAPI<'CAR', $Car>('CAR');

  type Car = ReturnType<typeof toOpaque>

  function brand(car: Car) {
      const $car = fromOpaque(car);

      return $car.brand;
  }
```
   *
   * @param opaque - The opaque from which to extract the private value
   * @returns The private value hidden in the opaque
   */
  fromOpaque: (opaque: Opaque<Key>) => $PrivateValue;

  /**
   * Test if something is an opaque
   *
   * @example
```ts
  type $Car = { brand: string };
  const CarAPI = createOpaqueAPI<'CAR', $Car>('CAR');
  type Car = ReturnType<typeof toOpaque>

  type $Bike = { brand: string };
  const BikeAPI = createOpaqueAPI<'CAR', $Bike>('CAR');
  type Bike = ReturnType<typeof toOpaque>

  const myCar: Car = CarAPI.toOpaque({ brand: 'Peugeot' });
  const myBike: Bike = BikeAPI.toOpaque({ brand: 'Peugeot' });

  CarAPI.isOpaque(myCar); // true
  CarAPI.isOpaque(myBike); // false
```
   *
   * @param thing - Anything
   * @returns `true` if thing is an opaque with the corresponding key
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isOpaque: (thing: any) => thing is Opaque<Key>;
} {
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
  };
}
