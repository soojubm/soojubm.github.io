

// var isScrolling;
// window.addEventListener('scroll', (event) => {
// 	if(isScrolling) window.clearTimeout(isScrolling);
// 	isScrolling = setTimeout(function(){
// 		stickyToggle();
// 	}, 50);
// });

export const stickyElement = ({targetElement, addClass}) => {
	const { body } = document;
	const stickyElement = document.querySelector(targetElement);
	if(!stickyElement) return;

	let stickyElementHeight = stickyElement.offsetHeight;
	let isScrolling;

	window.addEventListener('resize', () => {
		isScrolling && window.cancelAnimationFrame(isScrolling);
		isScrolling = window.requestAnimationFrame(() => {
			stickyElementHeight = stickyElement.offsetHeight;
		}, 60);
	});

	window.addEventListener('scroll', () => {
		console.log(stickyElementHeight); // 133
		isScrolling && window.cancelAnimationFrame(isScrolling);
		isScrolling = window.requestAnimationFrame(() => {
			if(window.pageYOffset > stickyElement.offsetTop + stickyElementHeight){
				body.classList.add(addClass);
			} else {
				body.classList.remove(addClass);
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

export const eventClose = ({ targetElement: target }) => {
	const closeElement = document.querySelectorAll(target);
	if(!closeElement) return;

	closeElement.forEach(element => element.addEventListener('click', event => {
		(element.parentNode).style.display = 'none';
	}));
};


export const eventToTop = ({targetElement: target}) => {
	const toTopElement = document.querySelector(target);
	toTopElement.addEventListener('click', event => {
		event.preventDefault();
		window.scrollTo(0, 0);

		window.location.hash = toTopElement.name || toTopElement.href;
	});
};

export const eventScrollAnimation = () => {
	const scrollTarget = document.querySelectorAll('.js-scroll-animation');
	if(!scrollTarget) return;

	scrollTarget.forEach(element => {
		const isContainedWindowHeight = element.getBoundingClientRect().bottom <= window.innerHeight;
		if(!isContainedWindowHeight) return;
		
		element.classList.add('is-scrolled');
	});
	
	window.addEventListener('scroll', () => {
		scrollTarget.forEach(element => {
			const pageY = window.pageYOffset;
			const isScrolled = pageY > pageY + element.getBoundingClientRect().top - window.innerHeight + 50;
			if(!isScrolled) return;

			element.classList.add('is-scrolled');
		});
	});
};

// click 이벤트 외부에 넣으니까 파폭에서만 오류. event undefined
// TODO: 토글 안에 토글 이벤트 존재 시
// TODO: 도큐먼트가 아니라 event.target.parent 가 아닌 것을 클릭했을 때 다당야 하나

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

export const customCursor = () => {
	const cursor = document.querySelector('.loading-object');
	const hoverElement = document.querySelectorAll('button, a');

	document.addEventListener('DOMContentLoaded', setCursor);
	document.addEventListener('mousemove', setCursor);
	document.addEventListener('click', setRipple);

	cursor.classList.add('is-default');
	hoverElement.forEach(element => element.addEventListener('mouseleave', () => {
		cursor.classList.remove('is-clickable');
	}));
	hoverElement.forEach(element => element.addEventListener('mouseenter', () => {
		cursor.classList.add('is-clickable');
	}));

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

export const scrollProgress = () => {
	const pageProgressBar = document.querySelector('.post-head-progress');
	if(!pageProgressBar) return;
	let scrollPercent;
	scrollPercent = window.pageYOffset / (document.body.scrollHeight - window.innerHeight) * 100 + '%';
	pageProgressBar.style.width = scrollPercent;
};