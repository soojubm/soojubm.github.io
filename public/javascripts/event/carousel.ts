const carousel = () => {
  const category = document.querySelector<HTMLElement>('.carousel')
  if (!category) return

  const categoryList = category.querySelector<HTMLElement>('.carousel-viewer')
  const categoryListSlide = category.querySelectorAll<HTMLElement>('.carousel-viewer > button')
  const categoryNavigationPrev = category.querySelector<HTMLElement>('.carousel-arrows-prev')
  const categoryNavigationNext = category.querySelector<HTMLElement>('.carousel-arrows-next')
  const categoryDots = category.querySelectorAll<HTMLElement>('.carousel-dots-dot')

  if (!categoryList || !categoryListSlide || !categoryNavigationPrev || !categoryNavigationNext || !categoryDots) return

  const categoryContainerWidth = categoryList.offsetWidth
  let sum = 0

  const isFirst = categoryList.scrollLeft === 0
  if (isFirst) {
    categoryNavigationPrev.style.display = 'none'
  }

  categoryListSlide.forEach(item => (sum += item.offsetWidth))

  categoryNavigationNext.addEventListener('click', toNext)
  categoryNavigationPrev.addEventListener('click', toPrev)
  categoryDots.forEach(element => element.addEventListener('click', () => {}))

  categoryList.addEventListener('scroll', () => {
    const { scrollLeft } = categoryList
    console.log('scroll-left', scrollLeft, 'offset-width', categoryContainerWidth)

    const isFirst = scrollLeft === 0
    if (isFirst) {
      categoryNavigationPrev.style.display = 'none'
    } else {
      categoryNavigationPrev.style.display = 'flex'
    }
    // categoryNavigationPrev.hidden = scrollLeft === 0
  })

  function toPrev() {
    categoryList!.scrollLeft -= 100
  }
  function toNext() {
    categoryList!.scrollLeft += 100
    // if(sum > categoryContainerWidth) {}
    // const ttt = 100 + 'px';
    // document.querySelector('.carousel-viewer').style.transform += 'translateX('+ttt+')';
  }
}

export default carousel
