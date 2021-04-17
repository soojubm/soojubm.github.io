const carousel = () => {
  const category = document.querySelector('.slider')
  if (!category) return

  const categoryList = category.querySelector<HTMLElement>('.slider-viewer')
  const categoryListSlide = category.querySelectorAll<HTMLElement>('.slider-viewer > button')
  const categoryNavigationPrev = category.querySelector('.slider-arrows-prev')
  const categoryNavigationNext = category.querySelector('.slider-arrows-next')
  const categoryDots = category.querySelectorAll('.slider-dots-dot')

  if (!categoryList || !categoryListSlide || !categoryNavigationPrev || !categoryNavigationNext || !categoryDots) return

  const categoryContainerWidth = categoryList.offsetWidth
  let sum = 0

  categoryListSlide.forEach(item => (sum += item.offsetWidth))

  categoryNavigationNext.addEventListener('click', toNext)
  categoryNavigationPrev.addEventListener('click', toPrev)
  categoryDots.forEach(element => element.addEventListener('click', () => {}))

  categoryList.addEventListener('scroll', () => {
    const { scrollLeft } = categoryList
    console.log('scroll-left', scrollLeft, 'offset-width', categoryContainerWidth)
  })

  function toPrev() {
    categoryList!.scrollLeft -= 100
  }
  function toNext() {
    categoryList!.scrollLeft += 100
    // if(sum > categoryContainerWidth) {}
    // const ttt = 100 + 'px';
    // document.querySelector('.slider-viewer').style.transform += 'translateX('+ttt+')';
  }
}


export default carousel