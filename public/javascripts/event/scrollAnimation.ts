const eventScrollAnimation = () => {
  const scrollTarget = document.querySelectorAll('.js-scroll-animation')
  const SCROLLED_CLASS = 'is-scrolled'
  if (!scrollTarget) return

  let temp

  scrollTarget.forEach(element => {
    const isScrolled = element.getBoundingClientRect().bottom <= window.innerHeight
    if (!isScrolled) return

    element.classList.add(SCROLLED_CLASS)
  })

  window.addEventListener('scroll', () => {
    scrollTarget.forEach(element => {
      
      temp && window.cancelAnimationFrame(temp)
      temp = window.requestAnimationFrame(() => {
        const isScrolled = element.getBoundingClientRect().bottom <= window.innerHeight;
        // const isScrolled = window.pageYOffset > window.pageYOffset + element.getBoundingClientRect().top - window.innerHeight + 50
        if (!isScrolled) return

        element.classList.add(SCROLLED_CLASS)

        // element.addEventListener('animationend', () => {
        //   element.classList.remove(SCROLLED_CLASS);
        // })
      })
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
