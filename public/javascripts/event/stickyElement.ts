// 스티키전의옵셋기억해주기
// passed와 바로. header / post-head
// 언제 cancel

const stickyElement = ({ targetElement, addClass }) => {
  const stickyElement = document.querySelector(targetElement)
  if (!stickyElement) return

  let elementHeight = stickyElement.offsetHeight
  let isScrolling

  console.log('kgkg', targetElement, elementHeight)

  function hasScrolled() {
    isScrolling && window.cancelAnimationFrame(isScrolling)
    isScrolling = window.requestAnimationFrame(() => {
      const elementOffsetBottom = stickyElement.offsetTop + elementHeight
      const isStuck = window.pageYOffset > stickyElement.offsetTop
      if (isStuck) {
        document.body.classList.add(addClass)
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

// body.style.paddingTop = `${elementHeight}px`

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
