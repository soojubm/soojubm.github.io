function removeAllClass(el) {
	el.setAttribute('aria-expanded', 'true');
	el.classList.remove('is-active');
	el.nextSibling.nextSibling.classList.remove('is-visible');
}

const toggleClass = ({ triggerElement: trigger }) => {
	const toggles = document.querySelectorAll(trigger);
	toggles.forEach(element => element.addEventListener('click', event => {
		event.stopPropagation();

		const ee = element.nextSibling.nextSibling;
		const { target } = event;

		toggles.forEach(el => {
			if(target === el) return;
			removeAllClass(el);
		});

		element.classList.toggle('is-active');
		ee.classList.toggle('is-visible');

		const ariaExpanded = !!element.classList.contains('is-active');
		element.setAttribute('aria-expanded', ariaExpanded);

		ee.addEventListener('click', event => event.stopPropagation());
	}));
		
	document.body.addEventListener('click', () => {
		toggles.forEach(element => removeAllClass(element));
	});
};

export default toggleClass;