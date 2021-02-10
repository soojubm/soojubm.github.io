const tabMenu = () => {
  const tabIndicator = document.querySelector<HTMLElement>('.profile-tablist-indicator')
  if (!tabIndicator) return

  tabIndicator.style.width = '90px' // todo

  document.addEventListener(
    'click',
    event => {
      const { target }: any = event
      const tabs = target.parentNode.querySelectorAll('[role=tab]')
      const tabPanels = target.parentNode.parentNode.querySelectorAll('[role=tabpanel]')
      const tabIndex = target.getAttribute('data-index')

      if (!tabs) return

      if (target.closest('[role=tab]')) {
        tabIndicator.style.left = `${target.offsetLeft}px`
        tabIndicator.style.width = getComputedStyle(target).width

        tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'))
        target.setAttribute('aria-selected', 'true')

        tabPanels.forEach(element => {
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
