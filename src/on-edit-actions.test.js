import { OnEditActions } from "./on-edit-actions";

const createEvent = (options = {}) => ({
  range: {
    getValue: () => options.value,
    getColumn: () => options.column,
  },
});


describe('OnEditActions', () => {
  describe('#shouldPopulateCells', () => {
    describe('when the cell selected is empty', () => {
      const subject = new OnEditActions(createEvent({ column: 2, value: '' }))

      it.only('should return false', () => {
        expect(subject.shouldPopulateCells()).toEqual(false);
      });
    });

    describe('when the cell selected is not empty', () => {
      describe('when the column is not the second row', () => {
        const subject = new OnEditActions(createEvent({ column: 3, value: 'B123:B123' }))

        it('should return false', () => {
          expect(subject.shouldPopulateCells()).toEqual(false);
        });
      });

      describe('when the column is the second column', () => {
        const subject = new OnEditActions(createEvent({ column: 2, value: 'B123:B123' }))

        it('should return true', () => {
          expect(subject.shouldPopulateCells()).toEqual(true);
        });
      });
    });
  });
});
