import React, { memo } from 'react'
import cn from 'classnames'
import styles from './styles.module.sass'

export const PaymentInfoRow = memo(({ label, amount, currency, className }) => {
  return (
    <li className={cn(styles.infoRow, className)}>
      <h5 className={styles.infoRowLabel}>{label}</h5>
      <p className={styles.infoRowValues}>
        <span>{Number(amount).toFixed(2)}</span> <span>{currency}</span>
      </p>
    </li>
  )
})
