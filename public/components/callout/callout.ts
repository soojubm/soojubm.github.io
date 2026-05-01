import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { calloutStyles } from './callout.styles'

@customElement('mm-callout')
class Callout extends LitElement {
  @property({ type: String }) heading = ''
  @property({ type: String }) text = ''
  @property({ type: String }) variant = ''

  static styles = [calloutStyles]

  render() {
    return html`
      <div class="" data-variant="${this.variant}">
        <mm-icon name="warning-triangle" class="callout-icon"></mm-icon>
        ${this.heading ? html`<h3 class="callout-title">${this.heading}</h3>` : ''}
        ${this.text ? html`<p class="callout-text">${this.text}</p>` : ''}
        <slot></slot>
      </div>
    `
  }
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
