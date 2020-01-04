'use strict';

import './stylesheets/style.scss';
import routePage from './javascripts/router.ts';
import { loader, checkBrowser, adjustTopPadding } from './javascripts/load.ts';
import { setGraph } from './javascripts/ui.ts';
import { setDarkmode } from './javascripts/setDarkMode.ts';

import { validity } from './javascripts/utils/validations';
// import { films } from '../views/films';
import { countDownClock } from './javascripts/countdown.ts';
import event from './javascripts/event/index.ts';
import input from './javascripts/input/index.ts';

//document.documentElement.className += ' supports-date';
// if(window.matchMedia('(min-width:800px)').matches) {}
// div.classList.replace("foo", "bar");
 
// element.hidden = !visible

window.addEventListener('offline', () => {
	const offlineElement = document.querySelector<HTMLElement>('.js-offline');
	if(!offlineElement) return;

	offlineElement.style.display = 'block';
});

window.addEventListener('hashchange', routePage);
window.addEventListener('hashchange', initailizePage);

function initailizePage() {
	const navigationTrigger = document.querySelector<HTMLElement>('.navigation-toggle');
	// const isOpenedNavigation = navigationTrigger.classList.contains('is-active');
	if(!navigationTrigger) return;
	
	navigationTrigger.classList.remove('is-active');
	navigationTrigger?.nextElementSibling?.classList.remove('is-visible');
}

document.addEventListener('DOMContentLoaded', async () => {	
	loader();
	checkBrowser();
	setDarkmode();

	routePage().then(() => {
		adjustTopPadding();

		// 특정 유아이 이벤트
		// const focusComment = () => {
		// 	const commentWrite = document.querySelector('.js-comment-write');
		// 	const commentTextField = document.querySelectorAll('.js-comment-textfield');
		// 	if(!commentWrite || !commentTextField) return;

		// 	commentTextField.forEach(element => element.addEventListener('focus', () => {
		// 		commentWrite.classList.add('is-focused');
		// 	}));
		// };
		// focusComment();
		setGraph();
		// carousel();
	
		event.toggleClass({ triggerElement: '.js-toggle' });
		event.enterTarget({ triggerElement: '.js-hover-trigger' });
		event.modal({ triggerElement: '.js-modal' });
		event.tabMenu();
		event.toTop({ targetElement: '.js-to-top' });

		event.scrollAnimation();

		event.close({ targetElement: '.js-close' });
		// event.customCursor();

		countDownClock(20, 'days');
	
		input.checkbox({ checkAllElement: '.js-checkall', checkElements: '.js-check' });
		input.file();
		input.textarea();
		input.number();






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

		// console.log(document.scrollHeight, document.body.scrollHeight);

		const scrollProgress = () => {
			const progressBar = document.querySelector<HTMLElement>('.post-head-progress');
			if(!progressBar) return;

			const scrollPercent = `${window.pageYOffset / (document.body.scrollHeight - window.innerHeight) * 100}%`;
			progressBar.style.width = scrollPercent;
		};

		window.addEventListener('scroll', () => {
			event.stickyElement({targetElement:'.post-head', addClass: 'is-sticky'})
		});
		window.addEventListener('scroll', scrollProgress, true);
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
	});
	
	// const sayHello = new Promise((resolve, reject) => {
	// 	reject('Unable to say hi.');

	// 	setTimeout(() => {
	// 		resolve('Hello, World');
	// 	}, 5000);
	// });
	// sayHello.then(resolve => {
	// 	console.log('res', resolve);
	// }).catch(error => {
	// 	console.warn(error);
	// });

	const pageHeadElement = document.querySelector<HTMLElement>('.page-head');
	if(!pageHeadElement) return;
	
	const pages = ['#design', '#contact'];
	const isWhite = pages.includes(window.location.hash);
	if(isWhite) {
		pageHeadElement.classList.add('--white');
	} else {
		pageHeadElement.classList.remove('--white');
	}

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
});


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
document.addEventListener('submit', event => event.preventDefault());

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