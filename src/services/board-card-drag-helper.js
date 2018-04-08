class BoardCradDragHelper {
  constructor() {
    this.data = {};
  }

  setData(type, data) {
    this.data[type] = data;
  }

  getData(type) {
    return this.data[type];
  }
}

export default new BoardCradDragHelper();
