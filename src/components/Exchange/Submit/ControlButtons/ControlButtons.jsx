import React, { memo } from 'react'
import cn from 'classnames'
import { Button } from 'components'
import styles from './styles.module.sass'

export const ControlButtons = memo(({ className, onCancel, onConfirm }) => {
  return (
    <div className={cn(styles.controlButtons, className)}>
      <Button className={styles.controlButtonsCancel} inverted onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onConfirm}>Confirm</Button>
    </div>
  )
})
