import { checkAllcheckbox, attachFile, inputVariation } from './input';
import { enterTarget, stickyHeader, modal, eventToggle, eventToTop, eventClose, eventScrollAnimation, customCursor, stickyElement, scrollProgress } from './event';
import { todayDate } from './utils';
import { carousel, setDarkmode } from './event/index.js';

// hash 말고 클릭하는 순간에 값을 알아야 함. data attr or hash

const router = () => {
	const view = null || document.getElementById('view');

	const routePage = () => {
		let { hash } = window.location;
		const page = hash ? `/views/${hash.substring(1)}.html` : '/views/profile.html';
		fetch(page)
			.then(response => {
				// 404 || 500
				if(response.ok) return response.text();
				else return Promise.reject(response);	
			})
			.then(html => {
				view.innerHTML = html;
				// window.history.pushState({ name: 'tester' }, 'dd', hash.substring(1));

				if(window.locationhash === '#design') {
					document.querySelector('.page-head').classList.add('--white');
				} else {
					document.querySelector('.page-head').classList.remove('--white');
				}

				window.addEventListener('scroll', stickyElement({targetElement:'.post-head', addClass: 'is-sticky'}));
				window.addEventListener('scroll', scrollProgress, true);
				// toggleElement('.js-open-comment');


				const focusComment = () => {
					const commentWrite = document.querySelector('.js-comment-write');
					const commentTextField = document.querySelectorAll('.js-comment-textfield');
					if(!commentWrite || !commentTextField) return;

					commentTextField.forEach(element => {
						element.addEventListener('focus', (event) => {
							commentWrite.classList.add('is-focused');
						});
					});
				};
				
				focusComment();
				carousel();

				setDarkmode();
				
				customCursor();
				checkAllcheckbox({checkAllElement: '.js-checkall', checkElements: '.js-check'});

				// stickyHeader();
				eventToggle();
				eventToTop();
				eventClose();
				eventScrollAnimation();

				attachFile();
				modal();
				// inputVariation();

				enterTarget('.js-hover-trigger');
				enterTarget('.header-user-notification');
				enterTarget('.header-user-account');
				// const textarea = document.querySelectorAll('textarea');
				// textarea.forEach(element => element.addEventListener('input', autoExpand(element)));
				
			})
			.catch(error => console.warn('router: ', error));
	};

	routePage();
	window.addEventListener('hashchange', routePage);
	window.addEventListener('hashchange', initailizePage);

	function initailizePage() {
		const navigationTrigger = document.querySelector('.navigation-toggle');
		const isOpenedNavigation = navigationTrigger.classList.contains('is-active');
		if(!isOpenedNavigation) return;
		
		navigationTrigger.classList.remove('is-active');
		navigationTrigger.nextElementSibling.classList.remove('is-visible');
	}

};

export default router;


// {
// 	method: 'POST',
// 	body: 'title=' + encodeURIComponent('My awesome new article') + '&body=' + encodeURIComponent('This is the text of my article'),
// 	header: {
// 		'Content-Type': 'application/json'
// 	},
// 	referrer: 'no-referrer'
// }
// const parser = new DOMParser();
// const doc = parser.parseFromString(html, 'text/html');
// view.innerHTML = new XMLSerializer().serializeToString(doc);
// response.text() // response.json()
// toLowerCase() 해주기


/*
	const Router = (name, routes) => {
		return { name: name, routes: routes }
	};
	var activeRoutes = Array.from(document.querySelectorAll('[href]'));
	activeRoutes.forEach((route) {
		route.addEventListener('click', navigate);
	});
	const myFirstRouter = new Router('myFirstRouter', [
		{ path: '/', name: 'index' },
	]);
	const navigate = (event) => {
		const route = findCurrentTarget.attributes[0].value;
		const routeInfo = myFirstRouter.routes.find(r => r.path === route);
		if(!routeInfo) {
			//window.history.pushState({}, '', 'error');
			view.innerHTML = 'No route exists with this path';
		} else {
			window.history.pushState({ name: 'tester' }, '', routeInfo.path);
			fetch(`/views/${routeInfo.name}.html`)
				.then(res => res.text())
				.then(html => view.innerHTML = html)
				.catch(error => console.log('Failed to fetch page: ', error));
		}
	}
*/