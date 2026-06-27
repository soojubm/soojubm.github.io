import { html } from 'lit'

export const renderTypingBubble = () => html`
  <div class="bubble">
    <div class="typing">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
`

export const renderImageBubble = (src: string) => html`
  <div class="bubble is-image">
    <mm-thumbnail src=${src} alt="" ratio="4:3"></mm-thumbnail>
  </div>
`
