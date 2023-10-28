/**
 * Clears the content of a range.
 */
export class ClearRange {
  /**
  * @param sheet {SpreadsheetApp} The AppScripts Google Sheet to work with
  */
 constructor(sheet) {
   this.sheet = sheet;
  }

  /**
   * Clears the content of the range provided.
   * @param {String} range - The range to be selected.
   */
  call = (rangeA1Notation) => {
    if (!rangeA1Notation) {
      throw new Error('ClearRange#call - No range was provided');
    }

    const range = this.#getRange(rangeA1Notation);
    range.clearContent();
  }

  /**
   * Selects a cell range.
   * @param {String} range - The range to be selected.
   */
  #getRange = (range) => {
    return this.sheet.getRange(range);
  }
}
