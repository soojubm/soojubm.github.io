const toggleClass = ({ triggerElement: trigger }) => {
	const triggers = document.querySelectorAll(trigger);
	if(!triggers) return;

	triggers.forEach(trigger => trigger.addEventListener('click', event => {
		event.stopPropagation();

		trigger.classList.toggle('is-active');
		trigger.setAttribute('aria-expanded', !!trigger.classList.contains('is-active'));

		const triggerNextElement = trigger.nextSibling.nextSibling;
		triggerNextElement.classList.toggle('is-visible');
		triggerNextElement.addEventListener('click', event => event.stopPropagation());

		triggers.forEach(trigger => {
			if(event.target === trigger) return;

			removeAllClass(trigger);
		});
	}));
		
	document.body.addEventListener('click', () => triggers.forEach(trigger => removeAllClass(trigger)));
};

const removeAllClass = targetElement => {
	targetElement.setAttribute('aria-expanded', 'true');
	targetElement.classList.remove('is-active');
	
	targetElement.nextSibling.nextSibling.classList.remove('is-visible');
};

export default toggleClass;