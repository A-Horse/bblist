const handles = [];

function registerGlobalClick() {
  window.addEventListener('click', (event) => {
    this.handles.forEach(handles => handles());
  });
}

export function addGlobalClickHandle(fn) {
  this.handles.push(fn);
  return function() {
    const i = this.handles.indexOf(fn);
    this.handles.splice(i, 1);
  }
}

export function removeGlobalClickHandle() {
  
}
