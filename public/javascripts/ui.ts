export const setGraph = () => {
	// const graph = document.querySelector('.js-graph');
	const graphItems = document.querySelectorAll('.js-graph .graph-item');
	if(!graphItems) return;

	graphItems.forEach(element => {
		const graphItemBar = element.querySelector<HTMLElement>('.graph-item-bar');
		const graphItemValue = element.querySelector<HTMLElement>('.graph-item-value');
		if(!graphItemBar || !graphItemValue) return;

		const graphValue = parseInt(graphItemValue.innerHTML);
		
		graphItemBar.style.height = `${graphValue}px`;
		graphItemValue.style.bottom = `${graphValue}'px`;
	});
};