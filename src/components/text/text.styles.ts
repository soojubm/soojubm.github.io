import { css } from 'lit'

export type TextSize = '32' | '24' | '18' | '14' | '12'
export type TextWeight = 'medium' | 'bold'
export type TextColor = 'inherit' | 'light' | 'danger'
export type TextMaxLength = '' | '1' | '2' | '3'

export const textStyles = css`
  :host {
    display: block;
    color: inherit;
  }

  :host([color='light']) {
    color: var(--foreground-subtle-color);
  }
  :host([color='danger']) {
    color: var(--color-danger);
  }

  :host([centered]) {
    display: block;
    text-align: center;
  }

  :host([size='32']) {
    font-size: var(--font-size-32);
    line-height: var(--font-line-height-40);
  }
  :host([size='24']) {
    font-size: var(--font-size-24);
    line-height: var(--font-line-height-32);
  }
  :host([size='18']) {
    font-size: var(--font-size-18);
    line-height: var(--font-line-height-28);
  }
  :host([size='14']) {
    font-size: var(--font-size-14);
    line-height: var(--font-line-height-24);
  }
  :host([size='12']) {
    font-size: var(--font-size-12);
    line-height: var(--font-line-height-16);
  }

  :host([weight='bold']) {
    font-weight: var(--font-weight-bold);
  }

  :host([max-length]) > * {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([max-length='1']) > * {
    white-space: nowrap;
  }

  :host([max-length='2']) > *,
  :host([max-length='3']) > * {
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  :host([max-length='2']) > * {
    -webkit-line-clamp: 2;
  }

  :host([max-length='3']) > * {
    -webkit-line-clamp: 3;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    color: inherit;
  }
`
