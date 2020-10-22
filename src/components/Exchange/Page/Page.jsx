import React from 'react'
import cn from 'classnames'
import styles from './styles.module.sass'

export const Page = ({ children, className }) => {
  return (
    <div className={styles.page}>
      <div className={cn(styles.pageExchangeWindow, className)}>{children}</div>
    </div>
  )
}
