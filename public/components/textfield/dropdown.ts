class Dropdown extends HTMLElement {
  private isOpen: boolean = false
  private _dropdownButton: HTMLButtonElement
  private _dropdownList: HTMLElement
  private _options: HTMLOptionElement[] = []

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        .dropdown {
          position: relative;
          width: 200px;
          font-size: 16px;
        }
        .dropdown-button {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: white;
          cursor: pointer;
          text-align: left;
        }
        .dropdown-list {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid #ccc;
          border-top: none;
          background-color: white;
          display: none;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          z-index: 10;
        }
        .dropdown-list.open {
          display: block;
        }
        .dropdown-item {
          padding: 8px;
          cursor: pointer;
        }
        .dropdown-item:hover {
          background-color: #f0f0f0;
        }
      </style>

      <div class="dropdown">
        <button class="dropdown-button">Select an option</button>
        <div class="dropdown-list">
        </div>
      </div>
    `
    // <slot></slot>

    this.shadowRoot?.appendChild(template.content.cloneNode(true))

    this._dropdownButton = this.shadowRoot?.querySelector('.dropdown-button') as HTMLButtonElement
    this._dropdownList = this.shadowRoot?.querySelector('.dropdown-list') as HTMLElement
    this._dropdownButton.addEventListener('click', this.toggleDropdown.bind(this))
  }

  connectedCallback() {
    this._options = Array.from(this.querySelectorAll('option')) as HTMLOptionElement[]

    // 드롭다운 항목 클릭 이벤트 처리
    this._options.forEach(option => {
      const item = document.createElement('div')
      item.classList.add('dropdown-item')
      item.textContent = option.textContent
      item.dataset.value = option.value
      item.addEventListener('click', this.onOptionClick.bind(this))
      this._dropdownList.appendChild(item)
    })
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen
    this._dropdownList.classList.toggle('open', this.isOpen)
  }

  onOptionClick(event: Event) {
    const target = event.target as HTMLElement
    const value = (target as HTMLElement).dataset.value
    this._dropdownButton.textContent = target.textContent || ''
    this.isOpen = false
    this._dropdownList.classList.remove('open')
    this.dispatchEvent(new CustomEvent('change', { detail: value }))
  }
}

export default Dropdown
