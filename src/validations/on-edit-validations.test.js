import { OnEditValidations } from "./on-edit-validations";

const createEvent = (options = {}) => ({
  range: {
    getValue: () => options.value,
    getColumn: () => options.column,
    getSheet: () => ({
      getName: () => options.sheetName,
    }),
  },
});


describe('OnEditValidations', () => {
  describe('#shouldPopulateCells', () => {
    describe('when the sheet is no the required one', () => {
      const sheetName = 'wrong-name';

      const subject = new OnEditValidations(createEvent({ column: 2, value: '', sheetName }))

      it('should return false', () => {
        expect(subject.shouldPopulateCells()).toEqual(false);
      });
    });

    describe('when the sheet is the required one', () => {
      const sheetName = 'data';

      describe('when the cell selected is empty', () => {
        const subject = new OnEditValidations(createEvent({ column: 2, value: '', sheetName }))

        it('should return false', () => {
          expect(subject.shouldPopulateCells()).toEqual(false);
        });
      });

      describe('when the cell selected is not empty', () => {
        describe('when the column is not the second row', () => {
          const subject = new OnEditValidations(createEvent({ column: 3, value: 'B123:B123', sheetName }))

          it('should return false', () => {
            expect(subject.shouldPopulateCells()).toEqual(false);
          });
        });

        describe('when the column is the second column', () => {
          const subject = new OnEditValidations(createEvent({ column: 2, value: 'B123:B123', sheetName }))

          it('should return true', () => {
            expect(subject.shouldPopulateCells()).toEqual(true);
          });
        });
      });
    });
  });

  describe('#shouldDeleteCells', () => {
    describe('when the sheet is no the required one', () => {
      const sheetName = 'wrong-name';

      const subject = new OnEditValidations(createEvent({ column: 2, value: '', sheetName }))

      it('should return false', () => {
        expect(subject.shouldPopulateCells()).toEqual(false);
      });
    });

    describe('when the sheet is the required one', () => {
      const sheetName = 'data';

      describe('when the cell selected is empty', () => {
        const subject = new OnEditValidations(createEvent({ column: 2, value: '', sheetName }))

        it('should return true', () => {
          expect(subject.shouldDeleteCells()).toEqual(true);
        });
      });

      describe('when the cell selected is not empty', () => {
        describe('when the column is not the second row', () => {
          const subject = new OnEditValidations(createEvent({ column: 3, value: 'B123:B123', sheetName }))

          it('should return false', () => {
            expect(subject.shouldDeleteCells()).toEqual(false);
          });
        });

        describe('when the column is the second column', () => {
          const subject = new OnEditValidations(createEvent({ column: 2, value: 'B123:B123', sheetName }))

          it('should return true', () => {
            expect(subject.shouldDeleteCells()).toEqual(false);
          });
        });
      });
    });
  });
});
