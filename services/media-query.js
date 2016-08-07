
export const MQ_LARGE = 'MQ_LARGE';
export const MQ_MIDDLE = 'MQ_MIDDLE';
export const MQ_SMALL = 'MQ_SMALL';

let windowPx = {
  height: null,
  width: null
}

const queryScreen = () => {
  windowPx.height = window.innerHeight;
  windowPx.width = window.innerWidth;
};

window.addEventListener('resize', queryScreen, true);

export function getWindowSize() {
  
}

export function getWindowPx() {
  return windowPx;
}

queryScreen();
