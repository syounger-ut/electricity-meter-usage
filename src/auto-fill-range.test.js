import { AutoFillRange } from './auto-fill-range';

describe('AutoFillRange', () => {
  const service = new AutoFillRange('B', 'G', 1, 5);

  describe('#fillRange', () => {
    it('should return a range', () => {
      expect(service.fillRange()).toEqual('B1:G5');
    });
  });
});
