import { css } from 'lit'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { scrollbarStyles } from '@/stylesheets/shared/scrollbar.styles'

export const scrollStyles = [
  resetStyles,
  scrollbarStyles,
  css`
    :host {
      display: flex;
      min-width: 0;
      max-width: 100%;
    }

    :host([direction='row']) {
      flex-direction: row;
      overflow-x: auto;
      overflow-y: hidden;
    }

    :host([direction='column']) {
      flex-direction: column;
      max-height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }

    :host([hide-scrollbar]) {
      scrollbar-width: none;
    }

    :host([hide-scrollbar])::-webkit-scrollbar {
      display: none;
    }
  `,
]
