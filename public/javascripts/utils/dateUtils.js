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

export const formatDate = timestamp => {
	const date = new Date(timestamp);
	const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',	'November', 'December'];
	return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

};

const timestamp = 9462;
const hours = Math.floor(timestamp / 60 / 60);
const minutes = Math.floor(timestamp / 60) - (hours * 60);
const seconds = timestamp % 60;
const formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
