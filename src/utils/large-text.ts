import { LARGE_TEXT_STORAGE_KEY } from '@/constants'
import { readStorage, writeStorage } from '@/utils/storage'

const LARGE_TEXT_CLASS = 'large-text'

export function isLargeText() {
  return readStorage(LARGE_TEXT_STORAGE_KEY) === 'true'
}

export function applyLargeText(enabled = isLargeText()) {
  document.documentElement.classList.toggle(LARGE_TEXT_CLASS, enabled)
  return enabled
}

export function saveLargeText(enabled: boolean) {
  writeStorage(LARGE_TEXT_STORAGE_KEY, String(enabled))
  return applyLargeText(enabled)
}
