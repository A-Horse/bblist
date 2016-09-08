class GlobalClick {
  constructor() {
    this.bubbleHandles = [];
    this.captureHandles = [];
    window.document.body.addEventListener('click', event => {
      this.bubbleHandles.forEach(handles => handles(event));
      // event.stopPropagation();
    });
    window.document.body.addEventListener('click', event => {
      this.captureHandles.forEach(handles => handles(event));
      // event.stopPropagation();
    }, true);
  }

  addGlobalClickHandle(fn, useCapture = false) {
    const handles = useCapture ? this.captureHandles : this.bubbleHandles;
    handles.push(fn);
    return function() {
      const i = self.handles.indexOf(fn);
      handles.splice(i, 1);
    }
  }

  addGlobalClickHandleOnce(fn, useCapture = false) {
    const handles = useCapture ? this.captureHandles : this.bubbleHandles;
    function onceFn(event) {
      fn(event);
      removeFn();
    }
    handles.push(onceFn);
    function removeFn() {
      const i = handles.indexOf(onceFn);
      handles.splice(i, 1);
    }
    return removeFn;
  }
}

export default new GlobalClick();
