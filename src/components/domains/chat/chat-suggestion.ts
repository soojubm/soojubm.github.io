import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common'

import {
  renderSuggestionButton,
  resolveSuggestionValue,
  suggestionButtonStyles,
} from '@/components/domains/shared/suggestion-button'
import { emit } from '@/utils'

@customElement('fff-chat-suggestion')
export class ChatSuggestion extends LitElement {
  static styles = [suggestionButtonStyles]
  @property({ type: String }) value = ''
  @property({ type: String }) icon?: IconName

  render() {
    return renderSuggestionButton(this.icon, this.handleClick)
  }

  private handleClick = () => {
    emit(this, 'chat-suggestion-select', { value: resolveSuggestionValue(this) })
  }
}
