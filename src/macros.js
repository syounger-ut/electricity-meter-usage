/** @OnlyCurrentDoc */

import { OnEditValidations } from './validations/on-edit-validations';
import { ClearRange } from './actions/clear-range';
import { populateCalculatedRow } from './meter-usage';

const restoreActiveCell = e => e.range.offset(1, 0).activate();

export const onEdit = (e) => {
  const onEditValidations = new OnEditValidations(e);
  if (onEditValidations.shouldPopulateCells()) {
    populateCalculatedRow(e, restoreActiveCell);
  }

  if (onEditValidations.shouldDeleteCells()) {
    const row = e.range.getRow();
    const clearRange = new ClearRange(e.source);
    clearRange.call(`C${row}:G${row}`);
  }
}
