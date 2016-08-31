class GlobalClick {
  constructor() {
    this.handles = [];

    window.document.body.addEventListener('click', () => {
      console.log('global click');
      this.handles.forEach(handles => handles());
    });
  }

  addGlobalClickHandleOnce(fn) {
    this.handles.push(fn);
    return function() {
      const i = this.handles.indexOf(fn);
      this.handles.splice(i, 1);
    }
  }

  addGlobalClickHandle(fn) {
    function onceFn() {
      fn();
      removeFn();
    }
    this.handles.push(onceFn);
    function removeFn() {
      const i = this.handles.indexOf(onceFn);
      this.handles.splice(i, 1);
    }
  }
}

export default new GlobalClick();
