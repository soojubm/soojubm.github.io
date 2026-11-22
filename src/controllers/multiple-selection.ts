import type { SelectionStore } from '@/controllers/selection-store'

type SelectionOption = {
  value: string
  disabled?: boolean
  selectAll?: boolean
}

interface MultipleSelectionOptions {
  getValues: () => string[]
  /** 값은 컴포넌트의 reactive property라 대입하면 컴포넌트가 스스로 다시 그린다 */
  setValues: (values: string[]) => void
  getOptions: () => SelectionOption[]
}

/**
 * 항목을 누를 때마다 여러 값의 선택을 켜고 끄고, 전체 선택·부분 선택 상태를 알려 주는 클래스.
 * 전체 선택은 고를 수 있는 항목(disabled와 전체 선택 항목 자신 제외)만 대상으로 하며, 그 밖의 값은 그대로 둔다.
 */
export class MultipleSelection implements SelectionStore {
  constructor(private options: MultipleSelectionOptions) {}

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

  /** 전부 선택돼 있으면 해제하고, 아니면(일부·없음) 전부 선택한다. 전체 선택 컨트롤을 누른 동작이다. */
  toggleAll() {
    this.setAllSelected(!this.isAllSelected())
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
