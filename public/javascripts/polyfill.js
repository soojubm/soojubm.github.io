// todo 항상 실행시킬 필요가 없다. 브라우저를 확인하고.

/* eslint-disable */
// const polyfill = () => {
// 	if (!Element.prototype.matches) {
// 		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
// 	}

// 	if (!Element.prototype.closest) {
// 		Element.prototype.closest = function(s) {
// 			var el = this;

// 			do {
// 				if (el.matches(s)) return el;
// 				el = el.parentElement || el.parentNode;
// 			} while (el !== null && el.nodeType === 1);
// 			return null;
// 		};
// 	}
// }

// export default polyfill;

// custom event
// ie === 11
// ! forEach - removed
// ! includes -removed
;(function () {
  if (typeof window.CustomEvent === 'function') return false

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined }
    var evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
})()

// if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
//     document.write(
//       '<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>' +
//       '<script src="https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js"></script>'
//     );
//   }
