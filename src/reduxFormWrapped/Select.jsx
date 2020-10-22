import React from 'react'
import { Select } from 'components'

export const WrappedSelect = ({
  input: { value, onChange },
  meta: { touched, error },
  ...props
}) => {
  return (
    <div>
      <Select value={value} onChange={onChange} {...props} />
      <h5 className='error mt-1'>{touched && error}</h5>
    </div>
  )
}
