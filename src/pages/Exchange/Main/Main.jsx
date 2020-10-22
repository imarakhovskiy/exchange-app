import React, { useEffect, useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchPayMethods, invoiceSelector, withdrawSelector } from 'app/exchange'
import { Page, WrappedExchangeForm as Form } from 'components/Exchange'
import useAction from 'hooks/useAction'
import useExchangeFormFields from 'hooks/useExchangeFormFields'
import { EXCHANGE_SUBMIT_ROUTE } from 'router'
import styles from './styles.module.sass'

export const Main = () => {
  const history = useHistory()
  const getPayMethods = useCallback(useAction(fetchPayMethods), [fetchPayMethods])

  const invoice = useSelector(invoiceSelector)
  const withdraw = useSelector(withdrawSelector)
  const {
    exchangeFormInvoiceField,
    exchangeFormWithdrawField,
    exchangeFormInvoiceAmountField,
    exchangeFormWithdrawAmountField,
  } = useExchangeFormFields()

  const invoiceOptions = useMemo(
      () =>
        invoice.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
      [invoice],
    ),
    withdrawOptions = useMemo(
      () =>
        withdraw.map(({ id, name }) => ({
          value: id,
          label: name,
        })),
      [withdraw],
    ),
    initialValues = useMemo(
      () => ({
        invoice: exchangeFormInvoiceField || invoiceOptions[0],
        withdraw: exchangeFormWithdrawField || withdrawOptions[0],
        invoiceAmount: exchangeFormInvoiceAmountField || '',
        withdrawAmount: exchangeFormWithdrawAmountField || '',
      }),
      [
        invoiceOptions,
        withdrawOptions,
        exchangeFormInvoiceField,
        exchangeFormWithdrawField,
        exchangeFormInvoiceAmountField,
        exchangeFormWithdrawAmountField,
      ],
    )

  useEffect(() => {
    getPayMethods()
  }, [getPayMethods])

  return (
    <Page className={styles.page}>
      <Form
        onSubmit={() => {
          history.push(EXCHANGE_SUBMIT_ROUTE)
        }}
        invoice={invoiceOptions}
        withdraw={withdrawOptions}
        initialValues={initialValues}
      />
    </Page>
  )
}
