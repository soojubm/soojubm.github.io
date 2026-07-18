export const buildAttributeRules = (
  attribute: string,
  values: Record<string, Record<string, string>>,
) =>
  Object.entries(values)
    .map(([value, tokens]) => {
      const declarations = Object.entries(tokens)
        .map(([token, tokenValue]) => `${token}: ${tokenValue};`)
        .join(' ')
      return `:host([${attribute}='${value}']) { ${declarations} }`
    })
    .join('\n')
