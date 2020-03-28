const stickyElement = ({ targetElement, addClass }) => {
  const { body } = document
  const stickyElement = document.querySelector(targetElement)
  if (!stickyElement) return

  let stickyElementHeight = stickyElement.offsetHeight
  let isScrolling

  window.addEventListener('resize', () => {
    isScrolling && window.cancelAnimationFrame(isScrolling)
    isScrolling = window.requestAnimationFrame(() => {
      stickyElementHeight = stickyElement.offsetHeight
    })
  })

  window.addEventListener('scroll', () => {
    isScrolling && window.cancelAnimationFrame(isScrolling)
    isScrolling = window.requestAnimationFrame(() => {
      if (window.pageYOffset > stickyElement.offsetTop + stickyElementHeight) {
        body.classList.add(addClass)
      } else {
        body.classList.remove(addClass)
      }
    })
  })
}

// var isScrolling;
// window.addEventListener('scroll', (event) => {
// 	if(isScrolling) window.clearTimeout(isScrolling);
// 	isScrolling = setTimeout(function(){
// 		stickyToggle();
// 	}, 50);
// });

// export const stickyHeaderElement = (targetElement, addClass) => {
// 	stickyElement({targetElement, addClass, true});
// };

// const stickyHeader = () => {
// 	const headerElement = document.querySelector('.header');
// 	let lastScrollTop = 0;

// 	window.addEventListener('scroll', () => {
// 		requestAnimationFrame(hasScrolled);
// 	});

// 	function hasScrolled() {
// 		if(window.pageYOffset > lastScrollTop) {
// 			headerElement.classList.add('nav-up');
// 		} else {
// 			headerElement.classList.remove('nav-up');
// 		}
// 		lastScrollTop = window.pageYOffset;
// 	}
// };

export default stickyElement
