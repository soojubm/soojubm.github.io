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
document.addEventListener('DOMContentLoaded', () => {
  // Define the new web component
  if ('customElements' in window) {
    // customElements.define('chip', Chip)
    // customElements.define('fancy-button', FancyButton, { extends: 'button' })
    // customElements.define('sjb-entity', Entity)
    window.customElements.define('close-button', CloseButton)
  }
})

window.addEventListener('load', detectLoad)

document.addEventListener('DOMContentLoaded', domEvents)
window.removeEventListener('hashchange', domEvents)
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

const debounce = (callback, delay) => {
  let timerId
  return event => {
    // delay가 경과하기 이전에 이벤트가 발생하면 이전 타이머를 취소하고 새로운 타이머를 재설정
    // delay보다 짧은 간격으로 이벤트가 발생하면 callback은 호출되지 않는다.
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(callback, delay, event)
  }
}

// ! scroll rAF
const throttle2 = (callback, delay) => {
  let timerId
  return event => {
    // delay가 경과하기 전에 이벤트가 발생하면 아무동작도 하지 않는다.
    // delay가 경과했을 때 이벤트가 발생하면서 새로운 타이머를 재설정한다.
    // 따라서 delay 간격으로 callback이 호출된다.
    if (timerId) return
    timerId = setTimeout(
      () => {
        callback(event)
        timerId = null
      },
      delay,
      event,
    )
  }
}
// window.addEventListener('scroll', throttle2(scrollProgress, 50), true)

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
document.addEventListener('DOMContentLoaded', () => {
  carousel()
})
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
    'signifier',
    'presentations',
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
console.log('@@@@@', test1.getElement())

test1.toggleClass('fuck')

class CloseButton extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = `
      <button class="chip">
        <span class="material-symbols-outlined">close</span>
      </butt>
    `
    this.addEventListener('click', () => console.log('test'))
  }

  connectedCallback() {
    console.log('connected!', this)
  }

  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

// customElements.define('hello-button', HelloButton, { extends: 'button' })

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
// class Entity extends HTMLElement {
//   constructor() {
//     super()
//     // this.name = 'no name'
//     this.addEventListener('click', () => this.toggle())

//     this.innerHTML = `
//       <div class="item">
//         <figure class="item-avatar"></figure>
//         <b class="item-name">this.size</b>
//       </div>
//     `
//   }
//   toggle() {
//     this.classList.toggle('test')
//     alert(this.size)
//   }
//   static get observedAttributes() {
//     return ['size', 'test']
//   }

//   // set value(val) {
//   //   if (val) {
//   //     this.setAttribute('value', val)
//   //   } else {
//   //     this.removeAttribute('value')
//   //   }
//   // }

//   get size() {
//     return this.hasAttribute('size')
//   }

//   // set disabled(val) {
//   //   if (val) {
//   //     this.setAttribute('disabled', val)
//   //   } else {
//   //     this.removeAttribute('disabled')
//   //   }
//   // }
//   connectedCallback() {
//     console.log('connected!', this)
//   }

//   disconnectedCallback() {
//     console.log('disconnected', this)
//   }

//   attributeChangedCallback(name, oldValue, newValue) {
//     console.log('changed', name, oldValue, newValue, this)

//     if (name === 'logout') {
//       // ...
//     }
//   }
// }
// class FancyButton extends HTMLButtonElement {
//   constructor() {
//     super() // always call super() first in the constructor.
//     this.addEventListener('click', e => this.drawRipple(e.offsetX, e.offsetY))
//   }

//   // Material design ripple animation.
//   drawRipple(x, y) {
//     alert()
//     let div = document.createElement('div')
//     div.classList.add('ripple')
//     this.appendChild(div)
//     div.style.top = `${y - div.clientHeight / 2}px`
//     div.style.left = `${x - div.clientWidth / 2}px`
//     div.style.backgroundColor = 'currentColor'
//     div.classList.add('run')
//     div.addEventListener('transitionend', e => div.remove())
//   }
// }

// const template = document.createElement('template')

// template.innerHTML = `
//   <style>
//     :host {
//       display: inline-block;
//       background: crimson;
//       width: 24px;
//       height: 24px;
//       --size-medium: 24px;
//       --size-tiny: 16px;
//     }
//     :host([hidden]) {
//       display: none;
//     }
//     :host([checked]) {
//       background: blue;
//     }
//     :host([disabled]) {
//       background:green;
//     }
//     :host([checked][disabled]) {
//       background: yellow;
//     }

//     .checkbox,.radio {display:block;position:relative;}
//     input[type=checkbox] {width:0;height:0;opacity:0;position:absolute;}
//     input[type=checkbox] ~ label {display:flex;align-items:center;height:var(--size-medium);padding-left:calc(var(--size-tiny) + var(--space-2));line-height:1rem;position:relative;}
//     input[type=checkbox] + label:before {content:'';display:block;width:var(--size-tiny);height:var(--size-tiny);border-radius:4px;border:var(--border);box-sizing:border-box;position:absolute;left:0;}
//     input[type=checkbox] + label:after {content:'';display:none;width:6px;height:2px;border-left:2px solid;border-bottom:2px solid;border-color:var(--gray200);position:absolute;left:4px;top:13px;transform:rotate(-45deg);}
//     input[type=checkbox]:checked + label:before {border-color:var(--color-primary);animation:ripple2 0.2s linear forwards;}
//     input[type=checkbox]:checked + label:after {display:block;border-color:var(--color-primary);}
//     input[type=checkbox]:disabled + label {color:var(--gray200);cursor:not-allowed;}
//     input[type=checkbox]:disabled + label:before {background:var(--gray200);border-color:var(--gray200);}
//     input[type=checkbox]:disabled + label:after {border-color:var(--gray0);}
//     input[type=checkbox][indeterminate=true] + label:before,
//     input[type=checkbox][data-indeterminate=true] + label:before {border-color:var(--green800);background:var(--green100);}
//     input[type=checkbox][indeterminate=true] + label:after,
//     input[type=checkbox][data-indeterminate=true] + label:after {display:block;width:8px;background:var(--color-primary);border:none;left:4px;top:48%;transform:rotate(0deg);}

//   </style>
// `
// class HowToCheckbox extends HTMLElement {
//   static get observedAttributes() {
//     return ['checked', 'disabled', 'label']
//   }

//   constructor() {
//     super()
//     this.attachShadow({ mode: 'open' })

//     let wrapper = document.createElement('div')
//     wrapper.setAttribute('class', 'checkbox')
//     let label = document.createElement('label')
//     label.setAttribute('class', 'checkbox-label')
//     let text = this.getAttribute('label')
//     label.textContent = text
//     let input = document.createElement('input')
//     input.setAttribute('type', 'checkbox')
//     input.setAttribute('checked', 'false')
//     input.setAttribute('class', 'checkbox-input')
//     wrapper.appendChild(input)
//     wrapper.appendChild(label)

//     // 외부 스타일을 shadow dom에 적용합니다
//     // const linkElem = document.createElement('link')
//     // linkElem.setAttribute('rel', 'stylesheet')
//     // linkElem.setAttribute('href', '/public/stylesheets/base/form.scss')
//     // this?.shadowRoot?.appendChild(linkElem)
//     this?.shadowRoot?.appendChild(wrapper)
//     this?.shadowRoot?.appendChild(template.content.cloneNode(true))
//   }

//   connectedCallback() {
//     if (!this.hasAttribute('role')) this.setAttribute('role', 'checkbox')
//     if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0')

//     this._upgradeProperty('checked')
//     this._upgradeProperty('disabled')

//     this.addEventListener('keyup', this._onKeyUp)
//     this.addEventListener('click', this._onClick)
//   }
//   disconnectedCallback() {
//     this.removeEventListener('keyup', this._onKeyUp)
//     this.removeEventListener('click', this._onClick)
//   }

//   _upgradeProperty(prop) {
//     if (!this.hasOwnProperty(prop)) return

//     let value = this[prop]
//     delete this[prop]
//     this[prop] = value
//   }

//   set checked(value) {
//     this.toggleAttribute('checked', Boolean(value))
//   }

//   get checked() {
//     return this.hasAttribute('checked')
//   }
//   get disabled() {
//     return this.hasAttribute('disabled')
//   }

//   set disabled(value) {
//     const isDisabled = Boolean(value)
//     if (isDisabled) this.setAttribute('disabled', '')
//     else this.removeAttribute('disabled')
//   }

//   attributeChangedCallback(name, oldValue, newValue) {
//     const hasValue = newValue !== null

//     if (name === 'checked') {
//       this.setAttribute('aria-checked', hasValue.toString())
//     }
//     if (name === 'disabled') {
//       this.setAttribute('aria-disabled', hasValue.toString())
//       this.toggleAttribute('tabindex', hasValue)

//       if (hasValue) this.blur()
//     }
//   }

//   _onKeyUp(event) {
//     if (event.altKey) return

//     switch (event.keyCode) {
//       case event.keyCode.SPACE:
//         event.preventDefault()
//         this._toggleChecked()
//         break
//       default:
//         return
//     }
//   }

//   _onClick(event) {
//     this._toggleChecked()
//   }
//   _toggleChecked() {
//     if (this.disabled) return

//     this.checked = !this.checked
//     this.dispatchEvent(
//       new CustomEvent('change', {
//         detail: {
//           checked: this.checked,
//         },
//         bubbles: true,
//       }),
//     )
//   }
// }

// class Chip extends HTMLButtonElement {
//   constructor() {
//     super()
//     this.innerHTML = `test`

//     this.addEventListener('click', () => alert('test'))
//   }
//   connectedCallback() {
//     console.log('connected!', this)
//   }

//   disconnectedCallback() {
//     console.log('disconnected', this)
//   }
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
