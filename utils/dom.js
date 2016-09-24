
export function getOffsetHeight(element, targetClassName, height = 0) {
  if (~element.className.indexOf(targetClassName)) {
    return height;
  }
  return getOffsetHeight(element.parentNode, targetClassName, height + element.offsetTop);
}
