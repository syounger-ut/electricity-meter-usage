import { FindFirstEmptyRow } from "./find/first-empty-row";

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
  const firstEmptyRow = new FindFirstEmptyRow(SpreadsheetApp.getActive()).call('B');
  if (!lastCell.getValue()) {
    fillReadingGap(lastCell, firstEmptyRow);
  }

  new SelectRange(sheet).call(`C${firstEmptyRow - 1}:G${firstEmptyRow - 1}`);
  const fillRange = `C${firstEmptyRow - 1}:G${firstEmptyRow}`;
  copyLastFilledRowFormulas(fillRange);

  lastCell.offset(1, 0).activate();
};
