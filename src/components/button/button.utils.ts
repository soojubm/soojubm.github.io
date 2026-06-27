import { emit } from '@/utils/emit'

export interface SelectableHost extends HTMLElement {
  disabled: boolean
  selected: boolean
  value: string
}

export function toggleSelection(host: SelectableHost) {
  if (host.disabled) return

  host.selected = !host.selected
  emit(host, 'change', { selected: host.selected, value: host.value })
}
