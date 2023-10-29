import { AutoFillRange } from './auto-fill-range';

const mockSelectedRange = {
  autoFill: jest.fn(),
};

const mockGetRange = jest.fn();

const createSheet = () => ({
  getRange: mockGetRange,
  AutoFillSeries: {
    DEFAULT_SERIES: 'DEFAULT_SERIES',
  },
});

describe('AutoFillRange', () => {
  describe('#call', () => {
    const subject = new AutoFillRange(createSheet());

    describe('when no selectedRange property is provided', () => {
      it('should throw an error', () => {
        expect(() => {
          subject.call(undefined, 'A1:A2');
        }).toThrow('AutoFillRange#call - no selectedRange property was provided');
      });
    });

    describe('when no fillRange property is provided', () => {
      const subject = new AutoFillRange(createSheet());

      it('should throw an error', () => {
        expect(() => {
          subject.call(mockSelectedRange, undefined);
        }).toThrow('AutoFillRange#call - no fillRange property was provided');
      });
    });

    describe('when all properties are provided', () => {
      beforeEach(() => {
        subject.call(mockSelectedRange, 'A1:A2');
      });

      it('should call sheet#getRange', () => {
        expect(mockGetRange).toHaveBeenCalledWith('A1:A2');
      });

      it('should call selectedRange#autoFill', () => {
        expect(mockSelectedRange.autoFill).toHaveBeenCalledWith(
          mockGetRange('A1:A2'),
          subject.sheet.AutoFillSeries.DEFAULT_SERIES,
        );
      });

      it('should call sheet#AutoFillSeries.DEFAULT_SERIES', () => {

      });
    });
  });
});
