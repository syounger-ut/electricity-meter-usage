/*
 * Find the first empty row from top to bottom
 * @return Integer
 */
const getFirstEmptyRow_ = () => {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var column = sheet.getRange('C:C');
  var values = column.getValues();
  var ct = 0;
  while (values[ct] && values[ct][0] != '') {
    ct++;
  }
  return ct + 1;
};

/*
 * Select the last filled row of populated values
 * @return void
 */
const selectRow = rowNumber => {
  const sheet = SpreadsheetApp.getActive();
  const rangeToSelect = `C${rowNumber}:G${rowNumber}`;
  sheet.getRange(rangeToSelect).activate();
};

/*
 * Autofill the selected row columns down to the target row
 * @return void
 */
const copyLastFilledRowFormulas = fillRange => {
  const sheet = SpreadsheetApp.getActive();
  sheet
    .getActiveRange()
    .autoFill(
      sheet.getRange(fillRange),
      SpreadsheetApp.AutoFillSeries.DEFAULT_SERIES
    );
};

const findLastCell = () => {
  return SpreadsheetApp.getActiveSpreadsheet().getCurrentCell();
};

const staticCellReference = cell => {
  const cellA1Notation = cell.getA1Notation();
  const cellReferenceStatic = cellA1Notation.split('');
  cellReferenceStatic.unshift('$');
  cellReferenceStatic.splice(2, 0, '$');
  return cellReferenceStatic.join('');
};

/*
 * TODO. Trying to get the forumula to autofill down. Not currently working
 */
const fillReadingGap = (lastCell, firstEmptyRowNo) => {
  // What is the range difference between the first and last cell
  // Expect 8 - correct
  const rangeDiff = lastCell.getRow() - firstEmptyRowNo;

  // What is the first cell to auto-fill from
  // Expect B602 - correct
  const lastFilledCell = lastCell.offset((rangeDiff + 1) * -1, 0);

  // What is the first empty cell
  // Expect B603 - correct
  const firstEmptyCell = lastFilledCell.offset(1, 0);

  // What is the text reference of the first and last cells
  // Expect B602 - correct
  const startCell = lastFilledCell.getA1Notation();
  // Expected $B$602 = correct
  const startCellFixed = staticCellReference(lastFilledCell);
  // Expected $B$611 - correct
  const endCell = staticCellReference(lastCell);

  // What is the formula to copy down from the first to last cell
  // Expected formula = (($B$611-$B$602)/8)+B602 - correct
  firstEmptyCell.setFormula(
    `=((${endCell}-${startCellFixed})/${rangeDiff})+${startCell}`
  );

  // Copy the formula down
  // 603
  console.log('lastFilledRowCell: ', firstEmptyCell.getRow());
  // 7
  console.log('rangeDiff: ', rangeDiff - 1);
  firstEmptyCell.activate();
  const fillRange = `B${firstEmptyCell.getRow()}:B${
    firstEmptyCell.getRow() + rangeDiff - 1
  }`;
  copyLastFilledRowFormulas(fillRange);
};

const populateCalculatedRow = () => {
  const lastCell = findLastCell();
  const firstEmptyRowNo = getFirstEmptyRow_();
  if (!lastCell.getValue()) {
    fillReadingGap(lastCell, firstEmptyRowNo);
  }

  selectRow(firstEmptyRowNo - 1);
  const fillRange = `C${firstEmptyRowNo - 1}:G${firstEmptyRowNo}`;
  copyLastFilledRowFormulas(fillRange);

  lastCell.offset(1, 0).activate();
};
