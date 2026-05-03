export const countDownClock = (number = 100, format = 'seconds') => {
  convertFormat(format)

  function convertFormat(format) {
    switch (format) {
      case 'seconds':
        return timer(number)
      case 'minutes':
        return timer(number * 60)
      case 'hours':
        return timer(number * 60 * 60)
      case 'days':
        return timer(number * 60 * 60 * 24)
    }
  }

  function timer(seconds) {
    const daysElement = document.querySelector<HTMLElement>('.js-days')
    const hoursElement = document.querySelector<HTMLElement>('.js-hours')
    const minutesElement = document.querySelector<HTMLElement>('.js-minutes')
    const secondsElement = document.querySelector<HTMLElement>('.js-seconds')

    const now = Date.now()
    const then = now + seconds * 1000
    const countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000)
      if (secondsLeft <= 0) {
        clearInterval(countdown)
        return
      }
      daysElement!.innerHTML = `${Math.floor(secondsLeft / 86400)}`
      hoursElement!.innerText = `${Math.floor((secondsLeft % 86400) / 3600)}`
      minutesElement!.innerText = `${Math.floor(((secondsLeft % 86400) % 3600) / 60)}`
      secondsElement!.innerText = `${secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60}`
    }, 1000)
  }
}
