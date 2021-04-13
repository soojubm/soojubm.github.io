'use strict'

import './stylesheets/style.scss'

import routePage from './javascripts/router'
import { initializeLoader, detectBrowser } from './javascripts/load'
import { setDarkmode, carousel } from './javascripts/setDarkMode'
// import { countDownClock } from './javascripts/countdown'
import event from './javascripts/event/index'
import input from './javascripts/input/index'

import { throttle } from './javascripts/utils/optimizationUtils'

import books from '../views/books'

// import { validity } from './javascripts/utils/validations'
// import { copyClipboard } from './javascripts/utils/formatUtils.js'
// const isScrollEnd = window.innerHeight + window.pageYOffset >= document.body.offsetHeight

document.addEventListener('readystatechange', (event: any) => {
  const { readyState } = event.target
  // event.target === document ? true
  if (readyState === 'loading') console.log('loading...')
  else if (readyState === 'interactive') console.log('initLoader')
  else if (readyState === 'complete') console.log('initApp')
})

window.addEventListener('unload', () => console.log('unload event'))

window.addEventListener('hashchange', domEvents)
window.addEventListener('hashchange', initializePage)

document.addEventListener('DOMContentLoaded', () => {
  detectBrowser()
  initializeLoader()

  domEvents()
  setDarkmode()

  event.toggleClass({ selector: '.js-navbar-toggle' }).initialize()
  
  event.toTop({ selector: '.js-to-top' })
  event.stickyElement({ targetElement: '.js-header', addClass: 'is-sticky-header', position: 'top' })

  window.addEventListener('scroll', throttle(scrollProgress), true)
  function scrollProgress() {
    const containerElement = document.querySelector<HTMLElement>('.post')
    const progressBar = document.querySelector<HTMLElement>('.post-head-progress')
    if (!containerElement || !progressBar) return

    const scrollPercent = `${(window.pageYOffset / (containerElement!.scrollHeight - window.innerHeight)) * 100}%`
    progressBar!.style.width = scrollPercent
  }
   
})



async function domEvents() {
  await routePage()

  // var counter = document.querySelector('#counter');
  // if(counter) {
  //   var number = 0;

  //   var countUp = function () {
  //     number++;
  //     counter!.textContent = String(number);
  
  //     // if the number is less than 500, run it again
  //     if (number < 500) {
  //       window.requestAnimationFrame(countUp);
  //     }
  //   };
  //   // Start the animation
  //   window.requestAnimationFrame(countUp);
  // }


  const boardElement = document.querySelector('.about-book-inner');
  if(boardElement) {
    setTimeout(() => {
      books.map(item => {
        boardElement.innerHTML += `
          <article class="bookitem">
          <figure class="bookitem-cover">
            <--
            <img src=${item.imgSrc} alt=${item.title}>
            -->
          </figure>
          <h3 class="bookitem-name">
            <span role="img" aria-label="">📙</span> ${item.title}
            <small class="bookitem-description">구글 최고의 혁신 전문가가 찾아낸 비즈니스 설계와 검증의 방법론</small>
          </h3>
          <hr />
          <p class="bookitem-byline">${item.author || '정보가 없습니다'}</p>
          <time class="bookitem-publishedyear">${item.publishedDate || '정보가 없습니다'}</time>
        </article>`;
      });
    }, 200);
  }

  // document.querySelector('.textbox-toolbar-bold')?.addEventListener('click', () => format('italic', null))
  // function format(command, value) {
  //   document.execCommand(command, false, value);
  // }
  // const themeButtonElements = document.querySelectorAll('.js-system-theme button')
  // const ACTIVE_CLASS = 'is-active'
  // let classes = []

  // themeButtonElements?.forEach((button, index) => {
  //   // classes.push(button.getAttribute('name'))
  //   // console.log(classes)
  //   button.addEventListener('click', event => {
  //     // if(index === 1) {
  //     //   document.body.classList.remove('design-system-danngn')
  //     //   document.body.classList.add('design-system-newneek')
  //     // }
  //     // else if (index === 2) {
  //     //   document.body.classList.remove('design-system-newneek')
  //     //   document.body.classList.add('design-system-danngn')
  //     // }
  //     // else {
  //     //   document.body.classList.remove('design-system-newneek')
  //     //   document.body.classList.remove('design-system-danngn')
  //     // }

  //     themeButtonElements?.forEach(button2 => {

  //       const isTarget = event.target === button2

  //       if(isTarget) {
  //         button2.classList.add(ACTIVE_CLASS)
  //         // document.body.classList.add(name)
  //       }
  //       else button2.classList.remove(ACTIVE_CLASS)
  //     })
  //   })
  // })

  // lazyLoading()

  function lazyLoading() {
    if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
      const lazyBackgrounds = [].slice.call(document.querySelectorAll('.subscribe'))
      const options = {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.1,
      }
      let observer = new IntersectionObserver(callback, options)

      lazyBackgrounds.forEach(element => observer.observe(element))
    }

    function callback(entries, observer) {
      entries.forEach(entry => {
        // If the entry is not in the viewport, do nothing
        if (!entry.isIntersecting) return
        // Stop observing
        // observer.unobserve(entry.target);
        fetchData()

        // entry.target.classList.add('visible')
        // entry.target.src = entry.target.dataset.src;
        // lazyBackgroundObserver.unobserve(entry.target)
      })
    }

    async function fetchData() {
      try {
        const URL = 'https://gist.githubusercontent.com/prof3ssorSt3v3/1944e7ba7ffb62fe771c51764f7977a4/raw/c58a342ab149fbbb9bb19c94e278d64702833270/infinite.json'
        const response = await fetch(URL)
        if (!response.ok) throw 'Something went wrong.'

        let data = await response.json()
        data.items.forEach(item => {
          const view = document.querySelector('.design-body')
          if (!view) return

          view.insertAdjacentHTML('beforeend', `<div style="height:200px;background:crimson;color:#fff;text-align:center;">무한스크룔</div>`)
        })
      } catch (error) {}
    }
  }


  // removeEventListener

  input.checkbox({ checkAllSelector: '.js-checkall', checkSelector: '.js-check' }).initialize()
  input.file()
  input.textarea()
  input.number()

  // todo : 클래스만 쓰면 되도록 되어 있는데 각각에 이벤트를 설정해주는 방향?으로
  event.modal({ selector: '.js-modal' }).initialize()

  event.toggleClass({ selector: '.js-toggle' }).initialize()
  
  event.enterTarget({ selector: '.js-hover-trigger' })
  event.tabMenu()
  event.closeParentElement({ selector: '.js-close' })
  event.stickyElement({ targetElement: '.js-post-head', addClass: 'is-sticky-post-head', position: 'bottom' })

  event.scrollAnimation()
  // event.scrollspy({ menusSelector: '.js-section', sectionsSelector: '.newneek-navbar-menu-item' })

  createGraph()
  // countDownClock(20, 'days')
  carousel()
  revealPassword()
  focusComment()

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

  // document.querySelector('.js-copy')?.addEventListener('click', () => copyClipboard('fafaf'))

  const inputTest = document.querySelector<HTMLInputElement>('.js-input-test')
  if (inputTest) {
    inputTest.addEventListener('keypress', event => {
      const key = event.which || event.keyCode
      const isNumberKey = key < 48 || key > 57 // todo ! isNumberKey 이다 지금음0 to 9
      const isSpaceKey = key === 32

      if (!isSpaceKey && isNumberKey) event.preventDefault()
    })

    // Track the current value
    let currentValue = inputTest.value || ''
    inputTest.addEventListener('input', e => {
      const target = e.target as HTMLInputElement
      if (/^[0-9\s]*$/.test(target.value)) currentValue = target.value
      else target.value = currentValue
      // Note that in this case, `e.preventDefault()` doesn't help

      // 한글 입력했을 때 커서가 맨 뒤로 감.
      // if (/^[0-9s]*$/.test(target.value)) {
      //   currentValue = target.value
      // } else {
      //   target.value = currentValue
      //   target.setSelectionRange(selection.start, selection.end)
      // }
    })

    // let selection = {};
    // inputTest.addEventListener('keydown', function(e) {
    //   const target = e.target as HTMLInputElement;
    //   selection = { start: target.selectionStart, end: target.selectionEnd };
    // });
  }

  // todo
  const list = document.querySelector('.js-display-list')
  const grid = document.querySelector('.js-display-grid')
  const works = document.querySelector('.profile-body')

  list?.addEventListener('click', () => {
    list?.classList.add('is-selected')
    grid?.classList.remove('is-selected')
    works?.classList.add('list')
  })
  grid?.addEventListener('click', () => {
    list?.classList.remove('is-selected')
    grid?.classList.add('is-selected')
    works?.classList.remove('list')
  })
}



function revealPassword() {
  const ELEMENT_CLASSNAME = '.js-view-password'
  const elements = document.querySelectorAll<HTMLElement>(ELEMENT_CLASSNAME)
  if (elements.length === 0) return

  elements.forEach(element =>
    element.addEventListener('click', () =>
      togglePassword(element?.parentNode?.querySelector<HTMLElement>('input'))
    )
  )

  function togglePassword(inputElement) {
    const isPasswordType = inputElement?.getAttribute('type') === 'password'
    let inputType = isPasswordType ? 'text' : 'password'

    inputElement?.setAttribute('type', inputType)
  }
}
 
function initializePage() {
  initializeNavbar()

  function initializeNavbar() {
    const navigationTrigger = document.querySelector<HTMLElement>('.js-navbar-toggle')
    if(!navigationTrigger) return

    if(navigationTrigger.classList.contains('is-active')) {
      navigationTrigger.classList.remove('is-active')
      navigationTrigger.nextElementSibling?.classList.remove('is-visible')
    }
  }
  function detectPage() {
    let { hash } = window.location
    const className = `page-${hash === '' ? 'design' : hash.substring(1)}`

    document.body.className = ''
    document.body.classList.add(className)
  }
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

// var getClosest = function(elem, selector) {
// 	for (; elem && elem !== document; elem = elem.parentNode) {
// 		if (elem.matches(selector)) return elem;
// 	}
// 	return null;
// };

// Promise.all([
// 	fetch('https://jsonplaceholder.typicode.com/posts'),
// 	fetch('https://jsonplaceholder.typicode.com/users')
// ])
// .then(responses => {
// 	return responses.map(response => {
// 		return response.json();
// 	});


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

// const uiData = [
//   { label: '상품 상세페이지', description :'', date :'2020.01-01', href: '#product', tags: ['기획', '디자인'] },
//   { label: '상품 카트', description :'', date :'2020-01-01', href: '#cart', tags: ['기획', '디자인'] },
//   { label: '로그인', description :'', date :'2020-01-01', href: '#login', tags: ['기획', '디자인'] },
//   { label: '비밀번호 찾기', description :'', date :'2020-01-01', href: '#forgot', tags: ['기획', '디자인'] }
// ]
// const ccc: any = document.querySelector<HTMLElement>('.js-ui');
// if(ccc) {
//   const temp = uiData.map(item => {
//     console.log(item);
//     const ttt = item.tags.map(i => `<span class="tag">${i}</span>`).join('')
//     const uiTemplate = `<a class="card" href="${item.href}">
//         <figure class="card-thumbnail" style="font-family:'DunkelSans';display:flex;align-items:center;justify-content:center;">${item.label}</figure>
//         <h3 class="card-title">${item.label}</h3>
//         <time class="card-date">${item.date}<time>
//         <div class="card-tags" role="group">
//           ${ttt}
//         </div>
//         <button class="card-more icon-button"><i class="icon-more"></i></button>
//       </a>`
//     return uiTemplate;
//   }).join('')
//   console.log(temp);
//   ccc.innerHTML = temp;
// }

// var i = 0;
// var images = ['cover1.jpg','cover2.jpg'];
// var imageElement = document.querySelector('.cover_image');
// // image.css('background-image', 'url(/img/cover1.jpg)');
// setInterval(function(){
// 	imageElement.fadeOut(1000, () => {
// 		imageElement.css('background-image', `url(${images[i++]})`);
// 		imageElement.fadeIn(1000);
// 	});
// 	if(i === images.length) i = 0;
// }, 5000);

// var elem = document.querySelector('#item-3');
// var parent = elem.parentNode;
// var parentNodes = parent.children;
// var parentNodesArray = Array.from(parent.children);
// var siblings = parentNodesArray.filter(function (sibling) {
// 	return sibling !== elem;
// });

// var counter = document.querySelector('#counter');
// var number = 0;
// var countUp = function () {
// 	// Increase number by 1
// 	number++;
// 	// Update the UI
// 	counter.textContent = number;
// 	// if the number is less than 500, run it again
// 	if (number < 500) {
// 		window.requestAnimationFrame(countUp);
// 	}
// };
// // Start the animation
// window.requestAnimationFrame(countUp);

// // Setup the animation
// var animation = window.requestAnimationFrame(function () {
// 	console.log('ran!');
// });

// window.cancelAnimationFrame(animation);

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

function focusComment() {
  const commentWrite = document.querySelector<HTMLElement>('.js-comment-write')
  const commentTextField = document.querySelectorAll<HTMLElement>('.js-comment-textfield')

  commentTextField!.forEach(element =>
    element.addEventListener('focus', () => {
      commentWrite!.classList.add('is-focused')
    }),
  )
}

// document.documentElement.className += ' supports-date';

// if(window.matchMedia('(min-width:888px)').matches) {}

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
// const signupForm = document.querySelector('.js-input-email')
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
//       const isLast = currentPage >= lastPage
//       if (isLast) {
//         intersectionObserver.disconnect()
//         return
//       }
//       if(element.nextSibling) return

//       intersectionObserver.observe(element) // el에 대하여 관측 시작
//     })
// }
