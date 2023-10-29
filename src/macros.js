/** @OnlyCurrentDoc */

import { OnEditValidations } from './validations/on-edit-validations';
import { ClearRange } from './actions/clear-range';
import { populateCalculatedRow } from './actions/populate-calculated-row';

const restoreActiveCell = (e) => e.range.offset(1, 0).activate();

function onEdit(e) {
  const onEditValidations = new OnEditValidations(event);
  if (onEditValidations.shouldPopulateCells()) {
    populateCalculatedRow(e, restoreActiveCell);
  }

  if (onEditValidations.shouldDeleteCells()) {
    const row = e.range.getRow();
    const clearRange = new ClearRange(sheet);
    clearRange.call(`C${row}:G${row}`);
  }
}
