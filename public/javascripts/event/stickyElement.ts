// 스티키전의옵셋기억해주기
// passed와 바로. header / post-head
// 언제 cancel

const stickyElement = ({ targetElement, addClass, position }) => {
  const stickyElement = document.querySelector(targetElement)
  if (!stickyElement) return

  let elementHeight = stickyElement.offsetHeight
  let isScrolling

  function hasScrolled() {
    isScrolling && window.cancelAnimationFrame(isScrolling)
    isScrolling = window.requestAnimationFrame(() => {
      const elementOffsetTop = stickyElement.offsetTop
      const elementOffsetBottom = stickyElement.offsetTop + elementHeight
      const isStuck = window.pageYOffset > (position === 'top' ? elementOffsetTop : elementOffsetBottom)
      if (isStuck) {
        document.body.classList.add(addClass)
        // document.body.style.paddingTop = `${elementHeight}px`
      } else {
        document.body.classList.remove(addClass)
      }
    })
  }
  // window.addEventListener('resize', () => {
  //   isScrolling && window.cancelAnimationFrame(isScrolling)
  //   isScrolling = window.requestAnimationFrame(() => {
  //     elementHeight = stickyElement.offsetHeight
  //   })
  // })

  window.addEventListener('scroll', hasScrolled)
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
