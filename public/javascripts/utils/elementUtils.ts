export function getElementOffsetTop(element) {
  let offsetTop = element.offsetTop
  const hasParentElement = element.offsetParent
  if(hasParentElement) offsetTop += element.offsetParent.offsetTop
  
  return offsetTop
}

export function getWindowScrollTop() {
  return window.scrollY || window.pageYOffset
}

export function getElementWidth(element) {
  return getComputedStyle(element).width
}