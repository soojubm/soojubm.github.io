'use strict'

import './stylesheets/style.scss'
import routePage from './javascripts/router'
import { loader, detectBrowser, adjustTopPadding } from './javascripts/load'
import { setGraph } from './javascripts/ui'
import { setDarkmode, carousel } from './javascripts/setDarkMode'
import { countDownClock } from './javascripts/countdown'
import event from './javascripts/event/index'
import input from './javascripts/input/index'

// close 보다 delete가 포괄적인 네이밍

// var evens = _.remove(array, function(n) {
//   return n % 2 == 0;
// });

// function removeItem(items, removable) {
//   const index = items.indexOf(removable);
//   return [...items.slice(0, index), ...items.slice(index+1)];
// }

// throw new Error

// If you do not return anything, a function will return undefined, which validates as falsey.

//document.documentElement.className += ' supports-date';
// div.classList.replace("foo", "bar");

// if(window.matchMedia('(min-width:800px)').matches) {}

// let formChanged = false;
// myForm.addEventListener('change', () => formChanged = true);
// window.addEventListener('beforeunload', (event) => {
//   if (formChanged) {
//     event.returnValue = 'You have unfinished changes!';
//   }
// });

const pendingOps = new Set()

window.addEventListener('beforeunload', event => {
  if (pendingOps.size) {
    event.returnValue = 'There is pending work. Sure you want to leave?'
  }
  // navigator.sendBeacon('/log', analyticsData)

})

window.addEventListener('unload', function(event) {
  console.log('unload EVENT');
});
// function addToPendingWork(promise) {
//   busyspinner.hidden = false
//   pendingOps.add(promise)

//   const cleanup = () => {
//     pendingOps.delete(promise)
//     busyspinner.hidden = pendingOps.size === 0
//   }
//   promise.then(cleanup).catch(cleanup)
// }

window.addEventListener('offline', () => {
  const offlineElement = document.querySelector<HTMLElement>('.js-offline')
  if (!offlineElement) return

  offlineElement.style.display = 'block'
})

const domEvents = () => {
  routePage().then(() => {
    event.modal({ selector: '.js-modal' }).setEvent()

    input.checkbox({ checkAllSelector: '.js-checkall', checkSelector: '.js-check' }).setEvent()
    event.toggleClass({ selector: '.js-toggle' }).setEvent()
  
    event.enterTarget({ selector: '.js-hover-trigger' })
    event.tabMenu()
    event.close({ selector: '.js-close' })
    event.toTop({ selector: '.js-to-top' })

    event.scrollAnimation()
    event.scrollspy({ menusSelector: '.js-section', sectionsSelector: '.newneek-navbar-menu-item' })

    input.file()
    input.textarea()
    input.number()

    setGraph()
    countDownClock(20, 'days')
    carousel()

    revealPassword()

    // event.customCursor()

    // 임시
    const list = document.querySelector('.js-display-list')
    const grid = document.querySelector('.js-display-grid')
    const works = document.querySelector('.profile-body')
    if (list && grid && works) {
      list.addEventListener('click', () => {
        list.classList.add('is-selected')
        grid.classList.remove('is-selected')
        works.classList.add('list')
      })
      grid.addEventListener('click', () => {
        list.classList.remove('is-selected')
        grid.classList.add('is-selected')
        works.classList.remove('list')
      })
    }

    const focusComment = () => {
      const commentWrite = document.querySelector('.js-comment-write')
      const commentTextField = document.querySelectorAll('.js-comment-textfield')
      if (commentWrite || commentTextField) {
        commentTextField.forEach(element =>
          element.addEventListener('focus', () => {
            commentWrite && commentWrite.classList.add('is-focused')
          }),
        )
      }
    }
    focusComment()
  })
}

window.addEventListener('hashchange', domEvents)
window.addEventListener('hashchange', initailizePage)
window.addEventListener('hashchange', detectHeaderTheme)

function detectHeaderTheme() {
  const pageHeadElement = document.querySelector('.header')
  if (!pageHeadElement) return

  const pages = ['#design', '']
  const isWhite = pages.includes(window.location.hash)

  if (isWhite) {
    pageHeadElement.classList.add('is-white')
  } else {
    pageHeadElement.classList.remove('is-white')
  }
}

function revealPassword() {
  const toggleElement = document.querySelectorAll<HTMLElement>('.view-password')
  if(!toggleElement) return

  toggleElement.forEach(element => addEventListener('click', () => {
    const passwordElement = element.parentNode?.querySelector<HTMLElement>('input')
    console.log(passwordElement)
    if(!passwordElement) return

    const typeAttribute = passwordElement.getAttribute('type')
    const type = typeAttribute === 'password' ? 'text' : 'password'
    passwordElement.setAttribute('type', type)
  }))
}

function initailizePage() {
  const navigationTrigger = document.querySelector<HTMLElement>('.navbar-burger')
  if (!navigationTrigger) return

  navigationTrigger.classList.remove('is-active')
  navigationTrigger?.nextElementSibling?.classList.remove('is-visible')

  notifyThisPage()
  detectHeaderTheme()
}

function notifyThisPage() {
  let { hash } = window.location
  const { body } = document
  const className = `page-${hash === '' ? 'design' : hash.substring(1)}`

  body.className = ''
  body.classList.add(className)
}


function bustCache() {
  const linkElements = document.querySelectorAll('link')
  linkElements.forEach(element => {
    const isStylesheet = element.getAttribute('rel') === 'stylesheet'
    if(!isStylesheet) return

    const href = element.getAttribute('href')
    const timestamp = new Date().getTime()
    const cacheBuster = `${href}?cacheBuster=${timestamp}`
    element.setAttribute('href', cacheBuster)
  })
}
document.addEventListener('DOMContentLoaded', () => {
  bustCache()
  initailizePage()

  loader()
  detectBrowser()
  setDarkmode()
  // adjustTopPadding()

  // hashchange 될 때마다 이벤트 만들어짐;
  event.toggleClass({ selector: '.js-navbar-toggle' }).setEvent()

  domEvents()

  window.addEventListener('scroll', () => {
    // event.stickyElement({ targetElement: '.js-navbar', addClass: 'is-sticky-navbar' })
    event.stickyElement({ targetElement: '.post-head', addClass: 'is-sticky' })
  })
  const scrollProgress = () => {
    const post = document.querySelector<HTMLElement>('.post')
    const progressBar = document.querySelector<HTMLElement>('.post-head-progress')

    if (!post || !progressBar) return


    const scrollPercent = `${(window.pageYOffset / (post.scrollHeight - window.innerHeight)) * 100}%`
    // const scrollPercent = `${(window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100}%`
    progressBar.style.width = scrollPercent
  }
  window.addEventListener('scroll', scrollProgress, true)
})





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

// 	const { email, password } = document.login;
// 	console.log(email);
// 	if(!document) return;

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
document.addEventListener('submit', event => event.preventDefault())

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
    //         <button class="card-more icon-button" type="button"><i class="icon-more"></i></button>
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


// document.querySelector(".js-copty-link").addEventListener("click", () => {
//   alert('복사 완료! 이제 "붙여넣기" 해주세요.😉');
//   copyToClipboard("https://napp.newneek.co/2020election/#temp");
// });
function copyToClipboard(val) {
  const textareaElement = document.createElement("textarea");
  document.body.appendChild(textareaElement);

  textareaElement.value = val;
  textareaElement.select(); // focus?도 해야함?
  document.execCommand("copy");
  document.body.removeChild(textareaElement);

  // try {
  //   document.execCommand('copy');
  // } catch (error) {
  // } finally {
  //   document.body.removeChild(textareaElement);
  // }
}