import { html, nothing } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import '@/components/input/semantics/textfield-label'
import '@/components/input/semantics/textfield-helper'
import '@/components/input/semantics/textfield-validation'

export const renderFieldLabel = (forId: string, label: string | undefined, optional: boolean) => {
  if (!label) return nothing

  return html`
    <mm-textfield-label for=${forId} ?optional=${optional}>${label}</mm-textfield-label>
  `
}

export const renderFieldHelper = (helper: string | undefined, id?: string) => {
  if (!helper) return nothing

  return html`
    <mm-textfield-helper id=${ifDefined(id)}>${helper}</mm-textfield-helper>
  `
}

export const renderFieldValidation = (id: string, text: string | undefined) => {
  if (!text) return nothing

  return html`
    <mm-textfield-validation id=${id}>${text}</mm-textfield-validation>
  `
}
