const customCursor = () => {
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

export default customCursor;