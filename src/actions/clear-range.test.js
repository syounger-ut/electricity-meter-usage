import { ClearRange } from './clear-range';

const mockClearContent = jest.fn();
const mockGetRange = jest.fn(() => ({
  clearContent: mockClearContent,
}));

const createSheet = () => ({
  getRange: mockGetRange,
});

describe('ClearRange', () => {
  describe('#call', () => {
    describe('when no range propert is provided', () => {
      const subject = new ClearRange(createSheet());

      it('should throw an error', () => {
        expect(() => subject.call())
          .toThrowError('ClearRange#call - No range was provided');
      });
    });

    describe('when a range property is provided', () => {
      const subject = new ClearRange(createSheet());
  
      beforeEach(() => {
        subject.call('B1:G5');
      });
  
      it('should call sheet#getRange', () => {
        expect(mockGetRange).toHaveBeenCalled();
      });
  
      it('should call sheet range#clearContent', () => {
        expect(mockClearContent).toHaveBeenCalled();
      });
    });
  });
})
