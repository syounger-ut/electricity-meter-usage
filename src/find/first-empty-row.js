/**
 * Selects the first empty row in a column.
 */
export class FindFirstEmptyRow {
  /**
   * @param sheet {SpreadsheetApp} The AppScripts Google Sheet to work with.
   */
  constructor(sheet) {
    this.sheet = sheet;
  }

  /** 
   * @param {String} column - The column to search.
   * @return {Number} The row number of the first empty row.
  */
  call = (column) => {
    if (!column) {
      throw new Error('FirstEmptyRow#call - No column was provided');
    }

    var range = this.#getRange(column);
    var values = range.getValues();
    var row = 0;
    while (values[row] && values[row][0] != '') {
      row++;
    }
    return row + 1;
  };

    /**
   * Selects a cell range.
   * @param {String} column - The column to be selected.
   */
    #getRange = (column) => {
      return this.sheet.getRange(`${column}:${column}`);
    }
}
