import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { ToggleController } from '@/controllers/toggle-controller'

import { emit } from '@/utils'

interface RadioInputHost extends HTMLElement {
  name: string
  value: string
  checked: boolean
  disabled: boolean
}

/**
 * radio 계열(mm-radio, mm-radio-card)이 공유하는 네이티브 input·label·인디케이터 조립과 change 처리.
 * label 안에 무엇을 둘지는 각 컴포넌트가 정한다.
 */
export function renderRadioInput(
  host: RadioInputHost,
  inputId: string,
  toggle: ToggleController<'checked'>,
  label: unknown,
) {
  const handleInputChange = (event: Event) => {
    event.stopPropagation() // 네이티브 이벤트 전파 차단

    const target = event.target as HTMLInputElement
    if (!toggle.set(target.checked)) return

    emit(host, 'change', { checked: host.checked, value: host.value })
  }

  return html`
    <input
      type="radio"
      id=${inputId}
      name=${ifDefined(host.name || undefined)}
      .value=${host.value || ''}
      .checked=${host.checked}
      ?disabled=${host.disabled}
      @change=${handleInputChange}
    />
    <label for=${inputId}>
      <span class="indicator"></span>
      ${label}
    </label>
  `
}
