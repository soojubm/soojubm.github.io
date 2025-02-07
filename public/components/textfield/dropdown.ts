class Dropdown extends HTMLElement {
  // private isOpen: boolean = false
  private _dropdownButton: HTMLButtonElement
  private _dropdownList: HTMLElement
  private _indicatorIcon: any
  private _options: HTMLOptionElement[] = []

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    const dropdown = document.createElement('div')
    dropdown.classList.add('dropdown')

    this._dropdownButton = document.createElement('button')
    this._dropdownButton.classList.add('dropdown-button')
    this._dropdownButton.textContent = 'Select an option (this is web component)'
    this._dropdownButton.setAttribute('haspopup', 'listbox')
    this._dropdownButton.setAttribute('aria-pressed', 'false')

    this._dropdownList = document.createElement('div')
    this._dropdownList.classList.add('dropdown-list')

    this._indicatorIcon = document.createElement('mm-icon')
    this._indicatorIcon.setAttribute('name', 'nav-arrow-down')
    this._indicatorIcon.setAttribute('size', 'small')

    dropdown.appendChild(this._dropdownButton)
    dropdown.appendChild(this._dropdownList)
    this._dropdownButton.appendChild(this._indicatorIcon)

    this.shadowRoot?.appendChild(dropdown)

    const style = document.createElement('style')
    style.textContent = `
      .dropdown {
        position: relative;
      }
      .dropdown-button {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 10px var(--space-3);
        border: var(--border-stronger);
        border-radius: var(--radius);
        background-color: var(--color-background);
        color: var(--color-text);
        cursor: pointer;
        text-align: left;
        font-family: inherit;
      }
      .dropdown-button[aria-pressed=true] mm-icon {
        transform: rotate(180deg);
      }
      .dropdown-button[aria-pressed=true] + .dropdown-list {
        display: block;
      }

      .dropdown-list {
        display: none;
        max-height: 200px;
        overflow-y: auto;
        border: var(--border-stronger);
        border-radius: var(--radius);
        border-top: none;
        background-color: var(--color-background);
        box-shadow: var(--shadow);
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        z-index: 10;
      }
      .dropdown-item {
        padding: 8px var(--space-3);
        font-size: var(--font-size-small);
        cursor: pointer;
      }
      .dropdown-item:hover {
        background-color: var(--color-background-weak);
      }

      @media (max-width: 800px) {
        .dropdown-list {
          position: fixed;
          top: auto;
          bottom: 0; 
        }
      }
    `
    this.shadowRoot?.appendChild(style)

    this._dropdownButton.addEventListener('click', this.openDropdown.bind(this))
  }

  connectedCallback() {
    this._options = Array.from(this.querySelectorAll('option')) as HTMLOptionElement[]

    this._options.forEach(option => {
      const item = document.createElement('div')
      item.classList.add('dropdown-item')
      item.textContent = option.textContent
      item.dataset.value = option.value
      item.addEventListener('click', this.onOptionClick.bind(this))

      this._dropdownList.appendChild(item)
    })

    document.addEventListener('click', this.handleDocumentClick.bind(this))
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleDocumentClick.bind(this))
  }

  // toggleDropdown() {
  //   this.isOpen = !this.isOpen
  //   this._dropdownList.classList.toggle('open', this.isOpen)
  // }

  openDropdown() {
    this._dropdownButton.setAttribute('aria-pressed', 'true')
  }

  closeDropdown() {
    this._dropdownButton.setAttribute('aria-pressed', 'false')
  }

  onOptionClick(event: Event) {
    const target = event.target as HTMLElement
    const value = (target as HTMLElement).dataset.value

    this.closeDropdown()
    this._dropdownButton.textContent = target.textContent || ''

    this.dispatchEvent(new CustomEvent('change', { detail: value }))
  }

  handleDocumentClick(event) {
    if (!this.contains(event.target)) {
      this.closeDropdown()
    }
  }
}

export default Dropdown
