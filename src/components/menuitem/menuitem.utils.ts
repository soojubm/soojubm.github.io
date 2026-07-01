import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import '@/components/list-row/list-row'

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
