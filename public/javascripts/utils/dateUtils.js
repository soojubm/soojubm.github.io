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
}

// date.setDate(date.getDate() + 1) // if(today.getTime() < date.getTime())

export const formatDate = timestamp => {
  const date = new Date(timestamp)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
}

const timestamp = 9462
const hours = Math.floor(timestamp / 60 / 60)
const minutes = Math.floor(timestamp / 60) - hours * 60
const seconds = timestamp % 60
const formatted = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')

var timeFromNow = function(time) {
  // Get timestamps
  var unixTime = new Date(time).getTime()
  if (!unixTime) return
  var now = new Date().getTime()

  // Calculate difference
  var difference = unixTime / 1000 - now / 1000

  // Setup return object
  var tfn = {}

  // Check if time is in the past, present, or future
  tfn.when = 'now'
  if (difference > 0) {
    tfn.when = 'future'
  } else if (difference < -1) {
    tfn.when = 'past'
  }

  // Convert difference to absolute
  difference = Math.abs(difference)

  // Calculate time unit
  if (difference / (60 * 60 * 24 * 365) > 1) {
    // Years
    tfn.unitOfTime = 'years'
    tfn.time = Math.floor(difference / (60 * 60 * 24 * 365))
  } else if (difference / (60 * 60 * 24 * 45) > 1) {
    // Months
    tfn.unitOfTime = 'months'
    tfn.time = Math.floor(difference / (60 * 60 * 24 * 45))
  } else if (difference / (60 * 60 * 24) > 1) {
    // Days
    tfn.unitOfTime = 'days'
    tfn.time = Math.floor(difference / (60 * 60 * 24))
  } else if (difference / (60 * 60) > 1) {
    // Hours
    tfn.unitOfTime = 'hours'
    tfn.time = Math.floor(difference / (60 * 60))
  } else {
    // Seconds
    tfn.unitOfTime = 'seconds'
    tfn.time = Math.floor(difference)
  }
}

// ! nextDay
var nextDay = new Date(todayTimestamp + 1000 * 60 * 60 * 24 * 2)

export var getNextDay = function(dayName) {
  // The current day
  var date = new Date()
  var now = date.getDay()

  // Days of the week
  var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  // The index for the day you want
  var day = days.indexOf(dayName.toLowerCase())

  // Find the difference between the current day and the one you want
  var diff = day - now
  diff = diff < 1 ? 7 + diff : diff

  // Get the timestamp for the desired day
  var nextDayTimestamp = date.getTime() + 1000 * 60 * 60 * 24 * diff

  // Get the next day
  return new Date(nextDayTimestamp)
}

const now = new Date() // Sat Nov 28 2020 16:26:43 GMT+0900 (대한민국 표준시)
const halloweenParty = new Date(2016, 9, 31, 19, 0) // Mon Oct 31 2016 19:00:00 GMT+0900 (대한민국 표준시)

new Date().valueOf() // UTC 1970년 1월 1ㅣㄹ 자정으로부터 몇 밀리초가 지났는지 나타내는 숫자



date.setDate(date.getDate() + 1);
date.setHours(date.getHours() + 1);
date.setMinutes(date.getMinutes() + 10);
date.setSeconds(date.getSeconds() + 10);