import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-component-example')
export class ComponentExample extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      .component-example {
        margin: 2.5rem 0 1rem calc(-5vw + 1rem);
        padding: 2rem calc(var(--grid-margin) - 1rem);
        /* border-radius: var(--radius-large) var(--radius-large) 0 0; */
        border: var(--border-stronger);
        border-left-color: var(--text-color);
        border-radius: var(--radius-large);

        /* box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.0125),
        0 2px 2px hsl(0deg 0% 0% / 0.0125),
        0 4px 4px hsl(0deg 0% 0% / 0.0125),
        0 8px 8px hsl(0deg 0% 0% / 0.0125),
        0 16px 16px hsl(0deg 0% 0% / 0.0125); */
      }

      @media (max-width: 1100px) {
        .component-example {
          margin-inline: calc(var(--grid-margin) * -1);
          padding-inline: var(--grid-margin);
          border-inline: 0;
          border-radius: 0;
        }
      }
    `,
  ]

  render() {
    return html`
      <section class="component-example">
        <slot></slot>
      </section>
    `
  }
}
