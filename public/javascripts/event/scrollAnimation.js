const eventScrollAnimation = () => {
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

export default eventScrollAnimation;