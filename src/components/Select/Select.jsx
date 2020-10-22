import React, { useState, useCallback, useEffect } from 'react'
import LibSelect from 'react-select'

export const Select = ({ options, value, onChange, ...props }) => {
  const [selectedValue, setSelectedValue] = useState(value || options[0])
  const handleChange = useCallback(
    (newVal) => {
      onChange(newVal)
      setSelectedValue(newVal)
    },
    [onChange],
  )

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  return (
    <LibSelect
      options={options}
      onChange={handleChange}
      value={selectedValue}
      {...props}
    />
  )
}
