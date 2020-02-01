import { createOpaqueAPI } from '../src/index';

type $Private = number;

describe('createOpaqueAPI', () => {
  const { toOpaque, fromOpaque, isOpaque } = createOpaqueAPI<'Thing', $Private>(
    'Thing',
  );

  describe('toOpaque', () => {
    it('should return an opaque', () => {
      const opaqueThing = toOpaque(2);

      expect(opaqueThing).toMatchSnapshot();
    });
  });

  describe('fromOpaque', () => {
    it('should return the private value', () => {
      const opaqueThing = toOpaque(2);
      const valueThing = fromOpaque(opaqueThing);

      expect(valueThing).toEqual(2);
    });
  });

  describe('isOpaque', () => {
    it('should return the private value', () => {
      expect(isOpaque(toOpaque(2))).toEqual(true);
      expect(isOpaque('dfhsajdlf')).toEqual(false);
    });
  });
});
