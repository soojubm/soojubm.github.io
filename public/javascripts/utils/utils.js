export function backHistory() {
  
}

export const isScrollEnd = window.innerHeight + window.pageYOffset >= document.body.offsetHeight

function getCookie (name) {
	let value = `; ${document.cookie}`;
	let parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}


const download = () => {
	// <a href="/path/to/file" download>Download</a>
	const link = document.createElement('a')
	link.download = 'file name'
	link.href = '/path/to/file'
  
	document.body.appendChild(link)
	link.click()
  
	document.body.removeChild(link)
  
	// const data = JSON.stringify({ 'message': 'Hello Word' });
	// const blob = new Blob([data], { type: 'application/json' });
	// // Create new URL
	// const url = window.URL.createObjectURL(blob);
	// // Create a link and trigger the download
	// ...
	// // Free the URL created above
	// window.URL.revokeObjectURL(url);
  }
  
  export const adjustTopPadding = () => {
	const headerElement = document.querySelector<HTMLElement>('.js-navbar')
	if (!headerElement) return
  
	const fn = () => setBodyMarginTop(headerElement)
	setBodyMarginTop(headerElement)
	window.addEventListener('scroll', () => requestAnimationFrame(fn))
	window.addEventListener('resize', () => requestAnimationFrame(fn))
  
	function setBodyMarginTop(headerElement) {
	  const { body } = document
	  const isFixedHeader = getComputedStyle(headerElement).position === 'fixed'
  
	  body.style.marginTop = isFixedHeader ? `${headerElement.clientHeight}px` : 0
	}
  }
  