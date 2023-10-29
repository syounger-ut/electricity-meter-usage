import { AutoFillRange } from './auto-fill-range';

export class FillMeterReadingAverage {
  constructor(sheet) {
    this.sheet = sheet;
    this.autoFillRange = new AutoFillRange(sheet);
  }

  /**
   * Auto-fill the average meter reading down the column.
   * @param {String} column The column to fill averages down.
   * @param {Integer} startRow The first empty row in the column to fill down.
   * @param {Integer} endRow The row number of the cell last edited.
   * @returns {void}
   */
  call = (column, startRow, endRow) => {
    if (!column) {
      throw new Error('FillMeterReadingAverage#call - The column property is missing');
    }

    if (!startRow) {
      throw new Error('FillMeterReadingAverage#call - The startRow property is missing');
    }

    if (!endRow) {
      throw new Error('FillMeterReadingAverage#call - The endRow property is missing');
    }

    const cell = this.sheet.getRange(`${column}${startRow}:${column}${startRow}`);
    
    const rowCount = endRow - startRow;
    
    const formula = `=(($${column}$${startRow - 1}-$${column}$${endRow})/${rowCount})+${column}${startRow - 1}`;
    cell.setFormula(formula);

    if (rowCount > 1) {
      const fillRange = `${column}${startRow}:${column}${endRow - 1}`;
      this.autoFillRange.call(cell, fillRange);
    }
  }
}
