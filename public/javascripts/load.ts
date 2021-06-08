export const initializeLoader = () => {
  document.addEventListener('DOMContentLoaded', lockBodyElement)
  window.addEventListener('load', unlockBodyElement)

  function lockBodyElement() {
    document.body.classList.add('body-lock')
  }
  function unlockBodyElement() {
    const loaderElement = document.querySelector<HTMLElement>('.js-loader')
    if (!loaderElement) return

    document.body.classList.remove('body-lock')
    loaderElement.hidden = true
  }
}
