import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { ButtonSize } from '@/components/common/button/button'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import '@/components/common/button/button'

const PROVIDERS = {
  facebook: { label: '페이스북으로 시작', icon: ICON_NAMES.FACEBOOK },
  google: { label: 'Google로 시작', icon: ICON_NAMES.GOOGLE },
  apple: { label: 'Apple로 시작', icon: ICON_NAMES.APPLE },
} as const

export type SocialAuthProvider = keyof typeof PROVIDERS

/**
 * 외부 계정으로 로그인·가입을 시작하는 버튼.
 * 레이블과 아이콘은 provider가 정하고, 항상 컨테이너 폭을 채운다.
 */
@customElement('mm-social-auth-button')
export class SocialAuthButton extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) provider: SocialAuthProvider = 'facebook'
  @property({ type: String }) size: ButtonSize = 'medium'

  render() {
    const { label, icon } = PROVIDERS[this.provider]

    return html`
      <mm-button size=${this.size} full-width icon=${icon}>${label}</mm-button>
    `
  }
}
