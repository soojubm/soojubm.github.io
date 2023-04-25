'use strict'

// import { copyClipboard } from './javascripts/utils/formatUtils.js'

// import './images/springsteen.jpg'

import './public/stylesheets/style.scss'

import routePage from './public/javascripts/router'
import { stopAnimation, throttle } from './public/javascripts/utils/optimizationUtils'

import { detectLoad, lockBodyElement, unlockBodyElement } from './public/javascripts/load'

import carousel from './public/javascripts/event/carousel'
import toggleElement from './public/javascripts/event/toggleElement'
import tab from './public/javascripts/event/tab'
import modal from './public/javascripts/event/modal'
import parallax from './public/javascripts/event/parallax'
import scrollspy from './public/javascripts/event/scrollspy'
import scrollAnimation from './public/javascripts/event/scrollAnimation'

import input from './public/javascripts/input/index'

import detectTheme from './public/javascripts/theme/dectectTheme'
import toggleTheme from './public/javascripts/theme/toggleTheme'

import { toggleNavbarMenu, initializeNavbar } from './public/javascripts/common/navbar'

document.addEventListener('DOMContentLoaded', lockBodyElement)
document.addEventListener('DOMContentLoaded', () => {
  // Define the new web component
  if ('customElements' in window) {
    window.customElements.define('sds-chip', SDSChip)
    window.customElements.define('close-button', CloseButton)
    // customElements.define('sjb-entity', Entity)
  }
})

window.addEventListener('load', detectLoad)

document.addEventListener('DOMContentLoaded', domEvents)
window.removeEventListener('hashchange', domEvents)
window.addEventListener('hashchange', domEvents)

document.addEventListener('click', toggleTheme)

document.addEventListener('click', toggleNavbarMenu)

// ! 여기까지 리팩토링 완료...

// document.addEventListener('click', toggleTest)
function toggleTest(event) {
  if (!event.target.closest('.js-toggle')) return

  // 개별 칩 그룹에 이벤트를 걸고, 다른 컴포넌트를 클릭할 때 제거하는 방법.
  // 부모에 클래스를 주고 형제를 제거.
  event.target.classList.toggle('is-active')
}

document.addEventListener('DOMContentLoaded', () => {
  stopAnimation()
  // lockbody
  // 여러 개 묶여 있음.
  // event.positionSticky({ selector: '.js-titlebar', addClass: 'is-sticky-titlebar', isPassed: false })
})

function scrollProgress() {
  const containerElement = document.querySelector<HTMLElement>('.post')
  const progressBar = document.querySelector<HTMLElement>('.post-head-progress')
  if (!containerElement || !progressBar) return

  const scrollPercent = `${(window.pageYOffset / (containerElement.scrollHeight - window.innerHeight)) * 100}%`
  progressBar.style.width = scrollPercent
}

window.addEventListener('orientationChange', () => console.log('orientatoinChange'))
window.addEventListener('load', () => console.log('loaded!'))
window.addEventListener('beforeunload', () => '저장되지 않은 변경사항이 있습니다. 정말 페이지를 떠나실 건 가요?')

// `unload` 이벤트는 안정적으로 실행되지 않으며 이 이벤트를 리스닝하면 뒤로-앞으로 캐시와 같은 브라우저 최적화 기능을 사용하지 못할 수 있습니다. `pagehide` 또는 `visibilitychange` 이벤트를 대신 사용하세요. 자세히 알아보기
// window.addEventListener('unload', () => console.log('unload event'))
// https://web.dev/bfcache/?utm_source=lighthouse&utm_medium=devtools#never-use-the-unload-event

document.addEventListener('readystatechange', () => console.log(document.readyState))

document.addEventListener('click', scrollToTop)
document.addEventListener('click', toggleDetails)
document.addEventListener('click', revealPassword)
document.addEventListener('click', closeParentElement)

document.addEventListener('mouseover', mouseenterElement)

// common 요소는 1번 이벤트..
// ! hashchange 마다 cn 생성하는 것이 문제.
// document.addEventListener('DOMContentLoaded', () => {
//   carousel()
// })
async function domEvents() {
  const navItemElements = document.querySelectorAll('.navbar-menu a')
  const hash = window.location.hash.substring(1)

  document.title = `이경수 ${hash}`

  const temps = [
    'dictionary',
    'home',
    'entity',
    '',
    'messaging',
    'search',
    'filter',
    'tokens',
    'subscribe',
    'components',
    'changelog',
    'dummies',
    'texts',
    'signifier_why',
    'presentations_why',
    'actions',
  ]

  if (!temps.includes(hash)) {
    initializeNavbar()
  }
  const isHomePage = !hash

  navItemElements?.forEach(element => {
    element.classList.remove('is-current')

    const isCurrentPage = element.getAttribute('href')?.includes(hash)
    if (!isCurrentPage || isHomePage) return
    element.classList.add('is-current')
  })

  if (isHomePage) navItemElements[0].classList.add('is-current')

  // todo
  const mediaSize760 = window.matchMedia('(max-width: 1080px)')
  const changeMedia = function (e) {
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

  // loadLazyImages()

  const textarea1 = document.querySelector('#ta-example-one')
  const textarea2 = document.querySelector('#ta-example-two')

  if (textarea1 && textarea2) {
    textarea1.addEventListener('mouseup', onMouseUp, false)
    textarea2.addEventListener('mouseup', onMouseUp, false)
  }

  // // ! 디자인시스템에 추가한 거 임시
  document.querySelector('.js-default-font')?.addEventListener('click', () => document.body.classList.toggle('font-default'))

  // todo
  const sheetElement = document.querySelector('.js-sheet')
  const sheetCloseElement = sheetElement?.querySelector('.js-sheet-close')

  window.addEventListener('load', () => {
    sheetElement?.classList.add('is-visible')
  })
  sheetCloseElement?.addEventListener('click', () => {
    sheetCloseElement.parentElement?.classList.remove('is-visible')
  })

  // function format(command, value) {
  //   document.execCommand(command, false, value);
  // }
  const passwordTest = document.querySelector('.js-password-test')
  passwordTest?.addEventListener('keyup', validatePasswordTest)

  const tempElement = document.body
  const validations = {
    length: false,
  }

  function validatePasswordTest(event) {
    const { value } = event.target

    tempElement.classList.toggle('is-valid1', value.length > 12 && value.length < 18)
    // 영문소문자/영문대문자/숫자포함
    tempElement.classList.toggle('is-valid2', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(value))
    tempElement.classList.toggle('is-valid3', /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g.test(value))
    // 동일한 문자 6개 연속
    tempElement.classList.toggle('is-valid4', /([A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?])\1{5,}/g.test(value))
  }

  input.checkbox({ checkAllSelector: '.js-checkall', checkSelector: '.js-check' })
  input.file()
  // input.textarea()
  input.quantity()

  toggleElement({ selector: '.js-toggle' })

  tab()
  modal({ selector: '.js-modal' })

  // positionSticky({ selector: '.js-post-head', addClass: 'is-sticky-post-head', isPassed: true })

  scrollAnimation({ selector: '.js-observer' })
  scrollspy({ menusSelector: '.js-scrollspy-trigger', sectionsSelector: '.js-scrollspy-section' })

  parallax('.js-parallax')

  // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
  // document.addEventListener('scroll', throttle(test))

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

let currentPage = 1
const DATA_PER_PAGE = 10
const lastPage = 10

function fetchData(currentPage) {
  const list = document.querySelector('.footer')
  if (!list) return

  for (let i = (currentPage - 1) * DATA_PER_PAGE + 1; i <= currentPage * DATA_PER_PAGE; i++) {
    const li = document.createElement('li')
    li.textContent = `${currentPage}페이지 : ${i}번째 데이터`
    list.appendChild(li)
  }
}

function observeLastChild(intersectionObserver) {
  const listItems = document.querySelectorAll('.footer li')
  listItems.forEach(element => {
    if (currentPage >= lastPage) {
      intersectionObserver.disconnect()
      return
    }
    if (element.nextSibling) return

    intersectionObserver.observe(element) // el에 대하여 관측 시작
  })
}

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
      // ! infinite scroll
      // fetchData()
    })
  }
  // const fetchPosts: () => Promise<HTTPResponse<{ posts: any[] }>> = async () => {
  async function fetchData() {
    try {
      const URL =
        'https://gist.githubusercontent.com/prof3ssorSt3v3/1944e7ba7ffb62fe771c51764f7977a4/raw/c58a342ab149fbbb9bb19c94e278d64702833270/infinite.json'
      const response = await fetch(URL)
      if (!response.ok) throw 'Something went wrong.'

      let data = await response.json()

      data.items.forEach(item => {
        const view = document.querySelector('body')
        //todo fragmentElement
        if (!view) return

        view.insertAdjacentHTML(
          'beforeend',
          `<div style="height:120px;line-height:120px;background:var(--color-accent);text-align:center;">무한스크롤 ${item.name}</div>`,
        )
      })
    } catch (error) {}
  }
}

function onMouseUp(e) {
  const activeTextarea = document.activeElement as HTMLTextAreaElement

  const { id, value, selectionStart, selectionEnd } = activeTextarea
  const selection = value.substring(selectionStart, selectionEnd)

  const outputElement = document.querySelector('#output-element') as HTMLElement
  const outputText = document.querySelector('#output-text') as HTMLElement

  outputElement.innerHTML = id
  outputText.innerHTML = selection
  console.log(activeTextarea.tabIndex)
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

class Body {
  bodyElement: HTMLBodyElement | null

  constructor(selector) {
    this.bodyElement = document.querySelector(selector)
  }

  getElement() {
    console.log(this.bodyElement)
  }

  toggleClass(classNames) {
    this.bodyElement?.classList.toggle(classNames)
  }
}

const test1 = new Body('body')
// console.log('@@@@@', test1.getElement())
// test1.toggleClass('fuck')

class SDSChip extends HTMLElement {
  constructor() {
    super()
    // this.innerHTML = `<button class="chip"></button>`
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('button')
    // container.classList.add('chip')
    container.setAttribute('class', 'chip')

    const label = document.createElement('span')
    label.setAttribute('class', 'chip-label')

    this.addEventListener('click', () => alert('custom element'))

    shadow.appendChild(container)

    // Apply external styles to the shadow dom
    const linkElem = document.createElement('link')
    linkElem.setAttribute('rel', 'stylesheet')
    linkElem.setAttribute('href', '/public/stylesheets/components/chip_test.css')

    // ! webpack css

    // Attach the created elements to the shadow dom
    shadow.appendChild(linkElem)
    container.appendChild(label)

    label.textContent = this.label

    if (this.type === 'primary') container.classList.add('is-primary')
  }

  get size() {
    return this.getAttribute('size')
  }
  set size(value) {
    if (value) this.setAttribute('size', value)
  }

  get type() {
    return this.getAttribute('type')
  }
  set type(value) {
    if (value) this.setAttribute('type', value)
  }

  get label() {
    return this.getAttribute('label')
  }
  set label(value) {
    if (value) this.setAttribute('label', value)
  }
  connectedCallback() {
    // this.textContent = this.label
  }

  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

class CloseButton extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = `
      <button class="chip">
        <span class="material-symbols-outlined">close</span>
      </button>
    `
    this.addEventListener('click', () => alert('customElements sample'))
  }

  connectedCallback() {
    console.log('connected!', this)
  }

  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

// function updateStyle(elem) {
// const shadow = elem.shadowRoot
// shadow.querySelector('style').textContent = `
//   div {
//     width: ${elem.getAttribute('l')}px;
//     height: ${elem.getAttribute('l')}px;
//     background-color: ${elem.getAttribute('c')};
//   }
// `
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

//////////////////////////////
// document.addEventListener('DOMContentLoaded', function() {
//   var lazyloadImages

//   if ('IntersectionObserver' in window) {
//     lazyloadImages = document.querySelectorAll('.lazy')
//     var imageObserver = new IntersectionObserver(function(entries, observer) {
//       entries.forEach(function(entry) {
//         if (entry.isIntersecting) {
//           var image = entry.target
//           image.src = image.dataset.src
//           image.classList.remove('lazy')
//           imageObserver.unobserve(image)
//         }
//       })
//     })

//     lazyloadImages.forEach(function(image) {
//       imageObserver.observe(image)
//     })
//   } else {
//     var lazyloadThrottleTimeout
//     lazyloadImages = document.querySelectorAll('.lazy')

//     function lazyload() {
//       if (lazyloadThrottleTimeout) {
//         clearTimeout(lazyloadThrottleTimeout)
//       }

//       lazyloadThrottleTimeout = setTimeout(function() {
//         var scrollTop = window.pageYOffset
//         lazyloadImages.forEach(function(img) {
//           if (img.offsetTop < window.innerHeight + scrollTop) {
//             img.src = img.dataset.src
//             img.classList.remove('lazy')
//           }
//         })
//         if (lazyloadImages.length == 0) {
//           document.removeEventListener('scroll', lazyload)
//           window.removeEventListener('resize', lazyload)
//           window.removeEventListener('orientationChange', lazyload)
//         }
//       }, 20)
//     }

//     document.addEventListener('scroll', lazyload)
//     window.addEventListener('resize', lazyload)
//     window.addEventListener('orientationChange', lazyload)
//   }
// })
