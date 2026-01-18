class ComponentSection extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['title', 'description']
  }

  private titleEl?: HTMLElement
  private sectionTitle = ''
  private sectionDescription = ''

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback(): void {
    this.renderBase()
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue) return

    switch (name) {
      case 'title':
        this.sectionTitle = newValue ?? ''
        break
      case 'description':
        this.sectionDescription = newValue ?? ''
        break
    }

    this.updateTitle()
  }

  private renderBase(): void {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>
        section {
          display: block;
          padding: 1rem 0;
        }
        mm-title-with-description {
          display: block;
        }
        mm-separator {
          margin: 1rem 0;
          display: block;
        }
        .children {
          margin-top: 0.5rem;
        }
        .component-temp {
          margin: 0 0 1rem calc(-5vw + 1rem);
          padding: 2rem calc(var(--grid-margin) - 1rem) 2.25rem;
          border: var(--border);
          border-radius: var(--radius-large);
        }

        @media (max-width: 768px) {
          .component-temp {
            margin-left: 0;
            padding-inline: var(--grid-margin);
          }
        }
      </style>
      <section class="component-temp">
        <mm-title-with-description
          id="titleBlock"
          level="2"
          title="${this.sectionTitle}"
          description="${this.sectionDescription}"
        ></mm-title-with-description>
        <mm-separator></mm-separator>
        <div class="children">
          <slot></slot>
        </div>
      </section>
    `

    this.titleEl = this.shadowRoot.querySelector('#titleBlock') as HTMLElement
  }

  private updateTitle(): void {
    if (!this.titleEl) return
    this.titleEl.setAttribute('title', this.sectionTitle)
    this.titleEl.setAttribute('description', this.sectionDescription)
  }
}

export default ComponentSection
