export const setGraph = () => {
	const graphItems = document.querySelectorAll('.graph-item');
	if(!graphItems) return;

	graphItems.forEach(element => {
		const graphItemBar = element.querySelector('.graph-item-bar');
		const graphItemValue = element.querySelector('.graph-item-value');
		const graphValue = parseInt(graphItemValue.innerHTML);
		console.log(element, graphItemBar, graphItemValue);
		graphItemBar.style.height = graphValue + 'px';
		graphItemValue.style.bottom = graphValue + 'px';
	});
};