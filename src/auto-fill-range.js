export class AutoFillRange {
  constructor(startColumn, endColumn, rowStart, rowEnd) {
    this.startColumn = startColumn;
    this.endColumn = endColumn;
    this.rowStart = rowStart;
    this.rowEnd = rowEnd;
  }

  fillRange() {
    return `${this.startColumn}${this.rowStart}:${this.endColumn}${this.rowEnd}`;
  }
}
