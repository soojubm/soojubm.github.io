class CloseButton extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = `
      <button class="">
        <span class="material-symbols-outlined">close</span>
      </butt>
    `
    this.addEventListener('click', () => console.log('test'))
  }

  connectedCallback() {
    console.log('connected!', this)
  }

  disconnectedCallback() {
    console.log('disconnected', this)
  }
}
