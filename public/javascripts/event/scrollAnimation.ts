// var tooltips = new ClassToggler({
//   containerClass: '.us-tooltip',
//   $target: $('.us-tooltip__icon'),
//   activeClass: "us-tooltip--active"
// });

const ANIMATED_CLASSNAME = 'is-observed'

// is scrolled ?
const scrollAnimation = ({ selector: selector }) => {
  if (!('IntersectionObserver' in window)) return

  const elements = Array.from(document.querySelectorAll(selector))
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: '-100px 0px',
    threshold: [0],
  }

  let observer = new IntersectionObserver(callback, options)
  elements.forEach(element => observer.observe(element))

  function callback(entries: IntersectionObserverEntry[], observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add(ANIMATED_CLASSNAME)
      observer.unobserve(entry.target)

      // entry.intersectionRatio > 0
      //   const isScrolled = element.getBoundingClientRect().top + element.clientHeight * 0.5 - window.innerHeight <= 0
      // entry.target.classList.toggle(ANIMATED_CLASSNAME, entry.isIntersecting)
      // entry.target.addEventListener('animationend', event => {
      //   entry.target.classList.remove(ANIMATED_CLASSNAME)
      // })
    })
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
