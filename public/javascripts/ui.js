export const setGraph = () => {
	const graph = document.querySelector('.js-graph');
	const graphItems = graph.querySelectorAll('.graph-item');
	if(!graphItems) return;

	graphItems.forEach(element => {
		const graphItemBar = element.querySelector('.graph-item-bar');
		const graphItemValue = element.querySelector('.graph-item-value');
		const graphValue = parseInt(graphItemValue.innerHTML);
		graphItemBar.style.height = graphValue + 'px';
		graphItemValue.style.bottom = graphValue + 'px';
	});
};