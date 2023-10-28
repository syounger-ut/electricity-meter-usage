import { FindFirstEmptyRow } from './first-empty-row';

const mockValues = ['a', 'b', 'c', ''];
const mockGetValues = jest.fn(() => mockValues);
const mockGetRange = jest.fn(() => ({
  getValues: mockGetValues,
}));

const createSheet = () => ({
  getRange: mockGetRange,
});

describe('FirstEmptyRow', () => {
  describe('#call', () => {
    describe('when no column is provided', () => {
      const subject = new FindFirstEmptyRow(createSheet());
      it('should throw an error', () => {
        expect(() => subject.call()).toThrow('FirstEmptyRow#call - No column was provided');
      });
    });

    describe('when a column is provided', () => {
      const subject = new FindFirstEmptyRow(createSheet());
      let result;

      beforeEach(() => {
        result = subject.call('B');
      });

      it('should call sheet#getRange', () => {
        expect(mockGetRange).toHaveBeenCalled();
      });

      it('should call sheet range#getValues', () => {
        expect(mockGetValues).toHaveBeenCalled();
      });

      it('should return the empty row number', () => {
        expect(result).toEqual(4);
      });
    });
  });
});
