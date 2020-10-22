import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form, reduxForm, change, Field } from 'redux-form'
import useAction from 'hooks/useAction'
import useExchangeFormFields from 'hooks/useExchangeFormFields'
import { WrappedInput as Input, WrappedSelect as Select } from 'reduxFormWrapped'
import {
  requestPayMethodsCalculate,
  recalculatedSideSelector,
  recalculatedAmountSelector,
  exchangeFormLoading,
} from 'app/exchange'
import { Button } from 'components'
import isPositive from 'validators/isPositive'
import styles from './styles.module.sass'

const WITHDRAW_FIELD_NAME = 'withdraw'
const INVOICE_FIELD_NAME = 'invoice'

const FORM_NAME = 'exchange'

const ExchangeForm = ({ handleSubmit, submitting, invoice, withdraw }) => {
  const recSide = useSelector(recalculatedSideSelector)
  const recAmount = useSelector(recalculatedAmountSelector)
  const isExchangeFormLoading = useSelector(exchangeFormLoading)

  const {
    exchangeFormInvoiceField,
    exchangeFormWithdrawField,
    exchangeFormInvoiceAmountField,
    exchangeFormWithdrawAmountField,
  } = useExchangeFormFields()

  const getInvertedAmout = useCallback(useAction(requestPayMethodsCalculate), [
    requestPayMethodsCalculate,
  ])

  const changeField = useCallback(
    useAction((dispatch) => ({ field, val }) => {
      dispatch(change(FORM_NAME, field, val))
    }),
    [recSide, recAmount],
  )

  const onAmountChange = useCallback(
    (side) => (amount) => {
      let amountNum = parseFloat(amount, 10)
      if (isNaN(amountNum)) {
        amountNum = 0
      }
      getInvertedAmout({
        invoicePayMethod: exchangeFormInvoiceField.value,
        withdrawPayMethod: exchangeFormWithdrawField.value,
        base: side,
        amount: amountNum,
      })
    },
    [getInvertedAmout, exchangeFormInvoiceField, exchangeFormWithdrawField],
  )

  useEffect(() => {
    changeField({ field: `${recSide}Amount`, val: recAmount })
  }, [recAmount, recSide, changeField])

  return (
    <Form onSubmit={handleSubmit} className={styles.exchangeForm}>
      <div className={styles.exchangeFormFieldsWrapper}>
        <div className={styles.exchangeFormFieldsWrapperItem}>
          <h2 className={styles.exchangeFormTitle}>Sell</h2>
          <Field
            name={INVOICE_FIELD_NAME}
            component={Select}
            options={invoice}
            onChange={({ value }) => {
              getInvertedAmout({
                invoicePayMethod: value,
                withdrawPayMethod: exchangeFormWithdrawField.value,
                base: 'invoice',
                amount: exchangeFormInvoiceAmountField,
              })
            }}
          />
          <Field
            name='invoiceAmount'
            type='text'
            component={Input}
            validate={isPositive}
            placeholder={'Enter sell amount...'}
            onChange={onAmountChange(INVOICE_FIELD_NAME)}
          />
        </div>
        <div className={styles.exchangeFormFieldsWrapperItem}>
          <h2 className={styles.exchangeFormTitle}>Buy</h2>
          <Field
            name={WITHDRAW_FIELD_NAME}
            component={Select}
            options={withdraw}
            onChange={({ value }) => {
              getInvertedAmout({
                invoicePayMethod: exchangeFormInvoiceField.value,
                withdrawPayMethod: value,
                base: 'withdraw',
                amount: exchangeFormWithdrawAmountField,
              })
            }}
          />
          <Field
            name='withdrawAmount'
            type='text'
            component={Input}
            validate={isPositive}
            placeholder={'Enter buy amount...'}
            onChange={onAmountChange(WITHDRAW_FIELD_NAME)}
          />
        </div>
      </div>
      <Button
        type='submit'
        disabled={submitting || isExchangeFormLoading}
        className={styles.exchangeFormSubmit}
      >
        Exchange
      </Button>
    </Form>
  )
}

export const WrappedExchangeForm = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true,
  destroyOnUnmount: false,
})(ExchangeForm)
