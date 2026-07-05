import { css } from 'lit'

export type SurfaceVariant = 'ghost' | 'outlined' | 'plain' | 'subtle' | 'elevated'
export type SurfaceSize = 'small' | 'medium'
export type SurfaceRadius = 'default' | 'large'

export const surfaceStyles = css`
  :host {
    --surface-height: auto;
    --surface-padding: var(--space-4);
    --surface-border: var(--border);
    --surface-border-radius: var(--radius);
    --surface-background-color: var(--color-background);

    display: flex;
    flex-direction: column;
    height: var(--surface-height);
    width: 100%;
    padding: var(--surface-padding);
    border: var(--surface-border);
    border-radius: var(--surface-border-radius);
    box-sizing: border-box;
    background: var(--surface-background-color);
    position: relative;
    z-index: 1;
    transition: box-shadow 0.2s ease-in-out;
  }

  :host([variant='ghost']) {
    border: var(--border-transparent);
    background: none;
  }

  :host([variant='plain']) {
    padding: 0;
    border: 0;
    background: none;
  }

  :host([variant='subtle']) {
    border: var(--border-transparent);
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
    --surface-border-radius: var(--radius);
  }

  :host([radius='large']) {
    --surface-border-radius: var(--radius-large);
  }
`
