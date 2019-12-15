
export const parallax = (targetElement) => {
	const target = document.querySelectorAll(targetElement);
	if(!target) return;
	window.addEventListener('scroll', () => {
		target.forEach((element) => {
			//console.log(window.pageYOffset, element.offsetTop);
			let rate = window.pageYOffset * -0.2 - 600;
			let aaa = (window.pageYOffset - element.offsetTop) * -1.5; // scrolled = window.pageYOffset
			//let bbb = aaa > 0 ? -aaa : aaa;
			element.style.backgroundPosition = 'center ' + aaa + 'px'; 
			// element.style.transform = 'translate3d(0px, '+rate+'px, 0px)';
			// DataTransferItemList.rate
		});
	});
};