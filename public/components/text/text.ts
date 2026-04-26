import { makeStyleSheet } from '../../javascripts/components/utils'

const textVariants = {
  display: {
    fontSize: '64px',
    lineHeight: '1',
    fontWeight: 'var(--font-weight-bold)',
  },
  title: {
    fontSize: 'var(--font-size-32)',
    lineHeight: 'var(--font-line-height-40)',
    fontWeight: 'var(--font-weight-bold)',
  },
  heading2: {
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    fontWeight: 'var(--font-weight-bold)',
  },
  subhead: {
    fontSize: 'var(--font-size-18)',
    lineHeight: 'var(--font-line-height-24)',
    fontWeight: 'var(--font-weight-bold)',
  },
  heading4: {
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--font-line-height-24)',
    fontWeight: 'var(--font-weight-bold)',
  },
  subheading: {
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--font-line-height-24)',
    fontWeight: 'var(--font-weight-normal)',
    color: 'var(--color-foreground-light)',
  },
  body: {
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--font-line-height-24)',
    fontWeight: 'var(--font-weight-normal)',
  },
  'body-large': {
    fontSize: 'var(--font-size-18)',
    lineHeight: 'var(--font-line-height-32)',
    fontWeight: 'var(--font-weight-normal)',
  },
  caption: {
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--font-line-height-16)',
  },
} as const

type TextVariant = keyof typeof textVariants

function applyVariantStyle(el: HTMLElement, variant: TextVariant) {
  const style = textVariants[variant]

  Object.entries(style).forEach(([key, value]) => {
    // @ts-ignore
    el.style[key] = value
  })
}

class Text extends HTMLElement {
  private hostElement: HTMLParagraphElement

  static get observedAttributes() {
    return ['variant', 'center', 'truncated']
  }

  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })

    this.hostElement = document.createElement('p')
    this.hostElement.classList.add('text')

    shadowRoot.append(makeStyleSheet('text'))
    shadowRoot.append(this.hostElement)
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    this.render()
  }

  private render() {
    const { hostElement } = this

    const slot = document.createElement('slot')
    this.hostElement.append(slot)

    // 2. variant style 적용
    applyVariantStyle(hostElement, this.variant)

    // 3. boolean props → class로 처리 (이게 더 맞다)
    hostElement.classList.toggle('is-center', this.center)
    hostElement.classList.toggle('is-truncated', this.truncated)
  }

  // get variant(): TextVariant {
  //   return (this.getAttribute('variant') as TextVariant) || 'body'
  // }

  get variant(): TextVariant {
    const v = this.getAttribute('variant')

    return (this.getAttribute('variant') as TextVariant) ?? 'body'
  }
  get center() {
    return this.hasAttribute('center')
  }

  get truncated() {
    return this.hasAttribute('truncated')
  }
}

export default Text
