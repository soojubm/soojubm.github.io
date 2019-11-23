export const setGraph = () => {
	const graphItems = document.querySelectorAll('.graph-item');
	if(!graphItems) return;

	let graphItemValue;
	let graphItemBar;
	let graphValue;

	graphItems.forEach((element) => {
		graphItemBar = element.querySelector('.graph-item-bar');
		graphItemValue = element.querySelector('.graph-item-value');
		graphValue = parseInt(graphItemValue.innerHTML);

		(function setGraph() {
			graphItemBar.style.height = graphValue + 'px';
			graphItemValue.style.bottom = graphValue + 'px';
		})();
	});
};