var stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};

// text.replace(/[^a-z]/gi)

export const autoExpand = field => {
	field.style.height = 'inherit';
	
	const computed = window.getComputedStyle(field);
	const height = field.scrollHeight + parseInt(computed.getPropertyValue('border-top-width'));
	field.style.height = height + 'px';
};

var getElementHeight = function(element) {
	element.style.display = 'block';
	const height = element.scrollHeight + 'px';
	
	return height;
};
// frameHeight = frameWidth * 9 / 16;

class Calculator {
	add(x, y) {
		return x + y;
	}
	subtract(x, y) {
		return x - y;
	}
}

// elements.filter((value, index, array) => array.indexOf(value) === index) // uniq

// "javascrip".replace(/a/gi,"b")
const fullNumber = '2034399002125581';
const last4Digits = fullNumber.slice(-4);
const maskedNumber = last4Digits.padStart(fullNumber.length, '*');
/*
	var isDateSupported = function() {
		var input = document.createElement('input');
		input.setAttribute('type', 'date');
		input.setAttribute('value', 'x');
		return (input.value !== 'x');
	};
	if(isDateSupported()) {
		field.removeAttribute('pattern');
		field.removeAttribute('placeholder');
		var helperText = document.querySelector('.description');
		if(helperText) {
			helperText.parentNode.removeChild(helperText);
		}
	}
*/

const randomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getByteLength = data => {
  let len = 0;
  const str = data.substring(0);

  if (str == null) return 0;

  for (let i = 0; i < str.length; i++) {
    const ch = escape(str.charAt(i));

    if (ch.length === 1) len += 1;
    else if (ch.indexOf('%u') !== -1) len += 2;
    else if (ch.indexOf('%') !== -1) len += ch.length / 3;
  }

  return len;
};