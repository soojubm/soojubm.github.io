var hName = /^[가-힣]+$/;
var hName2 =  /^[가-힣a-zA-Z]+$/;
var onlyNumbers = /^[0-9]*$/;

var englishNumber = /^[a-zA-Z0-9]{4,12}$/;
var password = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/; // 영숫특

var email = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
var phone = /^\d{2,3}-\d{3,4}-\d{4}$/; //  ex)123-123-1234
var phone2 =  /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/; // 010-0000-0000

var url = /^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/;

var isNumber = /[0-9]/gi;
var isAlphabet = /[a-z]/gi;
var isNumberAndAlphabet = /[a-z0-9]/;

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
	let height = field.scrollHeight + parseInt(computed.getPropertyValue('border-top-width'));
	field.style.height = height + 'px';
};


var add = function(num1, num2) {
	num1 = num1 || 0; // conditional operator
	num2 = num2 ? num2 : 0; // ternary operator

	return num1 + num2;
};

var getElementHeight = function(element) {
	element.style.display = 'block';
	var height = element.scrollHeight + 'px';
	
	return height;
};

const hasItem = (arr, item) => arr.includes(item);

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
	ampm: new Date().getHours() < 12 ? 'am' : 'pm'

	/*
	const dateString = date.toLocaleDateString().split('.');
	const [year, month, day] = dateString;
	console.log(date.toLocaleDateString()); // 1980년 1월 3일 목요일
	console.log(date.toLocaleTimeString()); // 오전 1:28:35
	console.log(date.toLocaleString()); // 1980년 1월 3일 목요일 오전 1:28:35
	*/
};