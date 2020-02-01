import { hello } from './index';

describe('index', () => {
  describe('hello', () => {
    it('should return hello', () => {
      expect(hello()).toEqual('hello world');
    });
  });
});
