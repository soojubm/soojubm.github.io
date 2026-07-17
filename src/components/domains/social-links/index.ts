import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/flex/flex'

const PLATFORMS = [
  { key: 'github', label: 'Github', icon: ICON_NAMES.GITHUB },
  { key: 'pinterest', label: 'Pinterest', icon: ICON_NAMES.PINTEREST },
  { key: 'facebook', label: 'Facebook', icon: ICON_NAMES.FACEBOOK },
  { key: 'twitter', label: 'Twitter', icon: ICON_NAMES.TWITTER },
  { key: 'instagram', label: 'Instagram', icon: ICON_NAMES.INSTAGRAM },
  { key: 'notion', label: 'Notion', icon: ICON_NAMES.PEOPLE_TAG },
] as const

type PlatformKey = typeof PLATFORMS[number]['key']
type SocialLink = {
  key: PlatformKey
  label: string
  icon: typeof ICON_NAMES[keyof typeof ICON_NAMES]
  href: string
}

@customElement('mm-social-links')
export class SocialLinks extends LitElement {
  static styles = [
    resetStyles,
    css`
      .compact a {
        text-decoration: none;
        color: inherit;
      }
    `,
  ]

  @property({ type: String }) github = ''
  @property({ type: String }) pinterest = ''
  @property({ type: String }) facebook = ''
  @property({ type: String }) twitter = ''
  @property({ type: String }) instagram = ''
  @property({ type: String }) notion = ''

  @property({ type: Boolean }) compact = false

  render() {
    if (!this.activeLinks.length) return nothing
    return this.compact ? this.renderCompact() : this.renderDefault()
  }

  private get activeLinks() {
    return PLATFORMS.flatMap(({ key, label, icon }) => {
      const href = this[key as PlatformKey]
      if (!href) return []
      return [{ key, label, icon, href }]
    })
  }

  private renderDefault() {
    return html`
      <mm-menu-item-group>${this.renderDefaultLinks()}</mm-menu-item-group>
    `
  }

  private renderCompact() {
    return html`
      <mm-flex class="compact" gap="2">${this.renderCompactLinks()}</mm-flex>
    `
  }

  private renderDefaultLinks() {
    return this.activeLinks.map(link => this.renderDefaultLink(link))
  }

  private renderDefaultLink({ label, icon, href }: SocialLink) {
    return html`
      <mm-menu-item-link label=${label} icon=${icon} href=${href}></mm-menu-item-link>
    `
  }

  private renderCompactLinks() {
    return this.activeLinks.map(link => this.renderCompactLink(link))
  }

  private renderCompactLink({ label, icon, href }: SocialLink) {
    return html`
      <a href=${href} target="_blank" rel="noopener noreferrer" aria-label=${label}>
        <mm-avatar variant="primary" size="32" icon=${icon}></mm-avatar>
      </a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-social-links': SocialLinks
  }
}
