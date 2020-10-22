import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { exchangeFormFieldSelector } from 'app/exchange'

export default () => {
  const exchangeFormFieldToValue = useSelector(exchangeFormFieldSelector)

  const exchangeFormInvoiceField = useMemo(() => exchangeFormFieldToValue('invoice'), [
      exchangeFormFieldToValue,
    ]),
    exchangeFormWithdrawField = useMemo(() => exchangeFormFieldToValue('withdraw'), [
      exchangeFormFieldToValue,
    ]),
    exchangeFormInvoiceAmountField = useMemo(
      () => exchangeFormFieldToValue('invoiceAmount'),
      [exchangeFormFieldToValue],
    ),
    exchangeFormWithdrawAmountField = useMemo(
      () => exchangeFormFieldToValue('withdrawAmount'),
      [exchangeFormFieldToValue],
    )

  return {
    exchangeFormInvoiceField,
    exchangeFormWithdrawField,
    exchangeFormInvoiceAmountField,
    exchangeFormWithdrawAmountField,
  }
}
