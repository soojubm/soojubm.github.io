export const carousel = () => {
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


// todo
export const setDarkmode = () => {
  const darkmodeButton = document.querySelector('.js-darkmode')
  console.log(darkmodeButton)
  if(!darkmodeButton) return

  darkmodeButton.addEventListener('click', tt)

  loadTheme()
  


  function tt() {
    const DARK_CLASS = 'theme-dark'
    
    document.body.classList.toggle(DARK_CLASS)
    
    const isDarkmode = document.body.classList.contains(DARK_CLASS)

    darkmodeButton!.querySelector('input')!.checked = isDarkmode
    // console.log(darkmodeButton!.parentNode!.querySelector('input')!.checked)
    if (isDarkmode) {
      localStorage.setItem('theme', DARK_CLASS)
    } else {
      localStorage.removeItem('theme')
    }

  }

  function loadTheme() {
    const lastTheme = localStorage.getItem('theme')
    if (!lastTheme) return

    document.body.classList.add(lastTheme)

    const DARK_CLASS = 'theme-dark'
    const isDarkmode = document.body.classList.contains(DARK_CLASS)
    darkmodeButton!.querySelector('input')!.checked = isDarkmode

    // console.log(darkmodeButton!.parentNode!.querySelector('input')!.checked)
  }
}

// function toggleTheme() {
//   // 저장된 값이 없다면 시스템 설정을 기준으로 함
//   const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
//   const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

//   // 최상위 엘리먼트에 설정, 로컬 스토리지에 설정을 저장
//   document.documentElement.setAttribute('data-theme', newTheme)
//   localStorage.setItem('theme', newTheme)
// }






// document.documentElement.classList.add('color-theme-in-transition')
// document.documentElement.setAttribute('data-theme', theme)
// window.setTimeout(function() {
//   document.documentElement.classList.remove('color-theme-in-transition')
// }, 1000)