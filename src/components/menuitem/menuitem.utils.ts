import { LitElement, html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { AvatarSize, AvatarVariant } from '@/components/avatar/avatar'
import type { AriaTriState } from '@/types/aria'
import '@/components/list-row/list-row'

type Constructor<T = object> = new (...args: any[]) => T

/** menu-item 계열이 공유하는 표시 prop(아바타·라벨·아이콘 등)의 공개 인터페이스. */
export declare class MenuItemPresentation {
  size: AvatarSize
  tone: string
  label: string
  description: string
  icon?: IconName
  emoji: string
  avatarSrc: string
  avatarVariant: AvatarVariant
}

/**
 * 표시 prop을 한 곳에서 선언하는 mixin. role·상태·이벤트 같은 시멘틱은 각 컴포넌트가 소유하고,
 * 아바타·라벨·아이콘처럼 행 콘텐츠로 흐르는 반복 prop만 공유한다.
 */
export const withMenuItemPresentation = <T extends Constructor<LitElement>>(Base: T) => {
  class MenuItemPresentationElement extends Base {
    @property({ type: String, reflect: true }) size: AvatarSize = 'medium'
    @property({ type: String, reflect: true }) tone = ''
    @property({ type: String }) label = ''
    @property({ type: String }) description = ''
    @property({ type: String }) icon?: IconName
    @property({ type: String }) emoji = ''
    @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
    @property({ type: String, attribute: 'avatar-variant' }) avatarVariant: AvatarVariant =
      'tertiary'
  }

  return MenuItemPresentationElement as Constructor<MenuItemPresentation> & T
}

export interface MenuItemRowOptions {
  role: 'menuitemcheckbox' | 'menuitemradio' | 'menuitem' | 'option'
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
      aria-disabled=${ifDefined(options.disabled ? 'true' : undefined)}
      aria-checked=${options.ariaChecked}
      @click=${options.onActivate}
      @keydown=${handleKeydown}
    >
      ${content}
    </div>
  `
}

export function renderMenuItemContent(props: MenuItemPresentation, trailing: unknown) {
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

function renderTextSlots(props: MenuItemPresentation) {
  if (props.label) return nothing

  return html`
    <slot name="text"></slot>
    <slot></slot>
  `
}
