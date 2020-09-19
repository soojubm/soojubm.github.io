export const createGraph = () => {
  const graphItems = document.querySelectorAll('.js-graph .graph-item')
  if (!graphItems) return

  graphItems.forEach(element => {
    const graphItemBar = element.querySelector<HTMLElement>('.graph-item-bar')
    const graphItemValue = element.querySelector<HTMLElement>('.graph-item-value')
    if (!graphItemBar || !graphItemValue) return

    const graphValue = parseInt(graphItemValue.innerText)

    graphItemBar.style.height = `${graphValue}px`
    graphItemValue.style.bottom = `${graphValue}px`
  })
}
