export function stringByteLength(str) {
  let l = 0

  for (let idx = 0; idx < str.length; idx += 1) {
    const c = escape(str.charAt(idx))

    if (c.length === 1) l += 1
    else if (c.indexOf('%u') !== -1) l += 2
    else if (c.indexOf('%') !== -1) l += c.length / 3
  }
  return l
}

// export const getByteLength = data => {
//   let len = 0;
//   const str = data.substring(0);

//   if (str == null) return 0;

//   for (let i = 0; i < str.length; i++) {
//     const ch = escape(str.charAt(i));

//     if (ch.length === 1) len += 1;
//     else if (ch.indexOf('%u') !== -1) len += 2;
//     else if (ch.indexOf('%') !== -1) len += ch.length / 3;
//   }

//   return len;
// };

var stringToHTML = function(str) {
  var parser = new DOMParser()
  var doc = parser.parseFromString(str, 'text/html')
  return doc.body
}

var getElementHeight = function(element) {
  element.style.display = 'block'
  const height = element.scrollHeight + 'px'

  return height
}
// frameHeight = frameWidth * 9 / 16;

class Calculator {
  add(x, y) {
    return x + y
  }
  subtract(x, y) {
    return x - y
  }
}

// elements.filter((value, index, array) => array.indexOf(value) === index) // uniqs
const fullNumber = '2034399002125581'
const last4Digits = fullNumber.slice(-4)
const maskedNumber = last4Digits.padStart(fullNumber.length, '*')
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

const randomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// // 문자열
// typeof variable === 'string'
// tui.util.isString(variable)

// // 숫자
// typeof variable === 'number'
// tui.util.isNumber(variable)

// // 불린
// typeof variable === 'boolean'
// tui.util.isBoolean(variable)

// // 객체
// typeof variable === 'object'
// tui.util.isObject(variable)

// // 배열
// Array.isArray(arrayObject)
// tui.util.isArray(variable)

// // 널 Null
// variable === null
// tui.util.isNull(variable)

// // 미할당 Undefined
// typeof variable === 'undefined'
// variable === undefined
// tui.util.isUndefined(variable)

// // 엘리먼트 노드
// element.nodeType === 1
// tui.util.isHTMLNode(element)

// // 문자열 - 빈 문자열이 아닌가?
// if (string) ...
// if (tui.util.isNotEmpty(string)) ...

// // 문자열 - 빈 문자열인가?
// if (!string) ...
// if (tui.util.isEmpty(string)) ...

// // 배열 - 순회할 요소가 있는가?
// if (array.length) ...
// if (tui.util.isNotEmpty(array)) ...

// // 배열 - 빈 배열인가?
// if (!array.length) ...
// if (tui.util.isEmpty(array)) ...

// // 객체 - 순회할 속성이 있는가?
// if (tui.util.isNotEmpty(object)) ...

// // 객체 - 빈 객체인가?
// if (tui.util.isEmpty(object)) ...

// // 할당된 값이 있는가?
// if (tui.util.isExisty(variable)) ...

// // 참조변수가 참(true)인가?
// if (variable) ...

// // 참조변수가 거짓(false)인가?
// if (!variable) ...

function isEmpty(obj) {
  return Object.keys(obj).length === 0
}





const url = new URL();
// Get the value for the the "query" parameter
// returns "fetch"
url.searchParams.get('query');

// Gets all matching values, if there's more than one
// returns ["fetch"]
url.searchParams.getAll('query');

// Checks if a value exists in the search params (boolean)
// returns true
url.searchParams.has('query');

// Gets an Iterator of keys
// Iterators can be looped through with a for...of
url.searchParams.keys();

// Gets an iterator of values
url.searchParams.values();

// Appends a new search parameter entry
// This adds an *additional* entry if the key already exists
url.searchParams.append('query', 'chicken');

// Sets a search parameter entry
// If the value already exists, it will replace it
// If there are more than one, all others are deleted
url.searchParams.set('query', 'chicken');

// Deletes all instances of a search parameter
url.searchParams.delete('query');

// Provides an iterator method for looping through search parameter values
url.searchParams.forEach(function (value, key) {
	console.log(key, value);
});

// Sorts search parameters alphabetically by key
url.searchParams.sort();