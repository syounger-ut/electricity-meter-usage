import { FindFirstEmptyRow } from "./find/first-empty-row";
import { AutoFillRange } from "./actions/auto-fill-range";
import { FillMeterReadingAverage } from "./actions/fill-meter-reading-average";

export const populateCalculatedRow = (e, callback) => {
  const cell = e.range;
  const firstEmptyRow = new FindFirstEmptyRow(e.source).call('B');
  if (!cell.getValue()) {
    new FillMeterReadingAverage(e.source).call('B', firstEmptyRow, cell.getRow());
  }

  const selectedRange = new SelectRange(sheet).call(`C${firstEmptyRow - 1}:G${firstEmptyRow - 1}`);
  const fillRange = `C${firstEmptyRow - 1}:G${firstEmptyRow}`;
  new AutoFillRange(e.source).call(selectedRange, fillRange);

  callback(e);
};
