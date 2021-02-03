// 리팩토링하긔
const tabMenu = () => {
  document.addEventListener(
    'click',
    event => {
      const { target }: any = event
      const tabs = target.parentNode.querySelectorAll('[role=tab]')
      const tabIndex = target.getAttribute('data-index')
      const tabIndicator = document.querySelector<HTMLElement>('.profile-tablist-indicator')
      if (!tabs || !tabIndicator) return

      if (target.closest('[role=tab]')) {
        tabIndicator.style.left = `${target.offsetLeft}px`
        tabIndicator.style.width = getComputedStyle(target).width

        tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'))
        target.setAttribute('aria-selected', 'true')

        target.parentNode.parentNode.querySelectorAll('[role=tabpanel]').forEach(element => {
          element.classList.add('hidden')
          element.setAttribute('aria-hidden', 'true')

          if (tabIndex === element.getAttribute('data-index')) {
            element.classList.remove('hidden')
            element.setAttribute('aria-hidden', 'hidden')
          }
        })
      }
    },
    true,
  )
}

export default tabMenu
