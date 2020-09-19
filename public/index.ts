'use strict'

import './stylesheets/style.scss'
import routePage from './javascripts/router'
import { loader, detectBrowser } from './javascripts/load'
import { createGraph } from './javascripts/ui'
import { setDarkmode, carousel } from './javascripts/setDarkMode'
import { countDownClock } from './javascripts/countdown'
import event from './javascripts/event/index'
import input from './javascripts/input/index'

import { validity } from './javascripts/utils/validations'

const intersectionObserver = new IntersectionObserver((entries) => {
  if (entries[0].intersectionRatio <= 0) return;

  console.log('Loaded new items');
})
// // start observing
const tempp = document.querySelector('.footer')
tempp && intersectionObserver.observe(tempp);



document.addEventListener('readystatechange', (event: any)  => {
  // event.target === document ? true
  if(event.target.readyState === 'loading') console.log('loading...')
  else if (event.target.readyState === 'interactive') console.log('initLoader')
  else if (event.target.readyState === 'complete') console.log('initApp')
})


// document.documentElement.className += ' supports-date';
// div.classList.replace("foo", "bar");

// if(window.matchMedia('(min-width:800px)').matches) {}

// function addToPendingWork(promise) {
//   busyspinner.hidden = false
//   pendingOps.add(promise)

//   const cleanup = () => {
//     pendingOps.delete(promise)
//     busyspinner.hidden = pendingOps.size === 0
//   }
//   promise.then(cleanup).catch(cleanup)
// }

window.addEventListener('unload', () => console.log('unload EVENT'))
window.addEventListener('offline', () => {
  const offlineElement = document.querySelector<HTMLElement>('.js-offline')
  offlineElement!.hidden = true
})

const domEvents = async () => {



    await routePage()




    const lazyBackgrounds = [].slice.call(document.querySelectorAll('.lazy-background'))
    console.log(lazyBackgrounds)
    if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
      let lazyBackgroundObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('visible')
          lazyBackgroundObserver.unobserve(entry.target)

          // if (entry.intersectionRatio > 0) entry.target.classList.add('tada')
          // else entry.target.classList.remove('tada')
        })
      })

      lazyBackgrounds.forEach(element => lazyBackgroundObserver.observe(element))
    }

    // 회원가입 버튼을 눌렀을 때 유효성을 체크한다.
    // const { signup } = document
    // const { email, password } = signup
    // signup.addEventListener('submit', event => {
    //   event.preventDefault()
    //   alert()
    //   // console.log(email, password)
    //   //	userId.nextSibling.nextSibling.innerHTML = '5~20자의 영문 소문자와 숫자, 특수기호(_),(-)만 사용 가능합니다.';
    //   // 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
    // })

    let formChanged = false;
    const signupForm = document.querySelector('.js-input-email')
    signupForm?.addEventListener('change', () => {
      formChanged = true
    })
    window.addEventListener('beforeunload', event => {
      if (!formChanged) return
      event.preventDefault() // 모든 브라우저에서 지원하는 것은 아님.
      event.returnValue = ''
    })

    input.checkbox({ checkAllSelector: '.js-checkall', checkSelector: '.js-check' }).setEvent()
    input.file()
    input.textarea()
    input.number()
    
    event.modal({ selector: '.js-modal' }).setEvent()
    event.toggleClass({ selector: '.js-toggle' }).setEvent()
    event.enterTarget({ selector: '.js-hover-trigger' })
    event.tabMenu()
    event.close({ selector: '.js-close' })
    event.toTop({ selector: '.js-to-top' })

    event.scrollAnimation()
    // event.scrollspy({ menusSelector: '.js-section', sectionsSelector: '.newneek-navbar-menu-item' })

    createGraph()
    countDownClock(20, 'days')
    carousel()
    revealPassword()
    focusComment()

    document.querySelector('.js-copy')?.addEventListener('click', () => copyToClipboard('fafaf'))

    const inputTest = document.querySelector<HTMLInputElement>('.js-input-test')
    if (inputTest) {
      inputTest.addEventListener('keypress', function(e) {
        const key = e.which || e.keyCode
        const isNumberKey = key < 48 || key > 57 // todo ! isNumberKey 이다 지금음0 to 9
        const isSpaceKey = key === 32
        if (!isSpaceKey && isNumberKey) {
          e.preventDefault()
        }
      })

      // let selection = {};
      // inputTest.addEventListener('keydown', function(e) {
      //   const target = e.target as HTMLInputElement;
      //   selection = {
      //     start: target.selectionStart,
      //     end: target.selectionEnd,
      //   };
      // });

      // Track the current value
      let currentValue = inputTest.value || ''
      inputTest.addEventListener('input', function(e) {
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
    }

    // event.customCursor()

  // 임시
  const list = document.querySelector('.js-display-list')
  const grid = document.querySelector('.js-display-grid')
  const works = document.querySelector('.profile-body')

  const buttons = document.querySelector('.js-display-list')
  buttons?.addEventListener('click', (event: any) => {
    console.log(event.target.parentNode, event.target.name)
    event.target.parentNode.classList.add('is-temp')
    
  })
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

window.addEventListener('hashchange', domEvents)
window.addEventListener('hashchange', initailizePage)



function revealPassword() {
  const toggleElement = document.querySelectorAll<HTMLElement>('.js-view-password')
  if(toggleElement.length === 0) return

  toggleElement.forEach(element =>
    element.addEventListener('click', () => {
      const passwordElement = element.parentNode?.querySelector<HTMLElement>('input')
      const isPasswordType = passwordElement?.getAttribute('type') === 'password'
      const type = isPasswordType ? 'text' : 'password'

      passwordElement?.setAttribute('type', type)
    })
  )
}

function initailizePage() {
  (function initializeMenu() {
    const navigationTrigger = document.querySelector<HTMLElement>('.js-navbar-toggle')

    navigationTrigger?.classList.remove('is-active')
    navigationTrigger?.nextElementSibling?.classList.remove('is-visible')
  })

  function notifyThisPage() {
    let { hash } = window.location
    const className = `page-${hash === '' ? 'design' : hash.substring(1)}`
  
    document.body.className = ''
    document.body.classList.add(className)
  }

  function detectHeaderTheme() {
    const pageHeadElement = document.querySelector<HTMLElement>('.js-header')
    const pages = ['#design', '']
    const isWhite = pages.includes(window.location.hash)
    const ACTIVE_CLASS = 'is-white'

    if (isWhite) {
      pageHeadElement?.classList.add(ACTIVE_CLASS)
    } else {
      pageHeadElement?.classList.remove(ACTIVE_CLASS)
    }
  }

  notifyThisPage()
  detectHeaderTheme()
}



loader()


document.addEventListener('DOMContentLoaded', () => {
  initailizePage()
  detectBrowser()
  setDarkmode()

  // event.stickyElement({ targetElement: '.js-navbar', addClass: 'is-sticky-navbar' }
  event.stickyElement({ targetElement: '.js-topbar', addClass: 'is-sticky-topbar' })
  event.stickyElement({ targetElement: '.js-post-head', addClass: 'is-sticky-post-head' })

  // hashchange 될 때마다 이벤트 만들어짐;
  event.toggleClass({ selector: '.js-navbar-toggle' }).setEvent()

  domEvents()

  window.addEventListener('scroll', () => {
    const isScrollEnd = window.innerHeight + window.pageYOffset >= document.body.offsetHeight
    if(isScrollEnd) console.log('detect bottom')
  })

  window.addEventListener('scroll', scrollProgress, true)
})

function scrollProgress() {
  const post = document.querySelector<HTMLElement>('.post')
  const progressBar = document.querySelector<HTMLElement>('.post-head-progress')
  if(!post || !progressBar) return

  const scrollPercent = `${(window.pageYOffset / (post!.scrollHeight - window.innerHeight)) * 100}%`
  progressBar!.style.width = scrollPercent
}

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

// 연도별 감독별 나라별
// const boardElement = document.querySelector('.board');
// if(!boardElement) return null;
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
// setTimeout(() => {
// 	films.map(item => {
// 		boardElement.innerHTML += `
// 		<div class="board-body">
// 			<div class="board-head-title">${item.id}</div>
// 			<div class="board-head-title">${item.releaseDate}</div>
// 			<div class="board-head-title">${item.titleKorean}<div>${item.titleEnglish}</div></div>
// 			<div class="board-head-title">${item.director}</div>
// 			<div class="board-head-title">${item.country}</div>
// 		</div>`;
// 	});
// }, 200);

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

// const errorHelper = () => {
// };

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

function copyToClipboard(text) {
  const textareaElement = document.createElement('textarea')
  document.body.appendChild(textareaElement)

  textareaElement.value = text
  textareaElement.select() // focus?도 해야함?
  document.execCommand('copy')
  document.body.removeChild(textareaElement)

  alert('복사 완료! 이제 "붙여넣기" 해주세요.😉')
  // try {
  //   document.execCommand('copy');
  // } catch (error) {
  // } finally {
  //   document.body.removeChild(textareaElement);
  // }
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
// // Static access with default value
// const value = company?.name ?? 'default name'
// // Dynamic access with default value
// const companyName = company?.['name'] ?? 'default value'
// // Function call
// company.getUserNames?.()


// var section1 = document.querySelector('.design-article')
// section1?.addEventListener('click', function() {
//   smoothScroll('.footer', 1000)
// })



// var elem = document.querySelector('#item-3');
// // Step 1
// var parent = elem.parentNode;
// // Step 2
// var parentNodes = parent.children;
// // Step 3
// var parentNodesArray = Array.from(parent.children);
// // Step 4
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

// // Cancel it
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
  const commentWrite = document.querySelector('.js-comment-write')
  const commentTextField = document.querySelectorAll('.js-comment-textfield')

  commentTextField!.forEach(element =>
    element.addEventListener('focus', () => {
      commentWrite!.classList.add('is-focused')
    })
  )
}


