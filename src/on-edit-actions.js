export class OnEditActions {
  constructor(event) {
    this.event = event;
  }

  shouldPopulateCells = () => {
    const column = this.#column();
    return !column.isEmpty && column.isSecondColumn;
  }

  #column = () => ({
    isEmpty: this.event.range.getValue() === '',
    isSecondColumn: this.event.range.getColumn() === 2,
  });
}
