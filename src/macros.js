/** @OnlyCurrentDoc */

import { OnEditValidations } from './validations/on-edit-validations';
import { ClearRange } from './actions/clear-range';

function onEdit(e) {
  const onEditValidations = new OnEditValidations(event);
  if (onEditValidations.shouldPopulateCells()) {
    populateCalculatedRow();
  }

  if (onEditValidations.shouldDeleteCells()) {
    const row = e.range.getRow();
    const clearRange = new ClearRange(sheet);
    clearRange.call(`C${row}:G${row}`);
  }
}
