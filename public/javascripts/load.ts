export function lockBodyElement() {
  document.body.classList.add('body-lock')
}

export function unlockBodyElement() {
  const loaderElement = document.querySelector<HTMLElement>('.js-loader')
  if (!loaderElement) return

  document.body.classList.remove('body-lock')
  loaderElement.hidden = true
}
