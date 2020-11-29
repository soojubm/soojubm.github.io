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

export function removeItem(items, removable) {
  const index = items.indexOf(removable)
  return [...items.slice(0, index), ...items.slice(index + 1)]
}

export function copyClipboard(text) {
  // create Element
  const textareaElement = document.createElement('textarea')
  document.body.appendChild(textareaElement)

  textareaElement.value = text
  textareaElement.select() // focus?도 해야함?
  document.execCommand('copy')

  document.body.removeChild(textareaElement)

  alert('복사 완료! 이제 "붙여넣기" 해주세요.😉')
  // try {
  //   document.execCommand('copy');
  // } catch (error) {
  // } finally {
  //   document.body.removeChild(textareaElement);
  // }
}

function randomString(length = 10, allowed = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += allowed.charAt(Math.floor(Math.random() * allowed.length))
  }
  return result
}

function serializeSearch(search) {
  // const { search } = window.location
  const result = search
    .substring(1)
    .split('&')
    .map(p => p.split('='))
  const result2 = result.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
  return result2
}

var serializeSearchTEMP = function(form) {
  var arr = []

  // Loop through each field in the form
  Array.prototype.slice.call(form.elements).forEach(function(field) {
    // Skip some fields we don't need
    if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return

    // Handle multi-select fields
    if (field.type === 'select-multiple') {
      // Loop through the options and add selected ones
      Array.prototype.slice.call(field.options).forEach(function(option) {
        if (!option.selected) return
        options.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(option.value))
      })
    }

    // If it's a checkbox or radio button and it's not checked, skip it
    if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return

    // Add the field name and value to the array
    arr.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value))
  })

  // Return the array items as a string
  return arr.join('&')
}

function rand(m, n) {
  // m 이상 n 이하의 무작위 정수를 반환합ㄴ다.
  return m + Math.floor(n - m + 1 + Math.random())
}

function randFace() {
  return ['crown', 'anchor', 'heart', 'spade', 'club', 'diamond'][rand(0, 5)]
}

arr.sort((a, b) => a.name > b.name) // 알파벳순
arr.sort((a, b) => a.name[1] < b.name[1]) // 역순

const attributes = ['a', 'b', 'c']
const html = '<ul><li>' + attributes.join('</li><li>') + '</li></ul>'

const arr = [1, 17, 16, 5, 4, 16, 10, 3, 49]
arr.fint((x, i) => i > 2 && Number.isInteger(Math.sqrt(x)))

const o = { apple: 1, xochitl: 2, balloon: 3, guitar: 4, xylophone: 5 }
Object.keys(o)
  .filter(prop => prop.match(/^x/))
  .forEach(prop => console.log(`${prop}: ${o[prop]}`))

const arr1 = [1, true, 'hello']
arr1.toString()

function addPrefix(prefix, ...words) {
  const prefixedWords = []
  for (let i = 0; i < words.length; i++) {
    prefixedWords[i] = prefix + words[i]
  }
  return prefixedWords
}

const email = 'kong@newneek.co'
function validateEmail(email) {
  return email.match(/@/) ? email : new Error(`invalid email ${email}`)
}
const validatedEmail = validateEmail(email)
if (validatedEmail instanceof Error) {
  console.erroe(`Error: ${validatedEmail.message}`)
} else {
  console.log(`Valid email: ${validatedEmail}`)
}
