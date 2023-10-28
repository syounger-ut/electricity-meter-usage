import { SelectRange } from './select-range';

const mockActivate = jest.fn();
const mockGetRange = jest.fn(() => ({ 
  activate: mockActivate,
}));

const createSheet = () => ({
  getRange: mockGetRange,
});

describe('SelectRange', () => {
  describe('#call', () => {
    describe('when no range is provided', () => {
      const subject = new SelectRange(createSheet());

      it('should throw an error', () => {
        expect(() => subject.call()).toThrow('SelectRange#call - no range property was provided');
      });
    });

    describe('when a range is provided', () => {
      const subject = new SelectRange(createSheet());

      beforeEach(() => {
        subject.call('B1:G2');
      });

      it('should call sheet#getRange', () => {
        expect(mockGetRange).toHaveBeenCalledWith('B1:G2');
      });

      it('should call range#activate', () => {
        expect(mockActivate).toHaveBeenCalled();
      });
    });
  });
});
