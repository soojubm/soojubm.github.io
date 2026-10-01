import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { FilterOption } from '@/components/common'

import { emit } from '@/utils'
import '@/components/common'

/**
 * 감상 기록 목록의 필터 한 줄. 라벨과 단일 선택 필터 그룹을 나란히 두고, 라벨을 그룹의 이름으로 쓴다.
 * mm-media-list가 필터마다 하나씩 쓰며, 선택이 바뀌면 그룹의 change를 끊고 자기 change로 다시 알린다.
 */
@customElement('mm-media-filter')
export class MediaFilter extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: baseline;
      gap: var(--space-3);
    }

    mm-text {
      min-width: var(--size-32);
    }

    mm-filter-button-group {
      flex: 1;
    }
  `
  @property({ type: String }) label = ''
  @property({ attribute: false }) options: FilterOption[] = []

  render() {
    return html`
      <mm-text size="12" color="light" aria-hidden="true">${this.label}</mm-text>
      <mm-filter-button-group
        mode="single"
        aria-label=${this.label}
        .options=${this.options}
        @change=${this.handleGroupChange}
      ></mm-filter-button-group>
    `
  }

  private handleGroupChange(e: CustomEvent<{ values: string[] }>) {
    e.stopPropagation()
    emit(this, 'change', { values: e.detail.values })
  }
}
