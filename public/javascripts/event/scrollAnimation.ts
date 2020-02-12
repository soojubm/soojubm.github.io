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


// window.addEventListener('scroll', (event) => {
// 	var timer;
// 	if (!timer) {
// 		timer = setTimeout(function() {
// 			timer=null;
// 			const targetSticky = document.querySelector('.js-sticky');
// 			const targetStickyHeight = targetSticky.clientHeight;
// 			if(window.pageYOffset > targetSticky.offsetTop){
// 					document.querySelector('main').style.paddingTop = targetStickyHeight + 'px';
// 					targetSticky.classList.add('is-sticky');
// 			} else {
// 					document.querySelector('main').style.paddingTop = '0px';
// 					targetSticky.classList.remove('is-sticky');
// 			}
// 		}, 400);
// 	}
// });

// const absoluteTop = window.pageYOffset + element.getBoundingClientRect().top;
