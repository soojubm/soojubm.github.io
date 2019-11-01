export const loader = () => {
	const { body } = document;
	const loaderElement = document.querySelector('.js-loading');
	window.addEventListener('load', function() {
		setTimeout(function() {
			loaderElement.classList.add('is-hidden');
			body.classList.remove('body-lock');
		}, 0);
	});
	document.addEventListener('DOMContentLoaded', function() {
		body.classList.add('body-lock');
	});
};

export const checkBrowser = () => {
	const BrowserElement = document.querySelector('.js-browser');
	let agent = navigator.userAgent.toLowerCase();
	if (agent.indexOf('msie') > -1 || agent.indexOf('trident') > -1) {
		BrowserElement.style.display = 'block';
	} else if (agent.indexOf('chrome') !== -1) {
		console.log(agent, '크롬');
	}
};


export const googleAnalytics = () => {
	// <script async src="https://www.googletagmanager.com/gtag/js?id=UA-83531239-1"></script>
	// window.dataLayer = window.dataLayer || [];
	// function gtag(){dataLayer.push(arguments);}
	// gtag('js', new Date());
	// gtag('config', 'UA-83531239-1');
};


export const adjustTopPadding = () => {
	const headerElement = document.querySelector('.header');
	const isFixedHeader = getComputedStyle(headerElement).position === 'fixed';
	const mainElement = document.querySelector('body');

	addPadding();
	window.addEventListener('scroll', () => {
		requestAnimationFrame(addPadding);
	});
	window.addEventListener('resize', () => {
		requestAnimationFrame(addPadding);
	});

	function addPadding() {
		if (isFixedHeader) {
			mainElement.style.marginTop = headerElement.clientHeight + 'px';
		} else {
			mainElement.style.marginTop = 0 + 'px';
		}
	}
};