/**
 * SelectRange selects and activates a range in the sheet.
 */
export class SelectRange {
  /** 
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet The sheet to work with.
  */
  constructor(sheet) {
    this.sheet = sheet;
  }

/** 
 * Selects and activates a range in the sheet.
 * @param {string} range The range to be activated.
 * @returns {void}
*/
call = (range) => {
  if (!range) {
    throw new Error('SelectRange#call - no range property was provided');
  }

  const selectedRange = this.#getRange(range);
  selectedRange.activate();
}

/**
 * Gets the range from the specified range.
 * @param {string} range The range to be selected.
 * @returns {Object} The selected range.
 */
#getRange = (range) => {
  return this.sheet.getRange(range);
}
}
