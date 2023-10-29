import { FindFirstEmptyRow } from "./find/first-empty-row";
import { AutoFillRange } from "./actions/auto-fill-range";

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
  firstEmptyCell.activate();
  const fillRange = `B${firstEmptyCell.getRow()}:B${
    firstEmptyCell.getRow() + rangeDiff - 1
  }`;
  new AutoFillRange(SpreadSheetApp.getActive()).call(firstEmptyCell, fillRange);
};

export const populateCalculatedRow = (e, callback) => {
  const cell = e.range;
  const firstEmptyRow = new FindFirstEmptyRow(e.source).call('B');
  if (!cell.getValue()) {
    fillReadingGap(cell, firstEmptyRow);
  }

  const selectedRange = new SelectRange(sheet).call(`C${firstEmptyRow - 1}:G${firstEmptyRow - 1}`);
  const fillRange = `C${firstEmptyRow - 1}:G${firstEmptyRow}`;
  new AutoFillRange(e.source).call(selectedRange, fillRange);

  callback(e);
};
