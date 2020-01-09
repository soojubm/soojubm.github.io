type Parameter = {
	selector: string
};

// selector
const toggleClass = ({ selector: trigger }: Parameter) => {
	const triggers = document.querySelectorAll(trigger);
	if(!triggers) return;

	triggers.forEach(element => element.addEventListener('click', event => {
		event.stopPropagation();

		element.classList.toggle('is-active');
		element.setAttribute('aria-expanded', `${element.classList.contains('is-active')}`);

		const triggerNextElement = element.nextSibling && element.nextSibling.nextSibling as HTMLElement;
		if(!triggerNextElement) return;
		
		triggerNextElement.classList.toggle('is-visible');
		triggerNextElement.addEventListener('click', event => event.stopPropagation());

		triggers.forEach(element => {
			if(event.target === element) return;
			removeAllClass(element);
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