import { makeStyleSheet } from '../../javascripts/components/utils'

class Callout extends HTMLElement {
  constructor() {
    super()
  }

  get heading() {
    return this.getAttribute('heading')
  }

  get text() {
    return this.getAttribute('text')
  }

  get variant() {
    return this.getAttribute('variant')
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('callout')
    container.dataset.variant = this.variant || ''

    // const heading = document.createElement('h3')
    // heading.classList.add('callout-title')
    // heading.innerText = this.heading || ''

    const text = document.createElement('p')
    text.classList.add('callout-text')
    text.innerText = this.text || ''

    const icon = document.createElement('test-icon')
    icon.setAttribute('name', 'warning-triangle')
    icon.classList.add('callout-icon')

    const rest = document.createElement('slot')

    shadow.append(container, makeStyleSheet('callout'))
    container.append(icon, text, rest)
  }
  disconnectedCallback() {}
}

export default Callout

// noti
const notifications = document.getElementById('notifications')

// document.addEventListener('visibilitychange', () => {
//   let setting = document.hidden ? ['none', 'off'] : ['status', 'polite']

//   notification.setAttribute('role', setting[0])
//   notification.setAttribute('aria-live', setting[1])
// })

// function Notifier(type, regionEl, duration) {
//   this.regionEl = regionEl;
//   this.duration = duration || 10000;
//   this.type = type || 'info';
// }

// Notifier.prototype.notify = function(message) {
//   let note = document.createElement('p');

//   note.innerHTML = `
//     <svg viewBox="0 0 20 20" focusable="false">
//       <use xlink:href="#${this.type}"></use>
//     </svg>
//     <span class="visually-hidden">${this.type}:</span>
//     ${message}
//   `;

//   this.regionEl.appendChild(note);

//   window.setTimeout(() => {
//     this.regionEl.removeChild(note)
//   }, this.duration);
// }

// const infoNotifications = new Notifier(
//   'info',
//   document.getElementById('notifications'),
//   5000
// );

// infoNotifications.notify('Heydon666 has joined this group.');
