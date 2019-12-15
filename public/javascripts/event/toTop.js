const toTop = ({targetElement: target}) => {
	const toTopElement = document.querySelector(target);
	toTopElement.addEventListener('click', event => {
		event.preventDefault();
		window.scrollTo(0, 0);

		window.location.hash = toTopElement.name || toTopElement.href;
	});
};

export default toTop;