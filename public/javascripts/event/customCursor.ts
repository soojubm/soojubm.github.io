// const customCursor = () => {
// 	const cursor = document.querySelector('.loading-object');
// 	if(!cursor) return;
// 	const hoverElement = document.querySelectorAll('button, a');
// 	if(!hoverElement) return;

// 	document.addEventListener('DOMContentLoaded', setCursor({ cursorElement: cursor }));
// 	document.addEventListener('mousemove', setCursor({ cursorElement: cursor }));
// 	document.addEventListener('click', setRipple({ cursorElement: cursor }));

// 	cursor.classList.add('is-default');
// 	hoverElement.forEach(element => element.addEventListener('mouseleave', () => {
// 		cursor.classList.remove('is-clickable');
// 	}));
// 	hoverElement.forEach(element => element.addEventListener('mouseenter', () => {
// 		cursor.classList.add('is-clickable');
// 	}));

// 	function setCursor({ cursorElement: cursor }) {
// 		const x = event.clientX;
// 		const y = event.clientY;

// 		cursor.style.left = `${x}px`;
// 		cursor.style.top = `${y}px`;
// 		// cursor.style.transform = `translate(${x - 15}px, ${y - 15}px`;
// 	}
// 	function setRipple({ cursorElement: cursor }){
// 		cursor.classList.add('expand');
// 		setTimeout(() => {
// 			cursor.classList.remove('expand');
// 		}, 500);
// 	}
// };

// export default customCursor;