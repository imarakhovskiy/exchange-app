import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { destroy } from 'redux-form'
import useAction from 'hooks/useAction'
import useExchangeFormFields from 'hooks/useExchangeFormFields'
import { postPayment, recalculateToInit } from 'app/exchange/Actions'
import { Page } from 'components/Exchange'
import { Title, PaymentInfo, ControlButtons } from 'components/Exchange/Submit'
import { MAIN_EXCHANGE_ROUTE, EXCHANGE_SUCCESS_ROUTE } from 'router'
import styles from './styles.module.sass'

export const Submit = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    exchangeFormInvoiceField,
    exchangeFormWithdrawField,
    exchangeFormInvoiceAmountField,
    exchangeFormWithdrawAmountField,
  } = useExchangeFormFields()

  const sendPayload = useCallback(useAction(postPayment), [postPayment])

  const onCancel = useCallback(() => history.push(MAIN_EXCHANGE_ROUTE), [history])

  const onConfirm = useCallback(
    () =>
      sendPayload({
        invoicePayMethod: exchangeFormInvoiceField.value,
        withdrawPayMethod: exchangeFormWithdrawField.value,
        base: 'invoice',
        amount: exchangeFormInvoiceAmountField,
      }).then(() => {
        history.push(EXCHANGE_SUCCESS_ROUTE)
        dispatch(recalculateToInit())
        dispatch(destroy('exchange'))
      }, [history]),
    [
      history,
      dispatch,
      sendPayload,
      exchangeFormInvoiceField,
      exchangeFormWithdrawField,
      exchangeFormInvoiceAmountField,
    ],
  )

  useEffect(() => {
    if (!exchangeFormInvoiceAmountField) {
      onCancel()
    }
    // eslint-disable-next-line
  }, [onCancel])

  return (
    <Page>
      <Title className={styles.title}>Details</Title>
      <PaymentInfo
        className={styles.info}
        exchangeFormInvoiceField={exchangeFormInvoiceField}
        exchangeFormWithdrawField={exchangeFormWithdrawField}
        exchangeFormInvoiceAmountField={exchangeFormInvoiceAmountField}
        exchangeFormWithdrawAmountField={exchangeFormWithdrawAmountField}
      />
      <ControlButtons onCancel={onCancel} onConfirm={onConfirm} />
    </Page>
  )
}
