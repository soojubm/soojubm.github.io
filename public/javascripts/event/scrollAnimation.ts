const scrollAnimation = ({ selector: selector }) => {
  const ANIMATED_CLASSNAME = 'is-observed'
  const elements = Array.from(document.querySelectorAll(selector))

  const options = {
    root: null,
    rootMargin: '-100px 0px -100px 0px',
    threshold: 0, // [0, 1], [0, 0.5]
  }
  let observer = new IntersectionObserver(callback, options)

  elements.forEach(element => observer.observe(element))

  function callback(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      // const isInView = entry.intersectionRatio > 0

      entry.target.classList.add(ANIMATED_CLASSNAME)

      observer.unobserve(entry.target)
      // entry.target.addEventListener('animationend', event => event.currentTarget.classList.remove(ANIMATED_CLASSNAME));
    })
  }
}

export default scrollAnimation

// function animateOnLoad() {
//   const scrollElements = document.querySelectorAll('.js-load-animation')
//   scrollElements.forEach(element => {
//     const isObserved = element.getBoundingClientRect().top - window.innerHeight <= 0
//     if (!isObserved) return

//     element.classList.add(ANIMATED_CLASSNAME)
//   })
// }

// window.addEventListener('scroll', throttle(animateOnScroll), false)
// scrollElements.forEach(element => {
//   const isScrolled = element.getBoundingClientRect().top + element.clientHeight * 0.5 - window.innerHeight <= 0
//   element.classList.toggle(ANIMATED_CLASSNAME, isScrolled)
// })

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

// function initIndicator() {
//   const indicator = document.createElement('aside');

//   indicator.classList.add('indicator');

//   Array.from(document.querySelectorAll('.box')).forEach((box, index) => {
//       const item = document.createElement('div');

//       item.classList.add('indicator-item');
//       item.dataset.index = index + 1;
//       item.textContent = index + 1;

//       item.addEventListener('animationend', event => event.currentTarget.classList.remove('pulse'));

//       indicator.appendChild(item);
//   });

//   document.body.appendChild(indicator);
// }

// function updateIndicator(entries, observer) {
//   const indicator = document.querySelector('.indicator');

//   entries.forEach(entry => {
//       const index = entry.target.textContent.replace('#', '');
//       const el = indicator.querySelector(`[data-index="${index}"]`);

//       el.classList.add('pulse');
//       el.classList.toggle('on', entry.isIntersecting);
//   });
// }

// function updateIndicatorByRatio(entries, observer) {
//   const indicator = document.querySelector('.indicator');
//   const color = 'rgba(160, 230, 0, alpha)';

//   entries.forEach(entry => {
//       const index = entry.target.textContent.replace('#', '');
//       const el = indicator.querySelector(`[data-index="${index}"]`);

//       el.classList.add('pulse');
//       el.style.backgroundColor = color.replace('alpha', entry.intersectionRatio);
//   });
// }

// initIndicator();
