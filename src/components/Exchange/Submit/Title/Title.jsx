import React, { memo } from 'react'

export const Title = memo(({ children, className }) => {
  return <h2 className={className}>{children}</h2>
})
