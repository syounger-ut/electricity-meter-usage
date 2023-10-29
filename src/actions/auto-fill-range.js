/**
 * AutoFillRange auto-fills a range of rows.
 */
export class AutoFillRange {
  /**
   * 
   * @param {GoogleAppScripts.Spreadsheet.Sheet} sheet The sheet to work with.
   */
  constructor(sheet) {
    this.sheet = sheet;
  }

  /**
   * 
   * @param {Object} selectedRange The selected range object to auto-fill from.
   * @param {String} fillRange The A1Notation of the cell range to auto-fill.
   * @returns {void}
   */
  call = (selectedRange, fillRange) =>  {
    if (!selectedRange) {
      throw new Error('AutoFillRange#call - no selectedRange property was provided');
    }

    if (!fillRange) {
      throw new Error('AutoFillRange#call - no fillRange property was provided');
    }

    selectedRange
      .autoFill(
        this.sheet.getRange(fillRange),
        this.sheet.AutoFillSeries.DEFAULT_SERIES
      );
  }
}
