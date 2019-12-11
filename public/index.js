'use strict';

import './stylesheets/style.scss';
import { router, routePage} from './javascripts/router';
import { tabMenu } from './javascripts/event';
import { inputNumber } from './javascripts/input';
import { loader, checkBrowser, adjustTopPadding } from './javascripts/load';
import { validations } from './javascripts/validations';
import { checkAllcheckbox, attachFile, inputVariation } from './javascripts/input';
import { enterTarget, stickyHeader, modal, eventToTop, eventClose, eventScrollAnimation, customCursor, stickyElement, scrollProgress, toggleClass } from './javascripts/event';
import { todayDate } from './javascripts/utils';
import { carousel, setDarkmode } from './javascripts/event/index.js';
import { films } from '../views/films';
import { countDownClock } from './javascripts/countdown';
import { setGraph } from './javascripts/ui';

//document.documentElement.className += ' supports-date';
// if(window.matchMedia('(min-width:800px)').matches) {}


window.addEventListener('offline', () => {
	const offlineElement = document.querySelector('.js-offline');
	offlineElement.style.display = 'block';
});

document.addEventListener('DOMContentLoaded', async () => {	
	loader();
	checkBrowser();
	setDarkmode();
	customCursor();


	routePage().then(() => {
		focusComment();
		setGraph();
		carousel();
	
		checkAllcheckbox({checkAllElement: '.js-checkall', checkElements: '.js-check'});
		toggleClass({target: '.js-accordion'});

		eventToTop();
		eventClose();
		eventScrollAnimation();
	
		attachFile();
		modal();
		// inputVariation();
		// stickyHeader();
	
		enterTarget('.js-hover-trigger');
		enterTarget('.header-user-notification');
		enterTarget('.header-user-account');
		// const textarea = document.querySelectorAll('textarea');
		// textarea.forEach(element => element.addEventListener('input', autoExpand(element)));
		
		// var i =0;
		// var images = ['cover1.jpg','cover2.jpg'];
		// var image = document.querySelector('.cover_image');
		// // image.css('background-image', 'url(/img/cover1.jpg)');
		// setInterval(function(){ 
		// 	image.fadeOut(1000, () => {
		// 		image.css('background-image', 'url(' + images [i++] +')');
		// 		image.fadeIn(1000);
		// 	});
		// 	if(i == images.length) i = 0;
		// }, 5000); 
		countDownClock(20, 'days');  
	
		adjustTopPadding();
	
		tabMenu();
		inputNumber();
	});
	// await routePage();

	window.addEventListener('scroll', stickyElement({targetElement:'.post-head', addClass: 'is-sticky'}));
	window.addEventListener('scroll', scrollProgress, true);
	// toggleElement('.js-open-comment');
	const focusComment = () => {
		const commentWrite = document.querySelector('.js-comment-write');
		const commentTextField = document.querySelectorAll('.js-comment-textfield');
		if(!commentWrite || !commentTextField) return;

		commentTextField.forEach(element => element.addEventListener('focus', () => {
			commentWrite.classList.add('is-focused');
		}));
	};
	

	const sayHello = new Promise(function(resolve, reject) {
		reject('Unable to say hi.');

		setTimeout(function () {
			resolve('Hello, World');
		}, 5000);
	});
	sayHello.then(resolve => {
		console.log('res', resolve);
	}).catch(error => {
		console.warn(error);
	});


	window.addEventListener('hashchange', routePage);
	window.addEventListener('hashchange', initailizePage);

	function initailizePage() {
		const navigationTrigger = document.querySelector('.navigation-toggle');
		const isOpenedNavigation = navigationTrigger.classList.contains('is-active');
		if(!isOpenedNavigation) return;
		
		navigationTrigger.classList.remove('is-active');
		navigationTrigger.nextElementSibling.classList.remove('is-visible');
	}

	const white = ['#design'];
	const isWhite = white.includes(window.location.hash);
	if(isWhite) {
		document.querySelector('.page-head').classList.add('--white');
	} else {
		document.querySelector('.page-head').classList.remove('--white');
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

	// let loginData = {email: '', password: ''};

document.addEventListener('input', event => {
	const helpers = document.querySelectorAll('.textfield-helper'); // helpers.forEach(helper => helper.style.display = 'none');
	const { email, password } = document.login;
	const { target } = event;
	const isEmail = target === email;
	const isPassword = target === password;

	// 정규표현식으로 유효성 검사를 모두 할 수 있으면 더 간단하겠다.
	if(isEmail) {
		if(validations.isRequired(email.value)) {
			setInvalid({message: '필수값이어요.'});
		} else {
			setValid();
		}
	}
	if(isPassword) {
		if(validations.isLength(password.value, 8)) {
			setInvalid({message: '너무 짧아요.'});
		} else {
			setValid();
		}
	}
	
	// validate ? a : b
	function setValid() {
		target.parentNode.classList.remove('is-invalid');
		target.nextElementSibling.innerHTML = '';
		target.nextElementSibling.style.display = 'none';
	}
	function setInvalid({message}) {
		if(!target.nextElementSibling) return;
		// const id = target.id || target.name;
		// target.setAttribute('aria-describedby', 'error-' + id);
		target.parentNode.classList.add('is-invalid');
		target.nextElementSibling.innerText = message;
		target.nextElementSibling.style.display = 'block';
	}
});

document.addEventListener('blur', event => {}, true); // blur is not bubble
document.addEventListener('submit', event => event.preventDefault());



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


