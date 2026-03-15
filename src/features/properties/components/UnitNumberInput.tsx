import { Dropdown } from 'primereact/dropdown'
import type { PropertyInputProps } from './propertyInputUtils'
import { parseUnitValue } from './propertyInputUtils'

export function UnitNumberInput({ property, value, onChange }: PropertyInputProps) {
  const defaultUnit = property.defaultUnit ?? 'px'
  const allowedUnits = property.units ?? [defaultUnit]
  const { numeric, unit } = parseUnitValue(value ?? property.default, defaultUnit)
  const activeUnit = allowedUnits.includes(unit) ? unit : defaultUnit
  const suggestions = (property.suggestions ?? [])
    .filter((item) => item.kind === 'keyword')
    .map((item) => item.value)
  const numericSuggestions = suggestions.filter((item) => /^-?\d*\.?\d+$/.test(item))
  const isKeyword = typeof value === 'string' && value.trim() !== '' && !/^-?\d/.test(value.trim())
  const keywordValue = isKeyword ? String(value).trim() : ''
  const numericValue = Number.isFinite(numeric) ? String(numeric) : '0'
  const numberOptions = [...new Set([numericValue, ...numericSuggestions])]

  return (
    <div className="mt-1 space-y-1.5">
      {isKeyword ? (
        <Dropdown
          value={keywordValue}
          options={suggestions}
          editable
          showClear
          className="w-full"
          placeholder="Keyword value (auto, inherit, initial...)"
          onChange={(e) => {
            if (typeof e.value === 'string' && e.value.trim().length > 0) {
              onChange(e.value.trim())
              return
            }
            onChange(`${numeric}${activeUnit}`)
          }}
        />
      ) : (
        <div className="flex items-center gap-2">
          <Dropdown
            value={numericValue}
            options={numberOptions}
            editable
            className="w-full"
            placeholder="Numeric value"
            onChange={(e) => {
              if (typeof e.value === 'string' && e.value.trim().length > 0) {
                const nextNumeric = Number(e.value)
                if (Number.isFinite(nextNumeric)) {
                  onChange(`${nextNumeric}${activeUnit}`)
                }
                return
              }
              onChange(`${numeric}${activeUnit}`)
            }}
          />
          <Dropdown
            value={activeUnit}
            options={allowedUnits}
            editable
            className="w-40"
            onChange={(e) => {
              const nextUnit = typeof e.value === 'string' && e.value.trim().length > 0 ? e.value.trim() : defaultUnit
              onChange(`${numeric}${nextUnit}`)
            }}
          />
        </div>
      )}

    </div>
  )
}
