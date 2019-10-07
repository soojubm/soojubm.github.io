//TODO: 모달 밖의 컨텐츠에 aria-hidden 모달의 위치는 바디 안에?
//if(!modalTrigger) return;
//var abc = window.innerWidth - document.body.clientWidth;
export const modal = () => {
	document.addEventListener('click', event => {
		// const target = event.target;
		const { target } = event;
		if (!target.closest('.js-modal')) return;

		const bodyElement = document.body;
		const targetParent = target.parentNode;
		let getScrollTop;
		let findCurrentTarget = null;
		// pointer-events: none; 으로 대체가능 if > ie11

		event.stopPropagation();
		if (targetParent.classList.contains('js-modal')) {
			findCurrentTarget = targetParent;
		} else {
			findCurrentTarget = targetParent.parentNode;
		}

		findClassRecursive(event.target, 'js-modal', 0);

		getScrollTop = window.pageYOffset;

		findCurrentTarget.nextElementSibling.classList.add('is-visible');
		bodyElement.classList.add('body-lock');
		bodyElement.style.top = -getScrollTop + 'px';

		const closeModal = () => {
			if (!findCurrentTarget.nextElementSibling.classList.contains('is-visible')) return;
			findCurrentTarget.nextElementSibling.classList.remove('is-visible');
			bodyElement.classList.remove('body-lock');
			window.scrollTo(0, getScrollTop);
		};

		document.addEventListener('click', () => {
			closeModal();
		});

		document.querySelectorAll('.modal-dialog').forEach(element => {
			element.addEventListener('click', event => {
				event.stopPropagation();
			});
		});
	},
	true,
	);

	const findClassRecursive = (element, className, depth) => {
	// parentNode.classList.contains('js-modal')
		console.log('depth: ' + depth, element);
		if (element.classList.contains(className)) return element;
		else return findClassRecursive(element.parentNode, className, depth + 1);
	};

	var getClosest = function(elem, selector) {
		for (; elem && elem !== document; elem = elem.parentNode) {
			if (elem.matches(selector)) return elem;
		}
		return null;
	};
};


export const tabMenu = () => {
	document.addEventListener('click', (event) => {
		const tabActiceBar = document.querySelector('.profile-tablist-active');
		if(event.target.closest('[role=tab]')) {
			// 탭 액티브바 애니메이션
			tabActiceBar.style.left = event.target.offsetLeft + 'px';

			// 전체 탭의 선택을 해제한다.
			const tabs = event.target.parentNode.querySelectorAll('[role=tab]');
			tabs.forEach((tab) => {
				tab.setAttribute('aria-selected', 'false');
			});
			//console.log(Array.from(checks).indexOf(event.target));
		
			const tabIndex = event.target.getAttribute('data-index');
			event.target.parentNode.parentNode.querySelectorAll('[role=tabpanel]').forEach((element) => {
				element.setAttribute('aria-hidden', 'true');
				if(tabIndex === element.getAttribute('data-index')){
					element.setAttribute('aria-hidden', 'hidden');
				}
			});
			// 클릭한 탭이 선택된다.
			event.target.setAttribute('aria-selected', 'true');
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


// TODO: post-head의 offset-top까지 더해서 마진값을 주어야
export const stickyElement = ({
	targetElement, addClass, isHeader}
) => {
	const bodyElement = document.body;
	const mainElement = document.querySelector('main');
	const stickyElement = mainElement.querySelector(targetElement);
	let stickyElementHeight = stickyElement.offsetHeight;
	let isScrolling;
	
	if(!stickyElement) return;

	//if(!isOver) stickyElementHeight = 0;

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
				isHeader && (mainElement.style.paddingTop = stickyElementHeight + 'px');
			} else {
				bodyElement.classList.remove(addClass);
				// isHeader && (mainElement.style.paddingTop = '0px');
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
			let aaa = window.pageYOffset * -0.2 - 600; // scrolled = window.pageYOffset
			//let aaa = (window.pageYOffset - element.offsetTop) * -1.5; // scrolled = window.pageYOffset
			//let bbb = aaa > 0 ? -aaa : aaa;
			element.style.backgroundPosition = 'center ' + aaa + 'px'; 
		});
	});
};

// $('html, body').stop().animate({scrollTop:$('.scroll-pin').eq(index).offset().top}, 1000,'easeOutCubic');