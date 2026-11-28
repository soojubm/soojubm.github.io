import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import '@/components/common/button/button'

const PROVIDERS = {
  facebook: { label: '페이스북으로 시작', icon: ICON_NAMES.FACEBOOK },
  google: { label: 'Google로 시작', icon: ICON_NAMES.GOOGLE },
  apple: { label: 'Apple로 시작', icon: ICON_NAMES.APPLE },
} as const

export type SocialAuthProvider = keyof typeof PROVIDERS

@customElement('fff-social-auth-button')
export class SocialAuthButton extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) provider: SocialAuthProvider = 'facebook'

  render() {
    const { label, icon } = PROVIDERS[this.provider]

    return html`
      <fff-button size="large" full-width icon=${icon}>${label}</fff-button>
    `
  }
}
