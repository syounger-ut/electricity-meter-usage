/** @OnlyCurrentDoc */

import { OnEditActions } from "./on-edit-actions";

function onEdit(e) {
  const onEditActions = new OnEditActions(event);
  if (onEditActions.shouldPopulateCells()) {
    populateCalculatedRow();
  }

  if (onEditActions.shouldDeleteCells()) {
    deleteCalculatedRow(e);
  }
}
