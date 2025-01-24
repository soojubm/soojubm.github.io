'use strict'

// import { copyClipboard } from './javascripts/utils/formatUtils.js'
// import detectOnline from './public/javascripts/common'
// import input from './public/javascripts/input/index'
// import routePage from './public/javascripts/router'
import { stopAnimation } from './public/javascripts/utils/optimizationUtils'

import { detectLoad, lockBodyElement, unlockBodyElement } from './public/javascripts/load'

import toggleElement from './public/javascripts/event/toggleElement'
import tab from './public/javascripts/event/tab'
import scrollspy from './public/javascripts/event/scrollspy'
import scrollAnimation from './public/javascripts/event/scrollAnimation'

import { initializeNavbar } from './public/javascripts/common/navbar'

import { defineCustomElement } from './public/javascripts/components'
import setupModal from './public/javascripts/event/modal'

import { throttle } from './public/javascripts/utils/optimizationUtils'
import { getWindowScrollTop, getElementOffsetTop } from './public/javascripts/utils/elementUtils'

// import('./public/javascripts/event/modal').then(module => {
//   console.log(module)
// })

// import { fetchPage } from './public/javascripts/router'

// document.addEventListener('DOMContentLoaded', lockBodyElement)
document.addEventListener('DOMContentLoaded', defineCustomElement)

window.addEventListener('load', detectLoad)

document.addEventListener('DOMContentLoaded', domEvents)
// window.addEventListener('hashchange', domEvents)

document.addEventListener('DOMContentLoaded', () => {
  stopAnimation()
})

document.addEventListener('click', closeParentElement)
const setDocumentTitle = title => (document.title = `이경수 ${title}`)

async function domEvents() {
  setupModal({ selector: '.js-modal' })
  tab()

  // const hash = window.location.hash.substring(1)
  const hash = window.location.pathname.substring(1)
  setDocumentTitle(hash)

  // todo
  const mediaSizeSmall = window.matchMedia('(max-width: 1080px)')
  const changeMedia = function (event) {
    const isMobile = event.matches

    if (isMobile) initializeNavbar()
  }
  mediaSizeSmall.addListener(changeMedia)
  changeMedia(mediaSizeSmall)

  // await routePage()
  // const page = routes.find(route => route.path.substring(1) === hash)

  // loadLazyImages()

  // function format(command, value) {
  //   document.execCommand(command, false, value);
  // }

  toggleElement({ selector: '.js-toggle' })

  // 개별 칩 그룹에 이벤트를 걸고, 다른 컴포넌트를 클릭할 때 제거하는 방법.
  // 부모에 클래스를 주고 형제를 제거.
  // get toggle trigger name  dataset.toggle
  // set toggle classname on body trigger name
  // styling

  type Parameters = {
    selector: string
    className: string
    isPassed: boolean
  }

  const positionSticky = ({ selector, className, isPassed }: Parameters) => {
    const element = document.querySelector<HTMLElement>(selector)
    if (!element) return

    // initail element rect top
    let elementOffsetTop = getElementOffsetTop(element)
    const elementHeight = element.offsetHeight
    const offsetBottom = elementOffsetTop + elementHeight
    let previousScrollTop = isPassed ? offsetBottom : elementOffsetTop

    window.addEventListener('scroll', throttle(handleElementSticky), false)
    window.addEventListener('resize', throttle(setElementOffsetTop), false)

    function setElementOffsetTop() {
      elementOffsetTop = getElementOffsetTop(element)
    }

    function handleElementSticky() {
      let currentScrollTop = getWindowScrollTop()

      const isStuck = currentScrollTop + elementHeight > previousScrollTop

      document.body.classList.toggle(className, isStuck)
      // backdrop으로 대체하는 것이 좋다. 왜냐하면, 부모 엘리먼트의 형태에 영향을 주기 때문에.
      document.body.style.paddingTop = isStuck ? `${elementHeight}px` : '0'
    }
  }

  positionSticky({ selector: '.js-post-head', className: 'is-sticky-post-head', isPassed: true })
  // passed와 바로. header / post-head
  // todo removeEventListener

  scrollAnimation({ selector: '.js-observer' })
  scrollspy({ menusSelector: '.js-scrollspy-trigger', sectionsSelector: '.js-scrollspy-section' })

  // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
  // document.addEventListener('scroll', throttle(test))

  // countDownClock(20, 'days')
}

// ! click 이벤트 외부에 넣으니까 파폭에서만 오류. event undefined
// TODO: 도큐먼트가 아니라 event.target.parent 가 아닌 것을 클릭했을 때 다당야 하나
// const findClassRecursive = (element, className, depth) => {
// // parentNode.classList.contains('js-modal')
// 	console.log('depth: ' + depth, element);
// 	if (element.classList.contains(className)) return element;
// 	else return findClassRecursive(element.parentNode, className, depth + 1);
// };

// document.addEventListener('input', event => {
// const helpers = document.querySelectorAll('.textfield-helper');
// helpers.forEach(helper => helper.style.display = 'none');
// let loginData = {email: '', password: ''};

// 	const isPassword = event.target === password;

// 	const handleValidate = ({ target: any, validate: void, message: any }) => {
// 		if(validate) {
// 			target.parentNode.classList.remove('is-invalid');
// 			target.nextElementSibling.innerText = '';
// 			target.nextElementSibling.style.display = 'none';
// 		} else {
// 			if(!target.nextElementSibling) return;
// 			// const id = target.id || target.name;
// 			// target.setAttribute('aria-describedby', 'error-' + id);
// 			target.parentNode.classList.add('is-invalid');
// 			target.nextElementSibling.innerText = message;
// 			target.nextElementSibling.style.display = 'block';
// 		}
// 	};

// 	if(isPassword) {
// 		handleValidate({
// 			target: password,
// 			validate: isPassword && !(validity.isLength(password.value, 8)),
// 			message: '비밀번호를 똑바로 입력해라.'
// 		});
// 	}

// });

// event.target.reset();

// var i = 0;
// var images = ['cover1.jpg','cover2.jpg'];
// var imageElement = document.querySelector('.cover_image');
// // image.css('background-image', 'url(/img/cover1.jpg)');
// setInterval(() => {
// 	imageElement.fadeOut(1000, () => {
// 		imageElement.css('background-image', `url(${images[i++]})`);
// 		imageElement.fadeIn(1000);
// 	});
// 	if(i === images.length) i = 0;
// }, 5000);

// function addToPendingWork(promise) {
//   busyspinner.hidden = false
//   pendingOps.add(promise)
//   const cleanup = () => {
//     pendingOps.delete(promise)
//     busyspinner.hidden = pendingOps.size === 0
//   }
//   promise.then(cleanup).catch(cleanup)
// }

// ! refresh 입력 중일 떄
// let formChanged = false
// signupForm?.addEventListener('change', () => {
//   formChanged = true
// })
// window.addEventListener('beforeunload', event => {
//   if (!formChanged) return
//   event.preventDefault() // 모든 브라우저에서 지원하는 것은 아님.
//   event.returnValue = '테스트'
// })

// const targetElements = document.querySelectorAll<HTMLElement>('.js-parallax-test')
// const tt = document.querySelector<HTMLElement>('.js-parallax-parent')
// // initialize
// targetElements.forEach(element => {
//   element.style.opacity = `0`
// })

// if(tt) {
//   window.addEventListener('scroll', throttle(() => {
//     let rate2 = Math.abs(window.pageYOffset) * 0.1
//     let offsetBottom = tt.offsetTop + tt.offsetHeight
//     let isScrolled = window.pageYOffset > offsetBottom / 1.5
//     if(isScrolled) {
//       console.log(String((rate2 / 100).toFixed(1)))
//       tt.style.opacity = String((-rate2 / 100).toFixed(1))
//     } else {
//       tt.style.opacity = String((rate2 / 100).toFixed(1))
//     }
//   }))
// }

// ! lazy
// document.addEventListener('DOMContentLoaded', function() {
//   var lazyloadImages = document.querySelectorAll('img.lazy')
//   var lazyloadThrottleTimeout

//   function lazyload() {
//     if (lazyloadThrottleTimeout) {
//       clearTimeout(lazyloadThrottleTimeout)
//     }

//     lazyloadThrottleTimeout = setTimeout(function() {
//       var scrollTop = window.pageYOffset
//       lazyloadImages.forEach(function(img) {
//         if (img.offsetTop < window.innerHeight + scrollTop) {
//           img.src = img.dataset.src
//           img.classList.remove('lazy')
//         }
//       })
//       if (lazyloadImages.length == 0) {
//         document.removeEventListener('scroll', lazyload)
//         window.removeEventListener('resize', lazyload)
//         window.removeEventListener('orientationChange', lazyload)
//       }
//     }, 20)
//   }

//   document.addEventListener('scroll', lazyload)
//   window.addEventListener('resize', lazyload)
//   window.addEventListener('orientationChange', lazyload)
// })

// let company = {
//   name: 'Github',
//   revenue: 2000,
//   users: [
//     { name: 'John', handle: '@john' },
//     { name: 'doe', handle: '@doe' },
//   ],
//   getUserNames() {
//     return users.map(user => user.name)
//   },
// }
// const companyName = company?.['name'] ?? 'default value'

function closeParentElement(event) {
  const targetElement = event.target.closest('.js-close')
  if (!targetElement) return

  targetElement.parentNode.hidden = true
}
