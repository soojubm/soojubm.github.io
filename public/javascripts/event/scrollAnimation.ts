import { throttle } from '../utils/optimizationUtils'

const scrollAnimation = () => {
  const scrollElements = document.querySelectorAll('.js-scroll-animation')
  const ANIMATED_CLASSNAME = 'is-scrolled'

  animateOnLoad()
  animateOnScroll()

  function animateOnLoad() {
    scrollElements.forEach(element => {
      const isObserved = element.getBoundingClientRect().top - window.innerHeight <= 0 
      if (!isObserved) return
  
      element.classList.add(ANIMATED_CLASSNAME)
    })
  }

  function animateOnScroll() {
    const elements = [].slice.call(document.querySelectorAll('.js-scroll-animation'))
    const options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 1, // [0, 1], [0, 0.5]
    }
    let observer = new IntersectionObserver(callback, options)
    elements.forEach(element => observer.observe(element))
    
    function callback(entries, observer) {
      entries.forEach(entry => {
        console.log(entry)
        if (!entry.isIntersecting) return

        if(entry.intersectionRatio > 0) {
          if(entry.classList.contains('is-scrolled')) return
          entry.classList.toggle(ANIMATED_CLASSNAME)
        }

        observer.unobserve(entry.target);
      })
    }

    // window.addEventListener('scroll', throttle(animateOnScroll), false)
    // scrollElements.forEach(element => {
    //   const isScrolled = element.getBoundingClientRect().top + element.clientHeight * 0.5 - window.innerHeight <= 0
    //   element.classList.toggle(ANIMATED_CLASSNAME, isScrolled)
    // })
  }
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
