import * as theme from "./mixin";

export function spawnMixinRender(styles) {
  return (toRenderStyleName, ...args) => {
    args.forEach(applyStyleName => {
      styles[toRenderStyleName] = Object.assign(
        {},
        styles[toRenderStyleName],
        theme[applyStyleName]
      );
    });
  };
}
