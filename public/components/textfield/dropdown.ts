class Dropdown extends HTMLElement {
  private isOpen: boolean = false
  private _dropdownButton: HTMLButtonElement
  private _dropdownList: HTMLElement
  private _options: HTMLOptionElement[] = []

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    const dropdown = document.createElement('div')
    dropdown.classList.add('dropdown')

    this._dropdownButton = document.createElement('button')
    this._dropdownButton.classList.add('dropdown-button')
    this._dropdownButton.textContent = 'Select an option (this is web component)'

    this._dropdownList = document.createElement('div')
    this._dropdownList.classList.add('dropdown-list')

    dropdown.appendChild(this._dropdownButton)
    dropdown.appendChild(this._dropdownList)

    this.shadowRoot?.appendChild(dropdown)

    const style = document.createElement('style')
    style.textContent = `
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
    `
    this.shadowRoot?.appendChild(style)

    // 이벤트 리스너 설정
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
    // 컴포넌트가 DOM에서 제거될 때 이벤트 리스너를 정리합니다.
    document.removeEventListener('click', this.handleDocumentClick.bind(this))
  }

  // toggleDropdown() {
  //   this.isOpen = !this.isOpen
  //   this._dropdownList.classList.toggle('open', this.isOpen)
  // }

  openDropdown() {
    this.isOpen = true
    this._dropdownList.classList.add('open')
  }

  closeDropdown() {
    this.isOpen = false
    this._dropdownList.classList.remove('open')
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
