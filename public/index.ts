'use strict'

import './stylesheets/style.scss'

import routePage, { routes } from './javascripts/router'
import { detectLoad, lockBodyElement, unlockBodyElement } from './javascripts/load'
import carousel from './javascripts/event/carousel'
import event from './javascripts/event/index'
import input from './javascripts/input/index'
import darkTheme from './javascripts/local/darkTheme'

import { stopAnimation, throttle } from './javascripts/utils/optimizationUtils'

// import { validity } from './javascripts/utils/validations'
// import { copyClipboard } from './javascripts/utils/formatUtils.js'

// todo 네이밍을 다시하고 lockbody는 유틸성
document.addEventListener('DOMContentLoaded', lockBodyElement)
window.addEventListener('load', detectLoad)

window.addEventListener('hashchange', initializeNavbar)
window.addEventListener('hashchange', domEvents)

document.addEventListener('DOMContentLoaded', domEvents)
document.addEventListener('DOMContentLoaded', () => darkTheme('.js-darkmode'))

document.addEventListener('DOMContentLoaded', () => {
  stopAnimation()

  // lockbody
  // 여러 개 묶여 있음.
  event.toggleClass({
    selector: '.js-navbar-toggle',
    // activeClassname: 'is-navbar-active'
  })
  // event.positionSticky({ selector: '.js-titlebar', addClass: 'is-sticky-titlebar', isPassed: false })
})

// document.addEventListener('click', event => {
//   const closestElement = (event.target as HTMLElement).closest('.js-navbar-toggle')
//   if (!closestElement) return

//   closestElement.classList.toggle('is-active')

//   if (closestElement.classList.contains('is-active')) {
//     lockBodyElement()
//   } else {
//     unlockBodyElement()
//   }

//   const navbarMenu = closestElement.nextElementSibling
// })

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

export const DARK_THEME_CLASS = 'theme-dark'
export const LIGHT_THEME_CLASS = 'theme-light'
const DARKTHEME_SELECTOR = '.js-darkmode'

// todo darktheme 이벤트전파이슈
// tokens에 있는 버튼 때문에 domEvents로
// document.addEventListener('DOMContentLoaded', detectTheme)
// document.addEventListener('click', toggleDarkTheme)

async function domEvents() {
  lazyLoading()

  await routePage()
  // detectTheme()

  darkTheme('.js-darkmode2')

  // const hash = window.location.hash.substring(1)
  // const page = routes.find(route => route.path.substring(1) === hash)
  // const pageTitleElement = document.querySelector('.js-page-title')

  // if (pageTitleElement) {
  //   pageTitleElement.textContent = page?.name || '페이지타이틀'
  // }

  const chip = document.querySelector('.js-chip')
  const chipElements = chip?.querySelectorAll('button')
  // todo selector
  if (chip && chipElements) {
    chipElements.forEach(element => {
      element.addEventListener('click', () => {
        chipElements.forEach(element => element.classList.remove('is-active'))
        element.classList.add('is-active')
      })
    })
  }

  // // ! 디자인시스템에 추가한 거 임시

  document.querySelector('.js-default-font')?.addEventListener('click', () => {
    document.body.classList.toggle('font-default')
  })

  // function format(command, value) {
  //   document.execCommand(command, false, value);
  // }

  input.checkbox({ checkAllSelector: '.js-checkall', checkSelector: '.js-check' }).initialize()
  input.file()
  // input.textarea()
  input.number()

  // event.toggleClass({ selector: '.js-accordion' })
  event.toggleClass({ selector: '.js-toggle' })

  event.tab()
  event.modal({ selector: '.js-modal' })

  event.positionSticky({ selector: '.js-post-head', addClass: 'is-sticky-post-head', isPassed: true })

  event.scrollAnimation({ selector: '.js-observer' })
  event.scrollspy({ menusSelector: '.js-scrollspy-trigger', sectionsSelector: '.js-scrollspy-section' })

  event.parallax('.js-parallax')

  createGraph()
  carousel()
  focusComment()
  // countDownClock(20, 'days')
  // document.querySelector('.js-copy')?.addEventListener('click', () => copyClipboard('fafaf'))
  const grandparent = document.querySelector('.grandparent')
  const parent = document.querySelector('.parent')
  const chlidren = document.querySelector('.children')

  grandparent?.addEventListener(
    'click',
    event => {
      console.log('1. GRANDPARENT')
    },
    false,
  )
  parent?.addEventListener(
    'click',
    event => {
      console.log('2. PARENT')
    },
    false,
  )
  chlidren?.addEventListener(
    'click',
    event => {
      console.log('3. CHILDRENT')
    },
    false,
  )

  document.addEventListener(
    'click',
    event => {
      console.log('0. DOCUMENT')
    },
    { once: true },
  )

  setTimeout(() => {
    // parent?.removeEventListener('click', printHi)
  }, 2000)

  document.addEventListener('click', event => {
    const target = event.target as any
    if (!target.closest('.js-test-toggle')) return

    const conatainerElement = target.closest('.profile-body')
    const siblingElements = [...target.parentElement.children]

    conatainerElement.classList.toggle('list', target.name === 'list')

    siblingElements.forEach(siblingElement => siblingElement.classList.remove('is-selected'))
    target.classList.add('is-selected')
  })
}

function initializeNavbar() {
  const navigationTrigger = document.querySelector<HTMLElement>('.js-navbar-toggle')

  navigationTrigger?.classList.remove('is-active')
}

function createGraph() {
  // todo 지금은 바가 100px 이라서 1:1로 대입
  const graphItems = document.querySelectorAll('.js-graph .graph-item')
  if (!graphItems) return

  graphItems.forEach(element => {
    const graphItemBar = element.querySelector<HTMLElement>('.graph-item-bar')
    const graphItemValue = element.querySelector<HTMLElement>('.graph-item-value')
    if (!graphItemBar || !graphItemValue) return

    const graphValue = parseInt(graphItemValue.innerText)

    graphItemBar.style.height = `${graphValue}px`
    graphItemValue.style.bottom = `${graphValue}px`
  })
}

function calculateReadTime() {
  const readTimeElement = document.querySelector<HTMLElement>('.post-head')
  const postContent = document.querySelector<HTMLElement>('.post-body-paragraph')
  if (!postContent || !readTimeElement) return

  const text = postContent?.textContent || postContent?.innerText
  let textLength = text.split(' ').length || 1
  const wordsPerMinute = 200
  let value = Math.ceil(textLength / wordsPerMinute)
  const result = `${value} min read`
  console.log(result)

  readTimeElement.innerText = result
}

function focusComment() {
  const commentWrite = document.querySelector<HTMLElement>('.js-comment-write')
  const commentTextfield = document.querySelectorAll<HTMLElement>('.js-comment-textfield')
  if (!commentWrite || !commentTextfield) return

  commentTextfield.forEach(element =>
    element.addEventListener('focus', () => {
      commentWrite.classList.add('is-focused')
    }),
  )
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
// company.getUserNames?.()

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

// document.addEventListener('click', event => {
// 	const filteredCountry = films.filter(item => item.country === '미국');
// 	console.log(filteredCountry);
// 	if(event.target.name === 'usa') {
// 		boardElement.innerHTML = '';
// 		filteredCountry.map(item => {
// 			boardElement.innerHTML += `
// 				<div class="board-body">
// 					<div class="board-head-title">${item.id}</div>
// 					<div class="board-head-title">${item.releaseDate}</div>
// 					<div class="board-head-title">${item.titleKorean}<div>${item.titleEnglish}</div></div>
// 					<div class="board-head-title">${item.director}</div>
// 					<div class="board-head-title">${item.country}</div>
// 				</div>`;
// 		});
// 	}
// });

// document.addEventListener('input', event => {
// 	// const helpers = document.querySelectorAll('.textfield-helper');
// 	// helpers.forEach(helper => helper.style.display = 'none');
// 	// let loginData = {email: '', password: ''};

// 	// const isEmail = event.target === email;
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

// document.addEventListener('blur', event => {}, true); // blur is not bubble

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

document.addEventListener('click', toggle)

function toggle(event) {
  const targetElement = event.target
  const { toggleid } = event.target.dataset
  if (!toggleid) return

  const ACTIVE_CLASS = 'is-active'

  targetElement.setAttribute('aria-expanded', 'true')
  targetElement.classList.toggle(ACTIVE_CLASS)

  // const targetElement = document.querySelector(toggleid)
  // targetElement.classList.toggle(ACTIVE_CLASS)
}

function scrollToTop(event) {
  if (event.target.closest('.js-to-top')) {
    event.preventDefault()
    window.scrollTo(0, 0)
  }
}

function toggleDetails(event) {
  if (!event.target.closest('.js-accordion')) return

  const targetElement = event.target.closest('.js-accordion')

  targetElement.querySelector('.accordion-panel')?.addEventListener('click', event => event.stopPropagation())

  let isExpanded = Boolean(targetElement.getAttribute('aria-expanded'))
  targetElement.setAttribute('aria-expanded', String(!isExpanded))
  targetElement.classList.toggle('is-active')

  // 패널을 포함한 전체 영역을 토글할 수 있음.
  // 따라서 accordion-item 전체를 toggle class만 해줏면 됨.
  // 1. 클릭한 패널을 토글한다.
  // 도큐먼트를 클릭하면 닫을 것인지.
  // 다른 accordion-item을 클릭했을 때 닫을 것인지?
}

function revealPassword(event) {
  const SELECTOR = '.js-view-password'
  if (!event.target.closest(SELECTOR)) return

  const targetElement = event.target.closest(SELECTOR) as any
  const inputElement = targetElement.parentNode.querySelector('input')

  const isPasswordType = inputElement.getAttribute('type') === 'password'
  const inputType = isPasswordType ? 'text' : 'password'

  inputElement.setAttribute('type', inputType)
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
          `<div style="height:120px;line-height:120px;background:gold;text-align:center;">무한스크롤 ${item.name}</div>`,
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

export function detectTheme() {
  // todo 바로 swithc 셀렉터로
  // todo 같은 기능의 버튼이 여러 군데에 있을 때.
  const savedTheme = localStorage.getItem('theme')
  if (!savedTheme) return

  const darkThemeTrigger = document.querySelectorAll(DARKTHEME_SELECTOR)
  const isDarkmode = savedTheme === DARK_THEME_CLASS

  darkThemeTrigger?.forEach((element: any) => {
    element.querySelector('input').checked = isDarkmode
  })

  document.body.classList.add(DARK_THEME_CLASS)
}

export function toggleDarkTheme(event) {
  console.log(event.target.closest(DARKTHEME_SELECTOR))

  if (!event.target.closest(DARKTHEME_SELECTOR)) return

  // const savedTheme = localStorage.getItem('theme')
  // todo removeLocalStorage
  const isDarkmode = document.body.classList.contains(DARK_THEME_CLASS)

  const darkThemeSwitch = event.target.closest(DARKTHEME_SELECTOR).querySelector('input')
  if (!darkThemeSwitch) return

  darkThemeSwitch.checked = isDarkmode
  document.body.classList.toggle(DARK_THEME_CLASS)

  localStorage.setItem('theme', isDarkmode ? DARK_THEME_CLASS : LIGHT_THEME_CLASS)
}

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
