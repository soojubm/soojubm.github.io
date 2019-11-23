'use strict';

import './stylesheets/style.scss';
import router from './javascripts/router';
import { tabMenu } from './javascripts/event';
import { setGraph } from './javascripts/ui';
import { inputNumber } from './javascripts/input';
import { loader, checkBrowser, adjustTopPadding } from './javascripts/load';
import { validations } from './javascripts/validations';
//document.documentElement.className += ' supports-date';
// if(window.matchMedia('(min-width:800px)').matches) {}

document.addEventListener('DOMContentLoaded', () => {	
	loader();
	router();

	checkBrowser();
	adjustTopPadding();

	tabMenu();
	inputNumber();

	setGraph();

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

	// Promise.all([
	// 	fetch('https://jsonplaceholder.typicode.com/posts'),
	// 	fetch('https://jsonplaceholder.typicode.com/users')
	// ])
	// .then(responses => {
	// 	return responses.map(response => {
	// 		return response.json();
	// 	});
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