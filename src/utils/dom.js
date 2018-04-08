export function getOffsetHeight(element, targetClassName, height = 0) {
  if (~element.className.indexOf(targetClassName)) {
    return height;
  }
  return getOffsetHeight(element.parentNode, targetClassName, height + element.offsetTop);
}

export function getDomRect(element) {
  return element.getBoundingClientRect();
}

export function getMouseElementInnerOffset(element, mouseEvent) {
  const rect = getDomRect(element);
  return { left: mouseEvent.pageX - rect.left, top: mouseEvent.pageY - rect.top };
}
