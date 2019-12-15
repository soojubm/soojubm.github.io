const tabMenu = () => {
	document.addEventListener('click', event => {
		const target = event.target;
		const tabActiceBar = document.querySelector('.profile-tablist-active');
		const tabs = target.parentNode.querySelectorAll('[role=tab]');
		const tabIndex = target.getAttribute('data-index');

		if(target.closest('[role=tab]')) {
			target.setAttribute('aria-selected', 'true');
			tabActiceBar.style.left = `${target.offsetLeft}px`;
			tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'));
		
			target.parentNode.parentNode.querySelectorAll('[role=tabpanel]').forEach(element => {
				element.setAttribute('aria-hidden', 'true');
				if(tabIndex === element.getAttribute('data-index')){
					element.setAttribute('aria-hidden', 'hidden');
				}
			});
		}
	}, true);
};

export default tabMenu;