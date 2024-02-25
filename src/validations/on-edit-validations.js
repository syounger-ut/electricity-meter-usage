const SHEET_NAME_DATA="data";

export class OnEditValidations {
  constructor(event) {
    this.event = event;
  }

  shouldPopulateCells(e) {
    if (!this.isDataSheet()) {
      return false;
    }

    const column = this.column();
    return !column.isEmpty && column.isSecondColumn;
  }

  shouldDeleteCells() {
    if (!this.isDataSheet()) {
      return false;
    }

    const column = this.column();
    return column.isEmpty && column.isSecondColumn;
  }

  column() {
    return {
      isEmpty: this.event.range.getValue() === '',
      isSecondColumn: this.event.range.getColumn() === 2,
    };
  }

  isDataSheet() {
    return this.event.range.getSheet().getName() === SHEET_NAME_DATA
  }
}
