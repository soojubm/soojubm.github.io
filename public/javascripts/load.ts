// todo function
export function lockBodyElement() {
  document.body.classList.add('body-lock')
}

export function unlockBodyElement() {
  document.body.classList.remove('body-lock')
}

export function detectLoad() {
  document.body.classList.remove('is-loading')

  const loaderElement = document.querySelector<HTMLElement>('.js-loader')
  if (!loaderElement) return

  unlockBodyElement()

  loaderElement.hidden = true
}
