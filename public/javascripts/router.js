import { checkAllcheckbox } from './input';

const router = function() {
	const view = null || document.getElementById('view');

	const routePage = () => {
		const { hash } = window.location;
		const page = hash ? `/views/${hash.substring(1)}.html` : '/views/home.html';
		fetch(page)
			.then(response => {
				// 404 || 500
				if(response.ok) {
					return response.text();
				} else {
					return Promise.reject(response);	
				}
			})
			.then(html => {
				view.innerHTML = html;
				console.log('!router');
				checkAllcheckbox({
					checkAllElement: '.js-check-all', 
					checkElements: '.js-check'
				});

				let lastScrollTop = 0;
				const headerElement = document.querySelector('.header');
				window.addEventListener('scroll', () => {
					requestAnimationFrame(hasScrolled);
				});
				const hasScrolled = () => {
					window.pageYOffset > lastScrollTop ? headerElement.classList.add('nav-up') : headerElement.classList.remove('nav-up');
					lastScrollTop = window.pageYOffset;
				};

				function enterTarget(target) {
					const hoverElement = document.querySelector(target);
					const bodyElement = document.body;
					if(!hoverElement) return;

					const isNavigation = hoverElement === document.querySelector('.navigation li');

					hoverElement.addEventListener('mouseenter', () => {
						hoverElement.setAttribute('aria-expanded', 'true');
						hoverElement.classList.add('is-expanded');
						isNavigation && bodyElement.classList.add('is-shown');
			
						hoverElement.addEventListener('mouseleave', () => {
							hoverElement.setAttribute('aria-expanded', 'false');
							hoverElement.classList.remove('is-expanded');

							isNavigation && bodyElement.classList.remove('is-shown');
						});
					});
				}

				enterTarget('.js-hover-trigger');
				enterTarget('.header-user-notification');
				enterTarget('.header-user-account');

			})
			.catch(error => console.warn('router: ', error));
	};

	routePage();
	window.addEventListener('hashchange', routePage);
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