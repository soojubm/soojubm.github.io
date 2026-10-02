import type { SelectionStore } from '@/controllers/selection-store'

type SelectionOption = {
  value: string
  disabled?: boolean
  selectAll?: boolean
}

interface MultipleSelectionControllerOptions {
  getValues: () => string[]
  /** 값은 호스트의 reactive property라 대입하면 호스트가 스스로 다시 그린다 */
  setValues: (values: string[]) => void
  getOptions: () => SelectionOption[]
}

/**
 * 여러 값을 고르는 그룹의 선택 값을 소유한다.
 * 전체 선택은 고를 수 있는 항목(disabled와 전체 선택 항목 자신을 뺀 나머지)만 대상으로 삼는다.
 * 켜고 끌 때 그 밖의 값(disabled 항목에 이미 걸린 선택 등)은 사용자가 바꿀 수 없으므로 그대로 둔다.
 */
export class MultipleSelectionController implements SelectionStore {
  constructor(private options: MultipleSelectionControllerOptions) {}

  select(option: SelectionOption) {
    this.setSelected(option, !this.isOptionSelected(option))
  }

  setSelected(option: SelectionOption, selected: boolean) {
    if (option.selectAll) {
      this.setAllSelected(selected)
      return
    }

    this.options.setValues(this.getValuesForState(option.value, selected))
  }

  isEmpty() {
    return this.options.getValues().length === 0
  }

  isSelected(value: string) {
    return this.options.getValues().includes(value)
  }

  isOptionSelected(option: SelectionOption) {
    if (!option.selectAll) return this.isSelected(option.value)

    return this.isAllSelected()
  }

  isAllSelected() {
    const selectableValues = this.selectableValues
    return selectableValues.length > 0 && selectableValues.every(value => this.isSelected(value))
  }

  /** 고를 수 있는 항목 중 일부만 선택된 상태. 전체 선택 컨트롤의 indeterminate에 쓴다. */
  isPartiallySelected() {
    const selectableValues = this.selectableValues
    const selectedCount = selectableValues.filter(value => this.isSelected(value)).length
    return selectedCount > 0 && selectedCount < selectableValues.length
  }

  setAllSelected(selected: boolean) {
    const selectableValues = this.selectableValues
    const otherValues = this.options.getValues().filter(value => !selectableValues.includes(value))

    this.options.setValues(selected ? [...otherValues, ...selectableValues] : otherValues)
  }

  private getValuesForState(value: string, selected: boolean) {
    const values = this.options.getValues()
    if (selected) return [...new Set([...values, value])]

    return values.filter(candidate => candidate !== value)
  }

  private get selectableValues() {
    const selectableOptions = this.options
      .getOptions()
      .filter(option => !option.disabled && !option.selectAll)
    return selectableOptions.map(option => option.value)
  }
}
