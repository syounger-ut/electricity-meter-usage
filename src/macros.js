/** @OnlyCurrentDoc */

function onEdit(e) {
  if (shouldPopulateCells(e)) {
    populateCalculatedRow();
  }

  if (shouldDeleteCells(e)) {
    deleteCalculatedRow(e);
  }
}
