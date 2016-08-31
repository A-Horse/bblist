export class GlobalClick {
  constructor() {
    this.handles = [];

    window.document.body.addEventListener('click', (event) => {
      this.handles.forEach(handles => handles());
    });
  }

  addGlobalClickHandleOnce(fn) {
    this.handles.push(fn);
    return function() {
      // TODO unnecessary find index
      const i = this.handles.indexOf(fn);
      this.handles.splice(i, 1);
    }
  }

  addGlobalClickHandle(fn) {
    this.handles.push(fn);
    return function() {
      // TODO unnecessary find index
      const i = this.handles.indexOf(fn);
      this.handles.splice(i, 1);
    }
  }
}
