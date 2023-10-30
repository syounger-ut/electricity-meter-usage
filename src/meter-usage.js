import { FindFirstEmptyRow } from './find/first-empty-row';
import { AutoFillRange } from './actions/auto-fill-range';
import { FillMeterReadingAverage } from './actions/fill-meter-reading-average';

export const populateCalculatedRow = (e, callback) => {
  const cell = e.range;
  const firstEmptyRow = new FindFirstEmptyRow(e.source).call('B');
  // If averaging previous empty cells
  if (!cell.offset(-1, 0).getValue()) {
    new FillMeterReadingAverage(e.source).call(
      'B',
      firstEmptyRow,
      cell.getRow()
    );

    const selectedRange = new SelectRange(e.source).call(
      `C${firstEmptyRow - 1}:G${firstEmptyRow - 1}`
    );
    const fillRange = `C${firstEmptyRow - 1}:G${cell.getRow()}`;
    new AutoFillRange(e.source).call(selectedRange, fillRange);
  // If filling only one row, no averaging above
  } else {
    const selectedRange = new SelectRange(e.source).call(
      `C${firstEmptyRow - 2}:G${firstEmptyRow - 2}`
    );
    const fillRange = `C${firstEmptyRow - 2}:G${firstEmptyRow - 1}`;
    console.log('fillRange: ', fillRange);
    new AutoFillRange(e.source).call(selectedRange, fillRange);
  }

  callback(e);
};
