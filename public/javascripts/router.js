import { checkAllcheckbox, attachFile, inputVariation } from './input';
import { enterTarget, stickyHeader, modal, eventToggle, eventToTop, eventClose, eventScrollAnimation, customCursor, stickyElement, scrollProgress } from './event';
import { todayDate } from './utils';
import { carousel, setDarkmode } from './event/index.js';
import { films } from '../../views/films';
import { countDownClock } from './countdown';
import { setGraph } from './ui';


// hash 말고 클릭하는 순간에 값을 알아야 함. data attr or hash

const router = () => {
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
				const view = null || document.getElementById('view');

				view.innerHTML = html;
				// window.history.pushState({ name: 'tester' }, 'dd', hash.substring(1));

				const white = ['#design'];
				const isWhite = white.includes(window.location.hash);

				if(isWhite) {
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

				setGraph();

				
				focusComment();
				carousel();

				setDarkmode();
				
				customCursor();
				checkAllcheckbox({checkAllElement: '.js-checkall', checkElements: '.js-check'});

				eventToggle();
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

	// 연도별 감독별 나라별
	const boardElement = document.querySelector('.board');
	if(!boardElement) return null;
	document.addEventListener('click', event => {
		const filteredCountry = films.filter(item => item.country === '미국');
		console.log(filteredCountry);
		if(event.target.name === 'usa') {
			boardElement.innerHTML = '';
			filteredCountry.map(item => {
				boardElement.innerHTML += `
					<div class="board-body">
						<div class="board-head-title">${item.id}</div>
						<div class="board-head-title">${item.releaseDate}</div>
						<div class="board-head-title">${item.titleKorean}<div>${item.titleEnglish}</div></div>
						<div class="board-head-title">${item.director}</div>
						<div class="board-head-title">${item.country}</div>
					</div>`;
			});
		}
	});
	setTimeout(() => {
		films.map(item => {
			boardElement.innerHTML += `
			<div class="board-body">
				<div class="board-head-title">${item.id}</div>
				<div class="board-head-title">${item.releaseDate}</div>
				<div class="board-head-title">${item.titleKorean}<div>${item.titleEnglish}</div></div>
				<div class="board-head-title">${item.director}</div>
				<div class="board-head-title">${item.country}</div>
			</div>`;
		});
	}, 200);

};

export default router;


	// const Router = (name, routes) => {
	// 	return { name: name, routes: routes };
	// };
	// var activeRoutes = Array.from(document.querySelectorAll('[href]'));
	// activeRoutes.forEach(route => route.addEventListener('click', navigate));
	// const myFirstRouter = new Router('myFirstRouter', [
	// 	{ path: '/', name: 'index' },
	// ]);
	// const navigate = (event) => {
	// 	const route = findCurrentTarget.attributes[0].value;
	// 	const routeInfo = myFirstRouter.routes.find(r => r.path === route);
	// 	if(!routeInfo) {
	// 		//window.history.pushState({}, '', 'error');
	// 		view.innerHTML = 'No route exists with this path';
	// 	} else {
	// 		window.history.pushState({ name: 'tester' }, '', routeInfo.path);
	// 		fetch(`/views/${routeInfo.name}.html`)
	// 			.then(res => res.text())
	// 			.then(html => view.innerHTML = html)
	// 			.catch(error => console.log('Failed to fetch page: ', error));
	// 	}
	// };

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


