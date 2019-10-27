import { checkAllcheckbox, attachFile, inputVariation } from './input';
import { enterTarget, stickyHeader, modal, eventToggle, eventToTop, eventClose } from './event';


const router = function() {
	const view = null || document.getElementById('view');

	const routePage = () => {
		let { hash } = window.location;
		const page = hash ? `/views/${hash.substring(1)}.html` : '/views/home.html';

		// hash 말고 클릭하는 순간에 값을 알아야 함. data attr or hash
		fetch(page)
			.then(response => {
				// 404 || 500
				if(response.ok) return response.text();
				else return Promise.reject(response);	
			})
			.then(html => {
				view.innerHTML = html;

				checkAllcheckbox({
					checkAllElement: '.js-checkall', 
					checkElements: '.js-check'
				});

				// stickyHeader();
				modal();
				eventToggle();
				eventToTop();
				eventClose();

				attachFile();

				// inputVariation();

				enterTarget('.js-hover-trigger');
				enterTarget('.header-user-notification');
				enterTarget('.header-user-account');
				
				// const textarea = document.querySelectorAll('textarea');
				// textarea.forEach(element => element.addEventListener('input', autoExpand(element)));

				const eventScrollAnimation = () => {};
				const scrollTarget = document.querySelectorAll('.js-scroll-animation');
				if(!scrollTarget) return;
				scrollTarget.forEach((element) => {
					const isContainedWindowHeight = element.getBoundingClientRect().bottom <= window.innerHeight;
					if(isContainedWindowHeight) {
						element.classList.add('is-scrolled');
					}
				});
				window.addEventListener('scroll', () => {
					scrollTarget.forEach((element) => {
						const pageY = window.pageYOffset;
						const isScrolled = pageY > pageY + element.getBoundingClientRect().top - window.innerHeight + 50;
						if(isScrolled){
							element.classList.add('is-scrolled');
						}
					});
				});

				const customCursor = () => {
					const cursor = document.querySelector('.cursor');
					document.addEventListener('DOMContentLoaded', setCursor);
					document.addEventListener('mousemove', setCursor);
					document.addEventListener('click', setRipple);

					function setCursor() {
						const x = event.clientX;
						const y = event.clientY;
						cursor.style.left = `${x}px`;
						cursor.style.top = `${y}px`;
						// cursor.style.transform = `translate(${x - 15}px, ${y - 15}px`;

					}
					function setRipple(){
						cursor.classList.add('expand');
						setTimeout(() => {
							cursor.classList.remove('expand');
						}, 500);
					}
				};
				
				customCursor();
			})
			.catch(error => console.warn('router: ', error));
	};
		// gogo
		// const slashedHash = `/${hash.substring(1)}`;
		// console.log(slashedHash, window.location.pathname, window.location.history);
		// window.location.pathname = slashedHash;

	routePage();
	window.addEventListener('hashchange', routePage);
	window.addEventListener('hashchange', () => {
		if(document.querySelector('.navigation-toggle').classList.contains('is-active')) {
			document.querySelector('.navigation-toggle').classList.remove('is-active');
			document.querySelector('.navigation-toggle').nextElementSibling.classList.remove('is-visible');
		}
	});

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