import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { paymentToInit, paymentSuccessSelector } from 'app/exchange'
import { Page } from 'components/Exchange'
import { Button } from 'components'
import { ReactComponent as PaymentSuccess } from 'assets/icons/payment_success.svg'
import { MAIN_EXCHANGE_ROUTE } from 'router'
import styles from './styles.module.sass'

export const Success = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const isPaymentSuccess = useSelector(paymentSuccessSelector)

  const onHomeClick = useCallback(() => {
    history.push(MAIN_EXCHANGE_ROUTE)
    dispatch(paymentToInit())
  }, [dispatch, history])

  useEffect(() => {
    if (!isPaymentSuccess) {
      onHomeClick()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Page className={styles.page}>
      <PaymentSuccess className={styles.icon} />
      <h3 className={styles.title}>Success!</h3>
      <p className={styles.text}>
        Your exchange order has been placed successfully and will be processed soon.
      </p>
      <Button onClick={onHomeClick}>Home</Button>
    </Page>
  )
}
