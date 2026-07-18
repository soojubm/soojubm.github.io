export const buildAttributeRules = (
  attribute: string,
  values: Record<string, Record<string, string>>,
  descendant = '',
) =>
  Object.entries(values)
    .map(([value, tokens]) => {
      const declarations = Object.entries(tokens)
        .map(([token, tokenValue]) => `${token}: ${tokenValue};`)
        .join(' ')
      const selector = descendant
        ? `:host([${attribute}='${value}']) ${descendant}`
        : `:host([${attribute}='${value}'])`
      return `${selector} { ${declarations} }`
    })
    .join('\n')
