import { checkAllcheckbox, attachFile, inputVariation } from './input';
import { enterTarget, stickyHeader, modal, eventToggle, eventToTop } from './event';
import { autoExpand } from './utils';

const router = function() {
	const view = null || document.getElementById('view');

	const routePage = () => {
		let { hash } = window.location;
		const page = hash ? `/views/${hash.substring(1)}.html` : '/views/home.html';
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

				attachFile();

				inputVariation();

				enterTarget('.js-hover-trigger');
				enterTarget('.header-user-notification');
				enterTarget('.header-user-account');
				
				const textarea = document.querySelectorAll('textarea');
				textarea.forEach(element => element.addEventListener('input', autoExpand(element)));

				const scrollTarget = document.querySelectorAll('.js-scroll-animation');
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

		// gogo
		const slashedHash = `/${hash.substring(1)}`;
		console.log(slashedHash, window.location.pathname, window.location.history);
		// window.location.pathname = slashedHash;


		
		const category = document.querySelector('.category');
		const categoryList = category.querySelector('.category-list');
		const categoryNavigationPrev = category.querySelector('.category-navigation-prev');
		const categoryNavigationNext = category.querySelector('.category-navigation-next');
		const temp2 = categoryList.offsetWidth;
		let sum = 0; 
		document.querySelectorAll('.category-list > button').forEach(function(item){
			sum = sum + item.offsetWidth;
		});
		categoryList.addEventListener('scroll', function(){
			const temp = categoryList.scrollLeft;
			console.log('scroll-left', temp);
			console.log('offset-width', temp2);
		});
		console.log(sum, temp2);
		categoryNavigationNext.addEventListener('click', () => {
			if(sum > temp2) {
				categoryList.scrollLeft += 100;
				//var ttt = 100 + 'px';
				//document.querySelector('.category-list').style.transform += 'translateX('+ttt+')';
			}
		});
		categoryNavigationPrev.addEventListener('click', () => {
			if(sum > temp2) {
				categoryList.scrollLeft -= 100;
			}
		});
	};

	console.log(typeof document.querySelector('.header'));

	routePage();
	window.addEventListener('hashchange', routePage);
	window.addEventListener('hashchange', () => {
		if(document.querySelector('.navigation-toggle').classList.contains('is-active')) {
			document.querySelector('.navigation-toggle').classList.remove('is-active');
			document.querySelector('.navigation-toggle').nextElementSibling.classList.remove('is-visible');
		}
	});
};

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

export default router;

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