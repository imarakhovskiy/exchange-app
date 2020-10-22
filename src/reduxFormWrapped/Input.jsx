import React from 'react'
import { Input } from 'components'

export const WrappedInput = ({
  input: { value, onChange },
  meta: { touched, error },
  ...props
}) => {
  return (
    <div>
      <Input value={value} onChange={onChange} {...props} />
      <h5 className='error mt-1'>{touched && error}</h5>
    </div>
  )
}
