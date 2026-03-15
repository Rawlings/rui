import { InputText } from 'primereact/inputtext'

interface PanelSearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  className?: string
}

export function PanelSearchInput({ value, onChange, placeholder, className }: PanelSearchInputProps) {
  return (
    <InputText
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className={className ?? 'w-full'}
    />
  )
}
