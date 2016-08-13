import * as theme from './theme';

export function spawnThemeRender(styles) {
  return (toRenderStyleName, ...args) => {
    args.forEach((applyStyleName) => {
      styles[toRenderStyleName] = Object.assign({}, styles[toRenderStyleName], theme[applyStyleName]);
    });
  };
}
