export const parseJsonArray = <T>(value: string | null, fallback: T[] = []): T[] => {
  if (!value) return fallback

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export const arrayAttributeConverter = <T>(fallback: T[] = []) => ({
  fromAttribute: (value: string | null) => parseJsonArray<T>(value, fallback),
  toAttribute: (value: T[]) => JSON.stringify(value ?? fallback),
})
