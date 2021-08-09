import { useState } from 'react'

type TextField = {
  type: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

type NumberField = {
  type: 'number'
  value: number
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

function useTextField(type: string, val = ''): TextField {
  const [value, setValue] = useState(val)

  return {
    type,
    value,
    onChange: event => {
      setValue(event.target.value)
    },
  }
}

function useNumberField(val = 0): NumberField {
  const [value, setValue] = useState(isNaN(val) ? 0 : val)

  return {
    type: 'number',
    value,
    onChange: event => {
      setValue(event.target.value !== '' ? parseInt(event.target.value) : 0)
    },
  }
}

export { useTextField, useNumberField }
