export const removeClassname = (element, classname) => element.classList.remove(classname)
export const addClassname = (element, classname) => element.classList.add(classname)

export function getElementOffsetTop(element) {
  let offsetTop = element.offsetTop
  const hasParentElement = element.offsetParent
  if (hasParentElement) offsetTop += element.offsetParent.offsetTop

  return offsetTop
}

export function getWindowScrollTop() {
  return window.scrollY || window.pageYOffset
}

export function getElementWidth(element) {
  return getComputedStyle(element).width
  // return element.offsetWidth
}

// Hide the menu when clicking outside of it
// export const documentClickHandler = function(e) {
//   const isClickedOutside = !menu.contains(e.target)
//   if (isClickedOutside) {
//     menu.classList.add('hidden')

//     document.removeEventListener('click', documentClickHandler)
//   }
// }

// const siblings = [].slice.call(parent.children).filter(function(child) {
//   return child !== ele;
// });
