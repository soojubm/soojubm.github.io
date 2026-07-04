import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { AriaTriState } from '@/types/aria'
import '@/components/list-row/list-row'

export interface MenuItemRowOptions {
  role: string
  disabled: boolean
  ariaChecked: AriaTriState
  onActivate: () => void
}

/** checkbox·radio·switch 계열이 공유하는 선택 가능한 행. role·상태·키보드 활성화를 행이 소유한다. */
export function renderMenuItemRow(options: MenuItemRowOptions, content: unknown) {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    options.onActivate()
  }

  return html`
    <div
      role=${options.role}
      tabindex=${options.disabled ? '-1' : '0'}
      aria-disabled=${options.disabled ? 'true' : nothing}
      aria-checked=${options.ariaChecked}
      @click=${options.onActivate}
      @keydown=${handleKeydown}
    >
      ${content}
    </div>
  `
}

export interface MenuItemProps {
  size: string
  label: string
  description: string
  icon?: IconName
  emoji: string
  avatarSrc: string
  avatarVariant: string
}

export function renderMenuItemContent(props: MenuItemProps, trailing: unknown) {
  return html`
    <mm-list-row
      size=${props.size}
      label=${props.label}
      description=${props.description}
      icon=${ifDefined(props.icon)}
      emoji=${ifDefined(props.emoji || undefined)}
      avatar-src=${ifDefined(props.avatarSrc || undefined)}
      avatar-variant=${props.avatarVariant}
    >
      ${renderTextSlots(props)} ${trailing}
    </mm-list-row>
  `
}

function renderTextSlots(props: MenuItemProps) {
  if (props.label) return nothing

  return html`
    <slot name="text"></slot>
    <slot></slot>
  `
}
