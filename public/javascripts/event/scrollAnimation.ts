const eventScrollAnimation = () => {
  const scrollTarget = document.querySelectorAll('.js-scroll-animation')
  if (!scrollTarget) return

  scrollTarget.forEach(element => {
    const isScrolled = element.getBoundingClientRect().bottom <= window.innerHeight
    if (!isScrolled) return

    element.classList.add('is-scrolled')
  })

  window.addEventListener('scroll', () => {
    scrollTarget.forEach(element => {
      const { pageYOffset } = window
      const isScrolled = pageYOffset > pageYOffset + element.getBoundingClientRect().top - window.innerHeight + 50
      // const isScrolled = element.getBoundingClientRect().bottom <= window.innerHeight;
      console.log(element.getBoundingClientRect().bottom, window.innerHeight)
      if (!isScrolled) return

      element.classList.add('is-scrolled')
    })
  })
}

export default eventScrollAnimation
