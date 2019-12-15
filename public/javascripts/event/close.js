const close = ({ targetElement: target }) => {
	const closeElement = document.querySelectorAll(target);
	if(!closeElement) return;

	closeElement.forEach(element => element.addEventListener('click', event => {
		(element.parentNode).style.display = 'none';
	}));
};

export default close;