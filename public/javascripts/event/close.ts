const close = ({ targetElement: target }) => {
	const closeElements = document.querySelectorAll(target);
	if(!closeElements) return;

	closeElements.forEach(element => element.addEventListener('click', () => {
		(element.parentNode).style.display = 'none';
	}));
};

export default close;