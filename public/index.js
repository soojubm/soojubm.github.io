'use strict';

import './stylesheets/style.scss';
import router from './javascripts/router';
import { tabMenu, stickyElement, parallax } from './javascripts/event.js';
import { inputNumber } from './javascripts/input';
import { loader, checkBrowser, adjustTopPadding } from './javascripts/load'; // loadSpinner

import { validations } from './javascripts/validations';
//document.documentElement.className += ' supports-date';
const eventToTop = () => {
	document.addEventListener('click', event => {
		const target = event.target;
		if (target.closest('.js-to-top')) {
			event.preventDefault();
			window.scrollTo(0, 0);

			window.location.hash = target.name;
		}
	});
};

// if(window.matchMedia('(min-width:800px)').matches) {}

document.addEventListener('DOMContentLoaded', () => {	
	if(window.location.pathname === '/') {
		console.log('this is home page.');
	}
	// const todo = document.querySelector('.js-todo');
	// const todoList = document.querySelector('.js-todo-list');
	// const todoListInput = document.querySelector('.js-todo-input');
	// const todoSubmit = document.querySelector('.js-todo-submit');
	// const todoClear = document.querySelector('.js-todo-clear');
	// let todoItems =  [];

	// function renderTodo(text) {
	// 	const item = { id: todoItems.length + 1, text: text };

	// 	const li = document.createElement('li');
	// 	const todoDelete = document.createElement('button');
	// 	// todoDelete.classList.add('ghost-button');
	// 	todoDelete.setAttribute('type','button');
	// 	todoDelete.innerHTML = '<i class="icon-close" />';

	// 	const todoCheck = document.createElement('input');
	// 	const todoCheckLabel = document.createElement('label');
	// 	todoCheck.setAttribute('type', 'checkbox');
	// 	todoCheck.setAttribute('id', item.id);
	// 	todoCheckLabel.innerText = `${item.id} :: ${text}`;
	// 	todoCheckLabel.setAttribute('for', item.id);

	// 	li.appendChild(todoDelete);
	// 	li.appendChild(todoCheck);
	// 	li.appendChild(todoCheckLabel);

	// 	todoList.appendChild(li);
	// 	todoItems.push(item);
	// 	// 체크박스 상태 저장안됨

	// 	localStorage.setItem('todoItems', JSON.stringify(todoItems));
	// 	todoListInput.value = '';

	// 	todoDelete.addEventListener('click', deleteTodo);

	// 	function deleteTodo() {
	// 		const target = event.target;
	// 		target.parentNode.remove();
	// 		const deletedItems = todoItems.filter(item => {
	// 			return parseInt(target.nextElementSibling.id) !== item.id;
	// 		});
	// 		todoItems = deletedItems;
			
	// 		localStorage.setItem('todoItems', JSON.stringify(todoItems));
	// 	}
	// }

	// todoClear.addEventListener('click', () => {
	// 	todoList.innerHTML = '';
	// 	localStorage.removeItem('todoItems');
	// });


	// todo.addEventListener('submit', event => {
	// 	event.preventDefault();
	// 	if(todoListInput.value.length < 1) return alert('입력해주세용');
	// 	renderTodo(todoListInput.value);
	// 	// todoList.innerHTML += `<li><input id=ab type=checkbox><label for=ab>${todoListInput.value}</label></li>`;
	// });

	// const getLocalStorage = localStorage.getItem('todoListItems');
	// if(getLocalStorage){
	// 	const abc = JSON.parse(getLocalStorage);
	// 	abc.forEach(function(item){
	// 		renderTodo(item.text);
	// 	});
	// }

	router();

	loader();
	checkBrowser();
	adjustTopPadding();


	tabMenu();
	inputNumber();

	eventToTop();

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
	// .then(function (responses) {
	// 	return responses.map(function (response) {
	// 		return response.json();
	// 	});


	window.addEventListener('scroll', () => {
		if (!document.querySelector('.post-head')) return;
		stickyElement('.post-head', 'is-sticky', true);
	});


	const closeElement = document.querySelectorAll('.js-close');
	closeElement.forEach(element => {
		element.addEventListener('click', event => {
			if (event.target.parentNode.classList.contains('notice')) {
				document.body.classList.add('is-closed-topbanner');
			} else {
				element.parentNode.style.display = 'none';
			}
		});
	});
});

const setGraph = () => {
	const graphItems = document.querySelectorAll('.graph-item');
	if(!graphItems) return;

	let graphItemValue;
	let graphItemBar;
	let graphValue;

	graphItems.forEach((element) => {
		graphItemBar = element.querySelector('.graph-item-bar');
		graphItemValue = element.querySelector('.graph-item-value');
		graphValue = parseInt(graphItemValue.innerHTML);

		(function setGraph() {
			graphItemBar.style.height = graphValue + 'px';
			graphItemValue.style.bottom = graphValue + 'px';
		})();
	});
};

// document.forms.id
function loginFormValidation() {
	const login = document.login;
	if(!login) return;
	
	const loginEmail = document.login.email;
	const loginPassword = document.login.password;
	const helpers = document.querySelectorAll('.textfield-helper');
	// helpers.forEach(helper => helper.style.display = 'none');
	
	let loginData = {
		email: '',
		password: ''
	};
	
	let loginValid = {
		email: false,
		password: false
	};

	document.addEventListener('input', event => {
		const target = event.target;
		const isEmail = target === loginEmail;
		const isPassword = target === loginPassword;

		if(validations.isNumber(loginEmail.value)) {
			// return loginEmail.value = null;
			loginData[target.name] = target.value;
			console.log(loginData);		
			// loginEmail.value = '';
		}
	
		console.log(event.target.value);
		// if(isEmpty) {}
		if(isEmail) {
			if(validations.isRequired(loginEmail.value)) {
				setInvalid({message: '필수값이어요'});
				return;
			}
			setValid();
		}
		if(isPassword) {
			console.log(target, target.parentNode);
			if(validations.isLength(loginPassword.value, 8)) {
				console.log('at least 8 length');
				setInvalid({message: '너무 짧아요'});
				return;
			}
			setValid();
		}
		
		// todo 텍스트 바꿔주기
		function setValid() {
			target.parentNode.classList.remove('is-invalid');
			target.nextElementSibling.style.display = 'none';

			field.removeAttribute('aria-describedby');
		}
		function setInvalid({message}) {
			console.log(target.nextElementSibling);

			const id = target.id || target.name;
			target.parentNode.classList.add('is-invalid');

			target.setAttribute('aria-describedby', 'error-' + id);

			target.nextElementSibling.style.display = 'block';
			target.nextElementSibling.innerHTML = message;
		}
		var hasError = function (field) {

			// Don't validate submits, buttons, file and reset inputs, and disabled fields
			if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;
	
			// Get validity
			var validity = field.validity;
	
			// If valid, return null
			if (validity.valid) return;
	
			// If field is required and empty
			if (validity.valueMissing) return 'Please fill out this field.';
	
			// If not the right type
			if (validity.typeMismatch) return 'Please use the correct input type.';
	
			// If too short
			if (validity.tooShort) return 'Please lengthen this text.';
	
			// If too long
			if (validity.tooLong) return 'Please shorten this text.';
	
			// If number input isn't a number
			if (validity.badInput) return 'Please enter a number.';
	
			// If a number value doesn't match the step interval
			if (validity.stepMismatch) return 'Please select a valid value.';
	
			// If a number field is over the max
			if (validity.rangeOverflow) return 'Please select a smaller value.';
	
			// If a number field is below the min
			if (validity.rangeUnderflow) return 'Please select a larger value.';
	
			// If pattern doesn't match
			if (validity.patternMismatch) return 'Please match the requested format.';
	
			// If all else fails, return a generic catchall error
			return 'The value you entered for this field is invalid.';
	
		};
	});

}

// event.target.validity
// badInput: false
// customError: false
// patternMismatch: false
// rangeOverflow: false
// rangeUnderflow: false
// stepMismatch: false
// tooLong: false
// tooShort: false
// typeMismatch: false
// valid: true
// valueMissing: false
document.addEventListener('blur', event => {
	console.log('test', event.target.validity, event.target.form);
	event.target.form.submit;
}, true); // blur is not bubble

document.addEventListener('submit', event => {
	const isSubmitLogin = event.target === document.login;
	if(!isSubmitLogin) return;

	if(isInvalid) {
		event.preventDefault();
		// target.focus();
	}
	
	loginFormValidation();
});


/*
document.addEventListener('click', (event) => {
	if(event.target.closest('.todo-control-remove')){
		todoList.innerHTML = '';
		localStorage.removeItem('todoListItems1');
	}
	const item = event.target.closest('.js-todo input');
	if(item) {
		if(item.checked) {
			item.parentNode.className = 'completed';
			item.checked = true;
		} else {
			item.parentNode.className = '';
			item.checked = false;
		}
		localStorage.setItem('todoListItems1', todoList.innerHTML);
	}
});
*/


export const getTodayDate = () => {
	const today = new Date();
	const year = today.getFullYear(); // toString().padStart
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const date = String(today.getDate()).padStart(2, '0');
	const day = today.getDay(); // 월 : 0

	const hours = today.getHours();
	const minutes = today.getMinutes();
	// const seconds = today.getSeconds();
	const ampm = hours < 12 ? 'am' : 'pm';

	// let theBigDay = new Date("July 1, 1999");
	// let sameAsBigDay = new Date();
	// sameAsBigDay.setTime(theBigDay.getTime());

	/*
	const dateString = date.toLocaleDateString().split('.');
	const [year, month, day] = dateString;
	console.log(date.toLocaleDateString()); // 1980년 1월 3일 목요일
	console.log(date.toLocaleTimeString()); // 오전 1:28:35
	console.log(date.toLocaleString()); // 1980년 1월 3일 목요일 오전 1:28:35
	*/
};