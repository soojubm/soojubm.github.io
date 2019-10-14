'use strict';

import './stylesheets/style.scss';
import router from './javascripts/router';
import { tabMenu, stickyElement, parallax } from './javascripts/event.js';
import { attachFile, inputNumber } from './javascripts/input';
import { loader, checkBrowser, adjustTopPadding } from './javascripts/load'; // loadSpinner

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

	attachFile();

	tabMenu();
	inputNumber();

	eventToTop();

	setGraph();

	adjustTopPadding();

	document.addEventListener('focus', (event) => {
		if(event.target.closest('.js-searchbar')) {
			event.target.parentNode.nextElementSibling.style.display = 'block';
		}
	}, true);
	document.addEventListener('blur', (event) => {
		if(event.target.closest('.js-searchbar')) {
			event.target.parentNode.nextElementSibling.style.display = 'none';
		}
	}, true);


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

	// document.addEventListener('mouseenter', (event) => {
	// 	const target = event.target;
	// 	const bodyElement = document.body;
	// 	const hasHoverClass = target.closest('.js-hover-trigger');
	// 	if(!hasHoverClass) return;

	// 	const isNavigation = target.closest('.navigation li');

	// 	target.setAttribute('aria-expanded', 'true');
	// 	target.classList.add('is-expanded');

	// 	isNavigation && bodyElement.classList.add('is-shown');

	// 	document.addEventListener('mouseleave', () => {
	// 		target.setAttribute('aria-expanded', 'false');
	// 		target.classList.remove('is-expanded');

	// 		isNavigation && bodyElement.classList.remove('is-shown');
	// 	}, true);

	// }, true);

	const toggleEvent = function(target, toggle) {
		const targetElement = document.querySelector(target);
		const toggleElement = document.querySelector(toggle);

		targetElement.addEventListener('click', event => {
			targetElement.classList.add('is-active');
			toggleElement.classList.add('is-active');
			document.querySelectorAll(targetElement).forEach((element) => {
				if(event.target !== element) {
					event.target.parentNode.classList.remove('is-expanded');
				}
			});
		});
	};

	// const toggleElements = document.querySelectorAll('.js-accordion');
	// toggleElements.forEach(element => {
	// 	element.addEventListener('click', () => {
	// 		if(target !== element) {
	// 			targetNextElement.classList.remove('is-visible');
	// 		}
	// 	});
	// 	element.nextElementSibling.addEventListener('click', (event) => {
	// 		event.stopPropagation();
	// 	});
	// });

	document.addEventListener('click', event => {
		const target = event.target;
		const targetNextElement = target.nextElementSibling;
		const isTarget = target.closest('.js-accordion');
		if (!isTarget) return;
		// parentNode.classList.add() 로 통일.

		if(isTarget) {
			target.classList.toggle('is-active');
			targetNextElement.classList.toggle('is-visible');
		}
	});

	// click 이벤트 외부에 넣으니까 파폭에서만 오류. event undefined
	// TODO: 토글 안에 토글 이벤트 존재 시
	// TODO: 도큐먼트가 아니라 event.target.parent 가 아닌 것을 클릭했을 때 다당야 하나
	// // 모든 토글 이벤트는 하나의 공통된 클래스 선택자를 사용한다.
	// // 속도 이슈를 고민해보자.

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
	const helpers = document.querySelectorAll('.textfield-helper');
	helpers.forEach(helper => {
		helper.style.display = 'none';
	});
	document.addEventListener('input', event => {
		const target = event.target;
		const loginEmail = document.login.email;
		const loginPassword = document.login.password;
		const isPassword = target === loginPassword;
		const isEmptyEmail = loginEmail.value === null || loginEmail.value === '';

		// 이메일이 invalid 일 때 helper 보여주기
		// 비밀번혹 invalid 일 때 helper 보여주기
		// 모두 valid 일 때 submit
		if (isPassword) {
			console.log(loginPassword, loginPassword.value.length);
		}
		if (isEmptyEmail) {
			console.log('empty');
			// FIXME: tasrget
			console.log(target.nextElementSibling);
			target.nextElementSibling.style.display = 'block';
			return false;
		}
		if (loginPassword.value.length < 8) {
			console.log('at least 8 length');
			return false;
		}
		return true;
	});
}

document.addEventListener('submit', event => {
	const target = event.target;
	const isSubmitLogin = target === document.login;
	if (isSubmitLogin) {
		event.preventDefault();
		loginFormValidation();
	}
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