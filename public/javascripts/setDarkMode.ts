export const carousel = () => {
  const category = document.querySelector('.slider');
  if(!category) return;
  
  const categoryList = category.querySelector<HTMLElement>('.slider-viewer');
  const categoryListSlide = category.querySelectorAll<HTMLElement>('.slider-viewer > button');
  const categoryNavigationPrev = category.querySelector('.slider-arrows-prev');
  const categoryNavigationNext = category.querySelector('.slider-arrows-next');
  const categoryDots = category.querySelectorAll('.slider-dots-dot');

  if(!categoryList || !categoryListSlide || !categoryNavigationPrev || !categoryNavigationNext || !categoryDots) return;


  const categoryContainerWidth = categoryList.offsetWidth;
  let sum = 0;
  
  categoryListSlide.forEach(item => sum += item.offsetWidth);
  
  categoryNavigationNext.addEventListener('click', toNext);
  categoryNavigationPrev.addEventListener('click', toPrev);
  categoryDots.forEach(element => element.addEventListener('click', () => {}));

  categoryList.addEventListener('scroll', () => {
    const { scrollLeft } = categoryList;
    console.log('scroll-left', scrollLeft, 'offset-width', categoryContainerWidth);
  });

  function toPrev() {
    if(!categoryList) return;
    categoryList.scrollLeft -= 100;
  }
  function toNext() {
    if(!categoryList) return;
    categoryList.scrollLeft += 100;
    // if(sum > categoryContainerWidth) {}
    // const ttt = 100 + 'px';
    // document.querySelector('.slider-viewer').style.transform += 'translateX('+ttt+')';
  }
};

export const setDarkmode = () => {
  const darkmodeButton = document.querySelector('.js-darkmode');
  if(!darkmodeButton) return;
  darkmodeButton.addEventListener('click', setDarkmode);

  function setDarkmode() {
    document.body.classList.toggle('darkmode');
    
    const isDarkmode = document.body.classList.contains('darkmode');
    if(isDarkmode) {
      localStorage.setItem('theme', 'darkmode');
    } else {
      localStorage.removeItem('theme');
      // localStorage.clear();
    }
  }
  const lastTheme = localStorage.getItem('theme');
  if(!lastTheme) return;
  document.body.classList.add(lastTheme);
};