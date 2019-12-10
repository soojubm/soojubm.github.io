var stringToHTML = function (str) {
	var parser = new DOMParser();
	var doc = parser.parseFromString(str, 'text/html');
	return doc.body;
};

// text.replace(/[^0-9]/gi)
// text.replace(/[^a-z]/gi)
// text.replace(/[^a-z0-9]/)

export const autoExpand = field => {
	field.style.height = 'inherit';
	
	const computed = window.getComputedStyle(field);
	const height = field.scrollHeight + parseInt(computed.getPropertyValue('border-top-width'));
	field.style.height = height + 'px';
};


var getElementHeight = function(element) {
	element.style.display = 'block';
	var height = element.scrollHeight + 'px';
	
	return height;
};

// function frameSizing() {
// 	var $frame = $('.player iframe');
// 	var frameWidth = $frame.width();
// 	var frameHeight = frameWidth * 9 / 16;
// 	$frame.height(frameHeight);

// 	$(window).resize(function(){
// 			frameWidth = $(window).width();
// 			frameHeight = frameWidth * 9 / 16;
// 			$frame.height(frameHeight);
// 	});
// }


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

export const todayDate = {
	today: new Date(),
	year: new Date().getFullYear(),
	month: String(new Date().getMonth() + 1).padStart(2, '0'),
	date: String(new Date().getDate()).padStart(2, '0'),
	day: new Date().getDay(), // 월 : 0
	hours: new Date().getHours(),
	minutes: new Date().getMinutes(),
	seconds: new Date().getSeconds(),
	ampm: new Date().getHours() < 12 ? 'am' : 'pm',
	isAm: new Date().getHours() < 12,
	isPm: new Date().getHours() > 12,

	/*
	const dateString = date.toLocaleDateString().split('.');
	const [year, month, day] = dateString;
	console.log(date.toLocaleDateString()); // 1980년 1월 3일 목요일
	console.log(date.toLocaleTimeString()); // 오전 1:28:35
	console.log(date.toLocaleString()); // 1980년 1월 3일 목요일 오전 1:28:35
	*/
};


// date.setDate(date.getDate() + 1) // if(today.getTime() < date.getTime())

const formatDate = timestamp => {
	const date = new Date(timestamp);
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',	'November', 'December'];
	return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

};

const randomNumber = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const timestamp = 9462;
const hours = Math.floor(timestamp / 60 / 60);
const minutes = Math.floor(timestamp / 60) - (hours * 60);
const seconds = timestamp % 60;
const formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');



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