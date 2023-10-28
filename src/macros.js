/** @OnlyCurrentDoc */

import { OnEditValidations } from "./validations/on-edit-validations";

function onEdit(e) {
  const onEditValidations = new OnEditValidations(event);
  if (onEditValidations.shouldPopulateCells()) {
    populateCalculatedRow();
  }

  if (onEditValidations.shouldDeleteCells()) {
    deleteCalculatedRow(e);
  }
}
