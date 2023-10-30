import { FillMeterReadingAverage } from './fill-meter-reading-average';

const mockAutoFillRangeCall = jest.fn();

jest.mock('./auto-fill-range', () => ({
  AutoFillRange: jest.fn().mockImplementation(() => ({
    call: mockAutoFillRangeCall,
  })),
}));

const mockSetFormula = jest.fn();

const mockCell = jest.fn(() => ({
  setFormula: mockSetFormula,
}));

const createSheet = () => ({
  getRange: mockCell,
});

describe('FillMeterReadingAverage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('#call', () => {
    const subject = new FillMeterReadingAverage(createSheet());

    describe('when the column property is missing', () => {
      it('should throw an error', () => {
        expect(() => subject.call(undefined, 5, 10)).toThrowError('FillMeterReadingAverage#call - The column property is missing');
      });
    });

    describe('when the startRow property is missing', () => {
      it('should throw an error', () => {
        expect(() => subject.call('A', undefined, 10)).toThrowError('FillMeterReadingAverage#call - The startRow property is missing');
      });
    });

    describe('when the endRow property is missing', () => {
      it('should throw an error', () => {
        expect(() => subject.call('A', 5, undefined)).toThrowError('FillMeterReadingAverage#call - The endRow property is missing');
      });
    });

    describe('when the properties are present', () => {      
      it('should call sheet#getRange', () => {
        subject.call('A', 5, 10);
        expect(mockCell).toHaveBeenCalledWith('A5:A5');
      });
  
      it('should call range#setFormula', () => {
        subject.call('A', 5, 10);
        expect(mockSetFormula).toHaveBeenCalledWith('=(($A$10-$A$4)/4)+A4');
      });

      describe('when the rowCount is greater than one', () => {
        it('should the autoFillRange service', () => {
          subject.call('A', 5, 10);
          expect(mockAutoFillRangeCall).toHaveBeenCalledWith(mockCell(), 'A5:A9');
        });
      });

      describe('when the rowCount is one', () => {
        it('should not call the autoFillRange service', () => {
          subject.call('A', 5, 6);
          expect(mockAutoFillRangeCall).not.toHaveBeenCalled();
        });
      });
    });
  });
});
