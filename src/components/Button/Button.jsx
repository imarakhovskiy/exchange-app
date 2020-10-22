import React from 'react'
import cn from 'classnames'
import styles from './styles.module.sass'

export const Button = ({
  children,
  className,
  onClick = () => {},
  inverted = false,
  ...props
}) => {
  return (
    <button
      className={cn(className, styles.button, { [styles.buttonInverted]: inverted })}
      onClick={(e) => onClick(e.target.value)}
      {...props}
    >
      {children}
    </button>
  )
}
