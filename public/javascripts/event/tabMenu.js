// 리팩토링하긔
const tabMenu = () => {
	document.addEventListener('click', event => {
		const { target } = event;
		const tabActiceBar = document.querySelector('.profile-tablist-active');
		const tabs = target.parentNode.querySelectorAll('[role=tab]');
		const tabIndex = target.getAttribute('data-index');
		if(!tabs) return;

		if(target.closest('[role=tab]')) {
			tabActiceBar.style.left = `${target.offsetLeft}px`;
			tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'));
			target.setAttribute('aria-selected', 'true');
			target.parentNode.parentNode.querySelectorAll('[role=tabpanel]').forEach(element => {
				element.setAttribute('aria-hidden', 'true');
				if(tabIndex === element.getAttribute('data-index')) {
					element.setAttribute('aria-hidden', 'hidden');
				}
			});
		}
	}, true);
};

export default tabMenu;