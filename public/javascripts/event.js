//TODO: 모달 밖의 컨텐츠에 aria-hidden 모달의 위치는 바디 안에?
//var abc = window.innerWidth - document.body.clientWidth;

export const modal = () => {
	const bodyElement = document.body;
	let pageY = undefined;

	const modals = document.querySelectorAll('.js-modal');
	if(!modals) return;

	modals.forEach(modal => modal.addEventListener('click', event => {
		event.stopPropagation();
		modal.nextElementSibling.classList.add('is-visible');
		pageY = window.pageYOffset;

		setLockBody();

		document.addEventListener('click', closeModal);
		function closeModal() {
			if (!modal.nextElementSibling.classList.contains('is-visible')) return;
			modal.nextElementSibling.classList.remove('is-visible');
			bodyElement.classList.remove('body-lock');
			window.scrollTo(0, pageY);
		}
	}));

	const modalDialog = document.querySelectorAll('.modal-dialog');
	modalDialog.forEach(element => element.addEventListener('click', event => event.stopPropagation()));
	
	function setLockBody() {
		bodyElement.classList.add('body-lock');
		bodyElement.style.top = `-${pageY}px`;
	}

	// document.addEventListener('click', event => {
	// 	const { target } = event;
	// 	if (!target.closest('.js-modal')) return;

	// 	const bodyElement = document.body;
	// 	const targetParent = target.parentNode;
	// 	let getScrollTop;
	// 	let findCurrentTarget = null;

	// 	event.stopPropagation();
	// 	if (targetParent.classList.contains('js-modal')) {
	// 		findCurrentTarget = targetParent;
	// 	} else {
	// 		findCurrentTarget = targetParent.parentNode;
	// 	}

	// 	findClassRecursive(target, 'js-modal', 0);

	// 	getScrollTop = window.pageYOffset;

	// 	findCurrentTarget.nextElementSibling.classList.add('is-visible');

	// 	setLockBody();

	// 	const modalDialog = document.querySelectorAll('.modal-dialog');
	// 	modalDialog.forEach(element => {
	// 		element.addEventListener('click', event => event.stopPropagation());
	// 	});

	// 	function setLockBody() {
	// 		const bodyElement = document.body;
	// 		bodyElement.classList.add('body-lock');
	// 		bodyElement.style.top = `-${getScrollTop}px`;
	// 	}

	// 	document.addEventListener('click', closeModal);
	// 	function closeModal() {
	// 		if (!findCurrentTarget.nextElementSibling.classList.contains('is-visible')) return;
	// 		findCurrentTarget.nextElementSibling.classList.remove('is-visible');
	// 		bodyElement.classList.remove('body-lock');
	// 		window.scrollTo(0, getScrollTop);
	// 	}
	// }, true);

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
};


export const tabMenu = () => {
	document.addEventListener('click', event => {
		const target = event.target;
		const tabActiceBar = document.querySelector('.profile-tablist-active');
		const tabs = target.parentNode.querySelectorAll('[role=tab]');
		const tabIndex = target.getAttribute('data-index');

		if(target.closest('[role=tab]')) {
			target.setAttribute('aria-selected', 'true');
			tabActiceBar.style.left = `${target.offsetLeft}px`;
			tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'));
		
			target.parentNode.parentNode.querySelectorAll('[role=tabpanel]').forEach(element => {
				element.setAttribute('aria-hidden', 'true');
				if(tabIndex === element.getAttribute('data-index')){
					element.setAttribute('aria-hidden', 'hidden');
				}
			});
		}
	}, true);
};


// var isScrolling;
// window.addEventListener('scroll', (event) => {
// 	if(isScrolling) window.clearTimeout(isScrolling);
// 	isScrolling = setTimeout(function(){
// 		stickyToggle();
// 	}, 50);
// });

export const stickyElement = ({targetElement, addClass}) => {
	const stickyElement = document.querySelector(targetElement);
	if(!stickyElement) return;
	const bodyElement = document.body;

	let stickyElementHeight = stickyElement.offsetHeight;
	let isScrolling;

	window.addEventListener('resize', () => {
		isScrolling && window.cancelAnimationFrame(isScrolling);
		isScrolling = window.requestAnimationFrame(() => {
			stickyElementHeight = stickyElement.offsetHeight;
		}, 60);
	});

	window.addEventListener('scroll', () => {
		isScrolling && window.cancelAnimationFrame(isScrolling);
		isScrolling = window.requestAnimationFrame(() => {
			if(window.pageYOffset > stickyElement.offsetTop + stickyElementHeight){
				bodyElement.classList.add(addClass);
			} else {
				bodyElement.classList.remove(addClass);
			}
		}, 60);
	});
};

// export const stickyHeaderElement = (targetElement, addClass) => {
// 	stickyElement({targetElement, addClass, true});
// };


export const parallax = (targetElement) => {
	const target = document.querySelectorAll(targetElement);
	if(!target) return;
	window.addEventListener('scroll', () => {
		target.forEach((element) => {
			//console.log(window.pageYOffset, element.offsetTop);
			let rate = window.pageYOffset * -0.2 - 600;
			let aaa = (window.pageYOffset - element.offsetTop) * -1.5; // scrolled = window.pageYOffset
			//let bbb = aaa > 0 ? -aaa : aaa;
			element.style.backgroundPosition = 'center ' + aaa + 'px'; 
			// element.style.transform = 'translate3d(0px, '+rate+'px, 0px)';
			// DataTransferItemList.rate
		});
	});
};

export const stickyHeader = () => {
	const headerElement = document.querySelector('.header');
	let lastScrollTop = 0;
	
	window.addEventListener('scroll', () => {
		requestAnimationFrame(hasScrolled);
	});

	function hasScrolled() {
		if(window.pageYOffset > lastScrollTop) {
			headerElement.classList.add('nav-up');
		} else {
			headerElement.classList.remove('nav-up');
		}
		lastScrollTop = window.pageYOffset;
	}
};

export const enterTarget = (target) => {
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
};


export const eventToggle = () => {
	const toggleElements = document.querySelectorAll('.js-accordion');
	if(!toggleElements) return;

	let toggleElementNext;
	toggleElements.forEach(element => {
		toggleElementNext = element.nextElementSibling;
		element.addEventListener('click', event => {
			element.classList.toggle('is-active');
			element.nextElementSibling.classList.toggle('is-visible');
			console.log(element);
			// if(event.target !== element) {
			// 	alert();
			// }
		});
		toggleElementNext.addEventListener('click', event => event.stopPropagation());
	});
};

export const eventClose = () => {
	const closeElement = document.querySelectorAll('.js-close');
	if(!closeElement) return;

	closeElement.forEach(element => {
		element.addEventListener('click', event => {
			(element.parentNode).style.display = 'none';
		});
	});
};

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

// document.addEventListener('click', event => {
// 	const target = event.target;
// 	const targetNextElement = target.nextElementSibling;
// 	const isTarget = target.closest('.js-accordion');
// 	if (!isTarget) return;
// 	// parentNode.classList.add() 로 통일.

// 	if(isTarget) {
// 		target.classList.toggle('is-active');
// 		targetNextElement.classList.toggle('is-visible');
// 	}
// });

// click 이벤트 외부에 넣으니까 파폭에서만 오류. event undefined
// TODO: 토글 안에 토글 이벤트 존재 시
// TODO: 도큐먼트가 아니라 event.target.parent 가 아닌 것을 클릭했을 때 다당야 하나



export const eventToTop = () => {
	const toTopElement = document.querySelector('.js-to-top');
	toTopElement.addEventListener('click', event => {
		event.preventDefault();
		window.scrollTo(0, 0);

		window.location.hash = toTopElement.name || toTopElement.href;
	});
};