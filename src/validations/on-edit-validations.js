export class OnEditValidations {
  constructor(event) {
    this.event = event;
  }

  shouldPopulateCells() {
    const column = this.#column();
    return !column.isEmpty && column.isSecondColumn;
  }

  shouldDeleteCells() {
    const column = this.#column();
    return column.isEmpty && column.isSecondColumn;
  }

  #column() {
    return {
      isEmpty: this.event.range.getValue() === '',
      isSecondColumn: this.event.range.getColumn() === 2,
    };
  }
}
