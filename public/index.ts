'use strict'

// import { validity } from './javascripts/utils/validations'
// import { copyClipboard } from './javascripts/utils/formatUtils.js'

import './stylesheets/style.scss'

import routePage from './javascripts/router'
import { stopAnimation, throttle } from './javascripts/utils/optimizationUtils'

import { detectLoad, lockBodyElement, unlockBodyElement } from './javascripts/load'
import carousel from './javascripts/event/carousel'
import event from './javascripts/event/index'
import input from './javascripts/input/index'

import detectTheme from './javascripts/theme/dectectTheme'
import toggleTheme from './javascripts/theme/toggleTheme'

import { toggleNavbarMenu, initializeNavbar } from './javascripts/common/navbar'

document.addEventListener('DOMContentLoaded', lockBodyElement)

window.addEventListener('load', detectLoad)

document.addEventListener('DOMContentLoaded', domEvents)
window.addEventListener('hashchange', domEvents)

document.addEventListener('click', toggleTheme)

document.addEventListener('click', toggleNavbarMenu)

// ! 여기까지 리팩토링 1차로 해 봄..

document.addEventListener('DOMContentLoaded', () => {
  stopAnimation()
  // lockbody
  // 여러 개 묶여 있음.
  // event.positionSticky({ selector: '.js-titlebar', addClass: 'is-sticky-titlebar', isPassed: false })
})

window.addEventListener('scroll', throttle(scrollProgress), true)
function scrollProgress(): void {
  const containerElement = document.querySelector<HTMLElement>('.post')
  const progressBar = document.querySelector<HTMLElement>('.post-head-progress')
  if (!containerElement || !progressBar) return

  const scrollPercent = `${(window.pageYOffset / (containerElement.scrollHeight - window.innerHeight)) * 100}%`
  progressBar.style.width = scrollPercent
}

window.addEventListener('load', () => console.log('loaded!'))
window.addEventListener('beforeunload', () => '저장되지 않은 변경사항이 있습니다. 정말 페이지를 떠나실 건 가요?')
window.addEventListener('unload', () => console.log('unload event'))
document.addEventListener('readystatechange', () => console.log(document.readyState))

document.addEventListener('click', scrollToTop)
document.addEventListener('click', toggleDetails)
document.addEventListener('click', revealPassword)
document.addEventListener('click', closeParentElement)

document.addEventListener('mouseover', mouseenterElement)

// common 요소는 1번 이벤트..
// ! hashchange 마다 이벤트를 생성하는 것이 문제.
document.addEventListener('DOMContentLoaded', () => {
  carousel()
})
async function domEvents() {
  // todo
  const navItemElements = document.querySelectorAll('.navbar-menu a')
  const hash = window.location.hash.substring(1)

  const isHome = window.location.hash === ''

  const temps = [
    '',
    'avatars',
    'actions',
    'search',
    'filter',
    'components',
    'tokens',
    'changelog',
    'forms',
    'selections',
    'dummies',
    'alerts',
    'texts',
    'presentations',
    'navigations',
  ]

  if (!temps.includes(hash)) {
    initializeNavbar()
  }
  // if (isHome) initializeNavbar()

  navItemElements?.forEach(element => {
    element.classList.remove('is-current')

    const isCurrentPage = element.getAttribute('href')?.includes(hash)
    const isHomePage = !hash
    if (!isCurrentPage || isHomePage) return
    element.classList.add('is-current')
  })
  // todo
  const mediaSize760 = window.matchMedia('(max-width: 1080px)')
  const changeMedia = function(e) {
    const isMobile = e.matches

    if (isMobile) initializeNavbar()
  }
  mediaSize760.addListener(changeMedia)
  changeMedia(mediaSize760)

  detectTheme()
  lazyLoading()
  await routePage()

  // const page = routes.find(route => route.path.substring(1) === hash)
  // const pageTitleElement = document.querySelector('.js-page-title')
  // pageTitleElement?.textContent = page?.name || '페이지타이틀'

  // // ! 디자인시스템에 추가한 거 임시
  document.querySelector('.js-default-font')?.addEventListener('click', () => document.body.classList.toggle('font-default'))

  // function format(command, value) {
  //   document.execCommand(command, false, value);
  // }

  input.checkbox({ checkAllSelector: '.js-checkall', checkSelector: '.js-check' })
  input.file()
  // input.textarea()
  input.quantity()

  event.toggleElement({ selector: '.js-toggle' })

  event.tab()
  event.modal({ selector: '.js-modal' })

  event.positionSticky({ selector: '.js-post-head', addClass: 'is-sticky-post-head', isPassed: true })

  event.scrollAnimation({ selector: '.js-observer' })

  event.scrollspy({ menusSelector: '.js-scrollspy-trigger', sectionsSelector: '.js-scrollspy-section' })

  event.parallax('.js-parallax')

  // var lastScrollTop = 0
  // const heroElement = document.querySelector('.hero')
  // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
  // document.addEventListener('scroll', throttle(test))

  // // todo
  // function test() {
  //   if (!heroElement) return

  //   var st = window.pageYOffset || document.documentElement.scrollTop
  //   if (st > lastScrollTop && window.scrollY > 100) {
  //     heroElement?.classList.add('is-fixed')
  //     document.body.style.paddingTop = '140px'
  //   } else {
  //     heroElement?.classList.remove('is-fixed')
  //     document.body.style.paddingTop = '0'
  //   }

  //   lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
  // }

  carousel()
  focusComment()
  // countDownClock(20, 'days')

  document.addEventListener('click', event => {
    const target = event.target as any
    if (!target.closest('.js-test-toggle')) return

    const containerElement = target.closest('.profile-body')
    const siblingElements = [...target.parentElement.children]

    containerElement.classList.toggle('list', target.name === 'list')

    siblingElements.forEach(siblingElement => siblingElement.classList.remove('is-selected'))
    target.classList.add('is-selected')
  })
}

function focusComment() {
  const commentWrite = document.querySelector<HTMLElement>('.js-comment-write')
  const commentTextfield = document.querySelectorAll<HTMLElement>('.js-comment-textfield')
  if (!commentWrite || !commentTextfield) return

  commentTextfield.forEach(element => element.addEventListener('focus', () => commentWrite.classList.add('is-focused')))
}

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
// const value = company?.name ?? 'default name'
// const companyName = company?.['name'] ?? 'default value'

// ! click 이벤트 외부에 넣으니까 파폭에서만 오류. event undefined
// TODO: 도큐먼트가 아니라 event.target.parent 가 아닌 것을 클릭했을 때 다당야 하나
// const findClassRecursive = (element, className, depth) => {
// // parentNode.classList.contains('js-modal')
// 	console.log('depth: ' + depth, element);
// 	if (element.classList.contains(className)) return element;
// 	else return findClassRecursive(element.parentNode, className, depth + 1);
// };

// var getClosest = (elem, selector) => {
// 	for (; elem && elem !== document; elem = elem.parentNode) {
// 		if (elem.matches(selector)) return elem;
// 	}
// 	return null;
// };

// document.addEventListener('input', event => {
// const helpers = document.querySelectorAll('.textfield-helper');
// helpers.forEach(helper => helper.style.display = 'none');
// let loginData = {email: '', password: ''};

//  const isEmail = event.target === email;
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

// var form = username.form;
// var elements = form.elements;

// var hasError = function(field) {
// 	if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

// 	var validity = field.validity;
// 	if (validity.valid) return;

// 	if (validity.valueMissing) return 'Please fill out this field.';
// 	if (validity.typeMismatch) return 'Please use the correct input type.';
// 	if (validity.tooShort) return 'Please lengthen this text.';
// 	if (validity.tooLong) return 'Please shorten this text.';
// 	if (validity.badInput) return 'Please enter a number.';
// 	if (validity.stepMismatch) return 'Please select a valid value.';
// 	if (validity.rangeOverflow) return 'Please select a smaller value.';
// 	if (validity.rangeUnderflow) return 'Please select a larger value.';
// 	if (validity.patternMismatch) return 'Please match the requested format.';

// 	return 'The value you entered for this field is invalid.';
// };

// const ttt = item.tags.map(i => `<span class="tag">${i}</span>`).join('')

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

// function bustCache() {
//   const linkElements = document.querySelectorAll('link')
//   linkElements.forEach(element => {
//     const isStylesheet = element.getAttribute('rel') === 'stylesheet'
//     if (!isStylesheet) return

//     const href = element.getAttribute('href')
//     const timestamp = new Date().getTime()
//     const cacheBuster = `${href}?cacheBuster=${timestamp}`
//     element.setAttribute('href', cacheBuster)
//   })
// }

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

//   let currentPage = 1
//   const DATA_PER_PAGE = 10
//   const lastPage = 10

//   function fetchData(currentPage) {
//       const list = document.querySelector(".footer")
//       if(!list) return

//       for(let i = (currentPage - 1) * DATA_PER_PAGE + 1; i <= currentPage * DATA_PER_PAGE; i++) {
//         const li = document.createElement("li")
//         li.textContent = `${currentPage}페이지 : ${i}번째 데이터`
//         list.appendChild(li)
//       }
//   }

//   function observeLastChild(intersectionObserver) {
//     const listItems = document.querySelectorAll(".footer li")
//     listItems.forEach(element => {
//       if (currentPage >= lastPage) {
//         intersectionObserver.disconnect()
//         return
//       }
//       if(element.nextSibling) return

//       intersectionObserver.observe(element) // el에 대하여 관측 시작
//     })
// }

function scrollToTop(event) {
  if (!event.target.closest('.js-to-top')) return

  event.preventDefault()
  window.scrollTo(0, 0)
}

function toggleDetails(event) {
  if (!event.target.closest('.js-accordion')) return

  const targetElement = event.target.closest('.js-accordion')

  targetElement.querySelector('.accordion-panel')?.addEventListener('click', event => event.stopPropagation())

  let isExpanded = Boolean(targetElement.getAttribute('aria-expanded'))
  targetElement.setAttribute('aria-expanded', String(!isExpanded))
  targetElement.classList.toggle('is-active')

  // 1. 클릭한 패널을 토글한다.
  // 2. 다른 accordion-item을 클릭했을 때 닫을 것인지?
  // 3. 도큐먼트를 클릭하면 닫을 것인지?
  // 4. panel을 클릭하면 닫을 것인지?
}

function revealPassword(event) {
  const targetElement = event.target.closest('.js-view-password') as any
  if (!targetElement) return

  const inputElement = targetElement.parentNode.querySelector('input')
  const isPasswordType = inputElement.getAttribute('type') === 'password'

  inputElement.setAttribute('type', isPasswordType ? 'text' : 'password')
}

function lazyLoading() {
  if (
    !('IntersectionObserver' in window) ||
    !('IntersectionObserverEntry' in window) ||
    !('intersectionRatio' in window.IntersectionObserverEntry.prototype)
  ) {
    // load polyfill now
  }
  const lazyBackgrounds = [].slice.call(document.querySelectorAll('.footer'))
  const options = {
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.25,
  }
  let observer = new IntersectionObserver(callback, options)

  lazyBackgrounds.forEach(element => observer.observe(element))

  function callback(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return

      observer.unobserve(entry.target)
      // infinite
      // fetchData()
    })
  }

  async function fetchData() {
    try {
      const URL =
        'https://gist.githubusercontent.com/prof3ssorSt3v3/1944e7ba7ffb62fe771c51764f7977a4/raw/c58a342ab149fbbb9bb19c94e278d64702833270/infinite.json'
      const response = await fetch(URL)

      if (!response.ok) throw 'Something went wrong.'

      let data = await response.json()

      data.items.forEach(item => {
        const view = document.querySelector('body')
        if (!view) return

        view.insertAdjacentHTML(
          'beforeend',
          `<div style="height:120px;line-height:120px;background:var(--color-accent);text-align:center;">무한스크롤 ${item.name}</div>`,
        )
      })
    } catch (error) {}
  }
}

function closeParentElement(event) {
  const targetElement = event.target.closest('.js-close')
  if (!targetElement) return

  targetElement.parentNode.hidden = true
}

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

// targetElements.forEach((element, index) => {
//   window.addEventListener('scroll', throttle(() => {

//     let offsetBottom = element.offsetTop + element.offsetHeight
//     let isScrolled = window.pageYOffset > offsetBottom
//     let rate2 = Math.abs(window.pageYOffset) * 0.1
//     // let rate2 = Math.abs(window.pageYOffset + element.offsetTop) * 0.1

//     let isTemp = Number(window.getComputedStyle(element).getPropertyValue('opacity')) >= 1
//     let isTemp2 = Number(window.getComputedStyle(element).getPropertyValue('opacity')) < 0

//     console.log(isTemp2, window.getComputedStyle(element).getPropertyValue('opacity'))

//     const abc = () => {
//       let opacity1 = String((rate2 / 100).toFixed(1))
//       let opacity2 = String((-rate2 / 100).toFixed(1))
//       if(isScrolled) {
//         if(isTemp) return false
//         return opacity1
//       } else {
//         if(isTemp2) return false
//         return opacity2
//       }
//     }
//     const ccc = () => {
//       let opacity1 = `translateY(-${rate2 * 2}px)`
//       let opacity2 = `translateY(${rate2 * 2}px)`
//       if(isScrolled) {
//         if(window.pageYOffset > 600) return false
//         return opacity1

//       } else {
//         return opacity2
//       }
//     }

//     // 괴ㅗㅇ장히 실행이 여러번되느넫?
//     // console.log(window.getComputedStyle(element).getPropertyValue('transform'))
//     element.style.opacity = String(abc())
//     element.style.transform = String(ccc())

//     // if(targetElements.length === index + 1) {}

//     // const temp = document.querySelector<HTMLElement>('.js-parallax-parent')
//     // temp!.style.opacity = String(Math.abs(window.pageYOffset + element.offsetTop) * 0.00125)
// }), false)
// })

// 2222.02.02 menu에서 제거 navbar-menu-item has-submenu js-hover-trigger
function mouseenterElement(event) {
  // mouseover 버블링.closest.여러번실행 / mouseenter 한번실행.closestdksehla
  const ACTIVE_CLASSNAME = 'is-active'
  const targetElement = event.target.closest('.js-hover-trigger')

  // todo hoverelement
  // todo mouseout vs else
  if (targetElement) {
    targetElement.setAttribute('aria-expanded', 'true')
    document.body.classList.add(ACTIVE_CLASSNAME)
  } else {
    if (!document.body.classList.contains(ACTIVE_CLASSNAME)) return
    // hoverElement?.setAttribute('aria-expanded', 'true')
    document.body.classList.remove(ACTIVE_CLASSNAME)
  }
}

interface IUser {
  name: string
  age: number
  isAdult?: boolean
  readonly test: string
}

class GreetingMessage extends HTMLElement {
  /**
   * The class constructor object
   */
  constructor() {
    // Always call super first in constructor
    super()

    // Render HTML
    this.innerHTML = `<p>
				<button>Hi there!</button>
			</p>
			<div class="message" aria-live="polite"></div>`
  }

  /**
   * Runs each time the element is appended to or moved in the DOM
   */
  connectedCallback() {
    console.log('connected!', this)
  }

  /**
   * Runs when the element is removed from the DOM
   */
  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

// Define the new web component
if ('customElements' in window) {
  customElements.define('greeting-message', GreetingMessage)
}
