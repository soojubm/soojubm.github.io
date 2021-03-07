const scrollAnimation = () => {
  const scrollElements = document.querySelectorAll('.js-scroll-animation')
  if (!scrollElements) return

  const SCROLLED_CLASS = 'is-scrolled'
  let temp

  scrollElements.forEach(element => {
    const isScrolled = element.getBoundingClientRect().top <= window.innerHeight
    if (!isScrolled) return

    element.classList.add(SCROLLED_CLASS)
  })

  window.addEventListener('scroll', () => {
    scrollElements.forEach(element => {
      const isScrolled = element.getBoundingClientRect().top + element.clientHeight * 0.5 <= window.innerHeight
      // const isScrolled = window.pageYOffset > window.pageYOffset + element.getBoundingClientRect().top - window.innerHeight + 50
      if (!isScrolled) return

      element.classList.add(SCROLLED_CLASS)
      temp && window.cancelAnimationFrame(temp)
      temp = window.requestAnimationFrame(() => {
        // element.addEventListener('animationend', () => {
        //   element.classList.remove(SCROLLED_CLASS);
        // })
      })
    })
  })
}

export default scrollAnimation

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
