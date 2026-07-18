import { LitElement, html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { AvatarShape, AvatarSize, AvatarVariant } from '@/components/avatar/avatar'
import type { AriaTriState } from '@/types/aria'
import type { ListItem } from '@/components/list-item/list-item'
import '@/components/list-item/list-item'
import { ToggleController } from '@/controllers/toggle-controller'
import { emit } from '@/utils/emit'

type Constructor<T = object> = new (...args: any[]) => T

/**
 * menu-item 계열이 공유하는 표시 prop의 공개 인터페이스.
 * 행 콘텐츠 prop은 mm-list-item의 계약에서 파생해 두 곳이 어긋나면 컴파일 에러로 잡히게 한다.
 * tone은 행으로 전달되지 않는 host 스타일 상태로, CSS 상속을 통해 행 내부 색에 영향을 준다.
 */
export type MenuItemPresentation = Pick<
  ListItem,
  | 'size'
  | 'label'
  | 'description'
  | 'icon'
  | 'emoji'
  | 'avatarSrc'
  | 'avatarVariant'
  | 'avatarShape'
> & { tone: string }

/**
 * 표시 prop을 한 곳에서 선언하는 mixin. role·상태·이벤트 같은 시멘틱은 각 컴포넌트가 소유하고,
 * 행 콘텐츠로 흐르는 반복 prop과 host 스타일 상태(tone)만 공유한다.
 */
export const withMenuItemPresentation = <T extends Constructor<LitElement>>(Base: T) => {
  class MenuItemPresentationElement extends Base {
    @property({ type: String, reflect: true }) size: AvatarSize = '32'
    @property({ type: String, reflect: true }) tone = ''
    @property({ type: String }) label = ''
    @property({ type: String }) description = ''
    @property({ type: String }) icon?: IconName
    @property({ type: String }) emoji = ''
    @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
    @property({ type: String, attribute: 'avatar-variant' }) avatarVariant: AvatarVariant =
      'tertiary'
    @property({ type: String, attribute: 'avatar-shape' }) avatarShape: AvatarShape = 'square'
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
      aria-checked=${ifDefined(options.ariaChecked ?? undefined)}
      @click=${options.onActivate}
      @keydown=${handleKeydown}
    >
      ${content}
    </div>
  `
}

export function renderMenuItemContent(props: MenuItemPresentation, trailing: unknown) {
  return html`
    <mm-list-item
      size=${props.size}
      label=${props.label}
      description=${props.description}
      icon=${ifDefined(props.icon)}
      emoji=${ifDefined(props.emoji || undefined)}
      avatar-src=${ifDefined(props.avatarSrc || undefined)}
      avatar-variant=${props.avatarVariant}
      avatar-shape=${props.avatarShape}
    >
      ${renderTextSlots(props)} ${trailing}
    </mm-list-item>
  `
}

function renderTextSlots(props: MenuItemPresentation) {
  if (props.label) return nothing

  return html`
    <slot name="text"></slot>
    <slot></slot>
  `
}

export interface MenuItemToggleState {
  disabled: boolean
  checked: boolean
  value: string
  activate: () => void
}

/**
 * menu-item-checkbox·menu-item-switch가 공유하는 checked 상태와 토글 배선.
 * 트레일링 컨트롤(mm-checkbox/mm-switch)만 각 컴포넌트가 소유한다.
 */
export const withMenuItemToggleState = <T extends Constructor<LitElement>>(Base: T) => {
  class MenuItemToggleStateElement extends Base {
    @property({ type: Boolean }) disabled = false
    @property({ type: Boolean }) checked = false
    @property({ type: String }) value = ''

    private toggle = new ToggleController(this, {
      getValue: () => this.checked,
      setValue: checked => {
        this.checked = checked
      },
      isDisabled: () => this.disabled,
    })

    activate = () => {
      if (!this.toggle.set(!this.checked)) return

      emit(this, 'change', { checked: this.checked, value: this.value })
    }
  }

  return MenuItemToggleStateElement as Constructor<MenuItemToggleState> & T
}

/** checkbox·switch 계열이 공유하는 menuitemcheckbox 행 조립. */
export function renderMenuItemToggleRow(
  props: MenuItemPresentation & MenuItemToggleState,
  trailing: unknown,
) {
  return renderMenuItemRow(
    {
      role: 'menuitemcheckbox',
      disabled: props.disabled,
      ariaChecked: props.checked ? 'true' : 'false',
      onActivate: props.activate,
    },
    renderMenuItemContent(props, trailing),
  )
}
