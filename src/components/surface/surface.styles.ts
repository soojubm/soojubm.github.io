import { css } from 'lit'

export type SurfaceVariant = 'transparent' | 'flat' | 'plain' | 'subtle' | 'elevated'
export type SurfaceSize = 'small' | 'medium'
export type SurfaceRadius = 'default' | 'large'

export const surfaceStyles = css`
  :host {
    --surface-height: auto;
    --surface-padding: var(--space-4);
    --surface-border: var(--border);
    --surface-radius: var(--radius);
    --surface-color: var(--color-background);

    display: flex;
    flex-direction: column;
    height: var(--surface-height);
    width: 100%;
    padding: var(--surface-padding);
    border: var(--surface-border);
    border-radius: var(--surface-radius);
    box-sizing: border-box;
    background: var(--surface-color);
    position: relative;
    z-index: 1;
    transition: box-shadow 0.2s ease-in-out;
  }

  :host([variant='transparent']) {
    border: var(--border-transparent);
    background: none;
  }

  :host([variant='plain']) {
    padding: 0;
    border: 0;
    background: none;
  }

  :host([variant='subtle']) {
    background-color: var(--color-background-subtle);
  }

  :host([variant='elevated']) {
    box-shadow: var(--shadow);
  }

  :host([size='small']) {
    padding: var(--space-2);
  }

  :host([size='medium']) {
    width: 100%;
    max-width: var(--width-medium);
  }

  :host([radius='default']) {
    --surface-radius: var(--radius);
  }

  :host([radius='large']) {
    --surface-radius: var(--radius-large);
  }
`
