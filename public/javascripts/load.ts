export function lockBodyElement() {
  document.body.classList.add('body-lock')
}

export function unlockBodyElement() {
  document.body.classList.remove('body-lock')
}

export function detectLoad() {
  const loaderElement = document.querySelector<HTMLElement>('.js-loader')
  if (!loaderElement) return

  loaderElement.hidden = true
  unlockBodyElement()
}
