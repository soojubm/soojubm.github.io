import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { scrollbarStyles } from '@/stylesheets/shared/scrollbar.styles'

export type PopoverPlacement = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

/**
 * anchor 기반 non-modal 레이어 프리미티브.
 * viewport 기준 modal 레이어인 mm-sheet와 달리 backdrop·portal·스크롤 잠금 없이
 * 가장 가까운 positioned 조상을 기준으로 떠 있는 패널 표면만 책임집니다.
 * 열림 상태는 anchor(트리거)를 소유한 컴포넌트가 제어하고, 좌표(placement)와 너비(width)는
 * popover 자신이 책임집니다.
 */
@customElement('mm-popover')
class Popover extends LitElement {
  static styles = [
    scrollbarStyles,
    css`
      :host {
        --popover-padding: var(--space-1);
        --popover-border: var(--border);
        --popover-border-radius: var(--radius);
        --popover-background-color: var(--color-background);
        --popover-shadow: var(--shadow);
        --popover-max-height: none;
        --popover-width: auto;
        --popover-offset: var(--space-1);
        --popover-transition-duration: 180ms;

        display: flex;
        flex-direction: column;
        width: var(--popover-width);
        max-height: var(--popover-max-height);
        padding: var(--popover-padding);
        border: var(--popover-border);
        border-radius: var(--popover-border-radius);
        background: var(--popover-background-color);
        box-shadow: var(--popover-shadow);
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
        position: absolute;
        top: calc(100% + var(--popover-offset));
        left: 0;
        right: 0;
        z-index: var(--zindex-popover);

        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(var(--space-1-minus));
        transition: opacity var(--popover-transition-duration) ease,
          transform var(--popover-transition-duration) cubic-bezier(0.2, 0.8, 0.2, 1),
          visibility 0s linear var(--popover-transition-duration);
      }

      :host([placement='bottom-right']),
      :host([placement='top-right']) {
        left: auto;
        right: 0;
      }

      :host([placement='top-left']),
      :host([placement='top-right']) {
        top: auto;
        bottom: calc(100% + var(--popover-offset));
      }

      :host([open]) {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
        transition: opacity var(--popover-transition-duration) ease,
          transform var(--popover-transition-duration) cubic-bezier(0.2, 0.8, 0.2, 1), visibility 0s;
      }
    `,
  ]

  @property({ type: Boolean, reflect: true }) open = false
  @property({ type: String, reflect: true }) placement: PopoverPlacement = 'bottom-left'
  @property({ type: String }) width = ''
  @property({ type: String }) padding = ''

  render() {
    return html`
      <slot></slot>
    `
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('width')) this.syncWidth()
    if (changedProperties.has('padding')) this.syncPadding()
  }

  private syncWidth() {
    if (!this.width) {
      this.style.removeProperty('--popover-width')
      return
    }

    this.style.setProperty('--popover-width', this.width)
  }

  private syncPadding() {
    if (!this.padding) {
      this.style.removeProperty('--popover-padding')
      return
    }

    this.style.setProperty('--popover-padding', this.padding)
  }
}

export default Popover
