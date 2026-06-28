import { html, nothing } from 'lit'

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

export function renderMenuItemContent(props: MenuItemProps, action: unknown) {
  return html`
    <mm-list-row
      size=${props.size}
      label=${props.label}
      description=${props.description}
      icon=${props.icon || nothing}
      emoji=${props.emoji || nothing}
      avatar-src=${props.avatarSrc || nothing}
      avatar-variant=${props.avatarVariant}
    >
      <slot name="avatar" slot="avatar"></slot>
      ${renderTextSlots(props)} ${action}
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
